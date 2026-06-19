"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { setUsersCount } from "@/lib/features/pricing/pricingSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Building2, User, Mail, Phone, Lock, Tag, Users } from "lucide-react";
import { useCalculatePriceQuery, useRegisterMutation, useVerifyPaymentMutation } from "@/lib/services/authApi";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
import { Logo } from "@/components/site/Logo";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firmName, setFirmName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);


  const initialUsers = useSelector((state: RootState) => state.pricing?.users || 10);
  const dispatch = useDispatch();
  const router = useRouter();

  // Pricing calculator state
  const [users, setUsersLocal] = useState(initialUsers);
  const [promoCode, setPromoCode] = useState("");

  const handleUsersChange = (val: number) => {
    setUsersLocal(val);
    dispatch(setUsersCount(val));
  };
  const [debouncedUsers, setDebouncedUsers] = useState(users);
  const [appliedPromoCode, setAppliedPromoCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUsers(users);
    }, 300);
    return () => clearTimeout(timer);
  }, [users]);

  const { data: pricingDataResponse, isError, error } = useCalculatePriceQuery({ users: debouncedUsers, promoCode: appliedPromoCode });

  const pricingData = pricingDataResponse || {
    baseAmount: 0,
    discountPercentage: 0,
    discountAmount: 0,
    subTotal: 0,
    gstAmount: 0,
    grandTotal: 0,
    pricePerUserYearly: 0
  };

  const pricePerUserMonthly = pricingData.pricePerUserYearly > 0 ? pricingData.pricePerUserYearly / 12 : 0;

  const [verifyPayment, { isLoading: isVerifying }] = useVerifyPaymentMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const handleVerificationSuccess = (data: any) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    alert('Payment Successful! Welcome to Proactive.');
    router.push('/dashboard');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = email.split('@')[0];
    
    try {
      const data = await register({
        orgName: firmName,
        name: firstName,
        username: username,
        password: password,
        email: email,
        mobile: phoneNumber,
        usersCount: users,
        promoCode: appliedPromoCode
      }).unwrap();

      const { orderId, amount, currency } = data;

      const resScript = await loadRazorpay();
      if (!resScript) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'dummy_key',
        amount: amount,
        currency: currency,
        name: "Proactive",
        description: `Subscription for ${users} users`,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const verificationData = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orgName: firmName,
              name: firstName,
              username: username,
              password: password,
              email: email,
              mobile: phoneNumber
            }).unwrap();
            
            handleVerificationSuccess(verificationData);
          } catch (err: any) {
            console.error(err);
            alert(err.message || 'Something went wrong during verification');
          }
        },
        prefill: {
          name: firstName,
          email: email,
          contact: phoneNumber?.startsWith('+') ? phoneNumber : `+91${phoneNumber}`,
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'An error occurred during registration');
    }
  };

  const isPending = isRegistering || isVerifying;

  return (
    <div className="h-screen w-full bg-primary flex items-center justify-center p-4 sm:p-8 overflow-hidden">
      <div className="w-full max-w-5xl h-full max-h-[90vh] md:max-h-162.5 grid md:grid-cols-2 rounded-3xl overflow-hidden bg-surface border border-border shadow-2xl relative">
        {/* Left: Pricing Calculator */}
        <div className="bg-surface-strong hidden md:flex flex-col items-center justify-center p-8 pb-12 relative">
          <div className="max-w-md w-full">
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Team Size</span>
                <span className="font-display text-3xl font-bold text-foreground">{users}</span>
              </div>
              
              <div className="mb-6">
                <input
                  type="range" min={5} max={100} value={users}
                  onChange={(e) => handleUsersChange(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>5</span><span>25</span><span>50</span><span>75</span><span>100</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per user / month</span>
                  <span className="font-semibold text-foreground">₹{pricePerUserMonthly}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Annual Subtotal</span>
                  <span className="font-semibold text-foreground">₹{pricingData.baseAmount.toLocaleString()}</span>
                </div>
                {/* {pricingData.discountAmount > 0 && ( */}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount ({pricingData.discountPercentage}%)</span>
                    <span className="font-semibold text-green-600">-₹{pricingData.discountAmount.toLocaleString()}</span>
                  </div>
                {/* )} */}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="font-semibold text-foreground">₹{pricingData.gstAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-2">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="w-full bg-transparent border rounded-md border-border focus:border-primary outline-none px-3 py-2 pr-14 text-sm text-foreground placeholder-muted-foreground"
                    />
                    <button 
                      type="button" 
                      onClick={() => setAppliedPromoCode(promoCode)}
                      className="absolute right-3 text-xs font-semibold text-foreground hover:text-muted-foreground"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex justify-between items-baseline">
                <span className="text-base font-bold text-foreground">Total due today</span>
                <span className="font-display text-2xl font-bold text-foreground">₹{pricingData.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-surface p-6 sm:p-6 lg:py-6 lg:px-16 flex flex-col overflow-y-auto">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative pt-3 mt-2">
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-foreground placeholder-transparent [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_white_inset]"
                />
                <label
                  htmlFor="firstName"
                  className="absolute left-0 -top-1.5 text-xs text-muted-foreground transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-1.5 peer-focus:text-xs peer-focus:text-foreground peer-autofill:-top-1.5 peer-autofill:text-xs cursor-text"
                >
                  Full Name
                </label>
              </div>

              <div className="relative pt-3 mt-2">
                <span className="absolute left-0 bottom-2 text-foreground text-[15px] pointer-events-none">+91</span>
                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 pl-9 text-foreground placeholder-transparent [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_white_inset]"
                />
                <label
                  htmlFor="phoneNumber"
                  className="absolute left-0 -top-1.5 text-xs text-muted-foreground transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:left-9 peer-focus:-top-1.5 peer-focus:left-0 peer-focus:text-xs peer-focus:text-foreground peer-autofill:-top-1.5 peer-autofill:left-0 peer-autofill:text-xs cursor-text"
                >
                  Phone Number
                </label>
              </div>
            </div>

            <div className="relative pt-3 mt-2">
              <input
                id="firmName"
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder=" "
                required
                className="peer w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-foreground placeholder-transparent [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_white_inset]"
              />
              <label
                htmlFor="firmName"
                className="absolute left-0 -top-1.5 text-xs text-muted-foreground transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-1.5 peer-focus:text-xs peer-focus:text-foreground peer-autofill:-top-1.5 peer-autofill:text-xs cursor-text"
              >
                Firm Name
              </label>
            </div>

            <div className="relative pt-3 mt-2">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
                className="peer w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-foreground placeholder-transparent [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_white_inset]"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-1.5 text-xs text-muted-foreground transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-1.5 peer-focus:text-xs peer-focus:text-foreground peer-autofill:-top-1.5 peer-autofill:text-xs cursor-text"
              >
                Work Email
              </label>
            </div>

            <div className="relative pt-3 mt-2">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPwFocused(true)}
                onBlur={() => setPwFocused(false)}
                placeholder=" "
                required
                className="peer w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 pr-8 text-foreground placeholder-transparent [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_white_inset]"
              />
              <label
                htmlFor="password"
                className={`absolute left-0 -top-1.5 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-1.5 peer-focus:text-xs peer-autofill:-top-1.5 peer-autofill:text-xs cursor-text text-muted-foreground peer-focus:text-foreground`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-0 top-3 text-muted-foreground hover:text-foreground z-10"
                aria-label="Toggle password visibility"
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full cursor-pointer bg-primary text-primary-foreground rounded-full py-3 font-medium hover:bg-primary-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Processing..." : "Proceed to Pay"}
              </button>
            </div>
            
            <p className="text-center text-xs text-muted-foreground/80 mt-4">
              By signing up, you agree to our <a href="#" className="underline hover:text-foreground">Terms of Service</a> and <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
            </p>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6 pb-4">
            Already have an account?{" "}
            <Link href="http://localhost:8080/login" className="text-primary hover:text-primary-deep font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
