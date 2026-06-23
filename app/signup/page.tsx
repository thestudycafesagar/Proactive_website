"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { setUsersCount } from "@/lib/features/pricing/pricingSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Building2, User, Mail, Phone, Lock, Tag, Users, CheckCircle2 } from "lucide-react";
import { useCalculatePriceQuery, useRegisterMutation, useVerifyPaymentMutation, useSendOtpMutation, useVerifyOtpMutation } from "@/lib/services/authApi";
import { motion, AnimatePresence } from "framer-motion";

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
  const [apiError, setApiError] = useState("");   
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'loading_script' | 'paying' | 'verifying' | 'success'>('idle');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const [sendOtpApi, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [verifyOtpApi, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();

  const handleSendOtp = async () => {
    if (!isEmailValid) return;
    try {
      setApiError("");
      const response = await sendOtpApi({ email }).unwrap();
      console.log("Send OTP response:", response);
      setIsOtpSent(true);
      setResendTimer(30);
    } catch (err: any) {
      if (err?.status === 409 && err?.data?.error?.code === 'USER_EXISTS') {
        setApiError("USER_EXISTS");
      } else {
        setApiError(err?.data?.error?.message || err?.message || "Failed to send OTP.");
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) return;
    try {
      setApiError("");
      const datat = await verifyOtpApi({ email, otp }).unwrap();
      console.log("Verify OTP response:", datat);
      setIsEmailVerified(true);
    } catch (err: any) {
      setApiError(err?.data?.error?.message || err?.message || "Invalid OTP.");
    }
  };

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
    pricePerUserYearly: 0,
    pricePerUserMonthly: 0
  };

  const pricePerUserMonthly = pricingData.pricePerUserMonthly;

  const [verifyPayment, { isLoading: isVerifying }] = useVerifyPaymentMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const handleVerificationSuccess = (data: any) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setTransactionStatus('success');
    setTimeout(() => {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8080';
      window.location.href = `${appUrl}/`;
    }, 1500);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransactionStatus('loading_script');
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
        setTransactionStatus('idle');
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
          setTransactionStatus('verifying');
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
            setTransactionStatus('idle');
          }
        },
        modal: {
          ondismiss: function() {
            setTransactionStatus('idle');
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
      setTransactionStatus('paying');
      paymentObject.open();

    } catch (err: any) {
      console.error("Registration error:", err);
      setTransactionStatus('idle');
      
      // Handle RTK Query fetchBaseQuery structured errors
      if (err?.status === 409 && err?.data?.error?.code === 'USER_EXISTS') {
        setApiError("USER_EXISTS")
      } else if (err?.data?.error?.message) {
        setApiError(err.data.error.message);
      } else {
        setApiError(err.message || 'An error occurred during registration. Please try again.');
      }
    }
  };

  const isPending = isRegistering || isVerifying;

  return (
    <div className="h-screen w-full bg-primary flex items-center justify-center overflow-hidden">
      <div className="w-full h-full grid md:grid-cols-2 overflow-hidden bg-surface border border-border shadow-2xl relative">
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
          {(transactionStatus === 'idle' || transactionStatus === 'loading_script') && (
            <div className="flex flex-col items-center text-center mb-6">
              <Logo />
              <h1 className="mt-6 font-display text-2xl font-bold text-foreground">Create your account</h1>
              <p className="mt-2 text-sm text-muted-foreground">Enter your details to get started with Proactive.</p>
            </div>
          )}

          {apiError && apiError !== "USER_EXISTS" && (transactionStatus === 'idle' || transactionStatus === 'loading_script') && (
            <div className="mb-6 rounded-xl bg-red-50/50 border border-red-100 p-4 text-sm text-red-600">
              {apiError}
            </div>
          )}

          {(transactionStatus === 'idle' || transactionStatus === 'loading_script') && (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70">
                    <User size={18} />
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Full Name"
                    required
                    className="w-full bg-surface border border-border focus:border-primary rounded-full outline-none py-3 pl-11 pr-4 text-sm text-foreground placeholder-muted-foreground/70 transition-colors"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70">
                    <Phone size={18} />
                    <span className="ml-1 text-sm">+91</span>
                  </div>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Phone Number"
                    required
                    className="w-full bg-surface border border-border focus:border-primary rounded-full outline-none py-3 pl-18 pr-4 text-sm text-foreground placeholder-muted-foreground/70 transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70">
                  <Building2 size={18} />
                </div>
                <input
                  id="firmName"
                  type="text"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  placeholder="Firm Name"
                  required
                  className="w-full bg-surface border border-border focus:border-primary rounded-full outline-none py-3 pl-11 pr-4 text-sm text-foreground placeholder-muted-foreground/70 transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setIsOtpSent(false); setIsEmailVerified(false); }}
                    disabled={isEmailVerified}
                    placeholder="Email id"
                    required
                    className={`w-full bg-surface border ${apiError === "USER_EXISTS" ? "border-red-500" : "border-border"} focus:border-primary rounded-full outline-none py-3 pl-11 pr-25 text-sm text-foreground placeholder-muted-foreground/70 transition-colors ${isEmailVerified ? "opacity-70 bg-surface-strong" : ""}`}
                  />
                  {!isEmailVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!isEmailValid || isSendingOtp || resendTimer > 0}
                      className="absolute cursor-pointer right-1.5 top-1.5 bottom-1.5 px-4 bg-primary text-primary-foreground text-xs font-semibold rounded-full hover:bg-primary-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSendingOtp ? "Sending..." : resendTimer > 0 ? `Resend in ${resendTimer}s` : isOtpSent ? "Resend OTP" : "Send OTP"}
                    </button>
                  )}
                  {isEmailVerified && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 font-semibold text-xs flex items-center gap-1">
                      <CheckCircle2 size={16} /> Verified
                    </div>
                  )}
                  {
                    apiError === "USER_EXISTS" && (
                      <span className="absolute -bottom-5 left-4 text-red-500 text-xs">User already exists. Please login instead.</span>
                    )
                  }
                </div>

                <AnimatePresence>
                  {isOtpSent && !isEmailVerified && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="relative overflow-hidden"
                    >
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="Enter 6-digit OTP"
                        className="w-full bg-surface border border-border focus:border-primary rounded-full outline-none py-3 pl-5 pr-25 text-sm text-foreground placeholder-muted-foreground/70 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={otp.length < 4 || isVerifyingOtp}
                        className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-primary text-white cursor-pointer text-xs font-semibold rounded-full hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isVerifyingOtp ? "Verifying..." : "Verify"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPwFocused(true)}
                  onBlur={() => setPwFocused(false)}
                  placeholder="Password"
                  required
                  className="w-full bg-surface border border-border focus:border-primary rounded-full outline-none py-3 pl-11 pr-12 text-sm text-foreground placeholder-muted-foreground/70 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground z-10 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isPending || !isEmailVerified || transactionStatus === 'loading_script'}
                  className="w-full cursor-pointer bg-primary text-primary-foreground rounded-full py-3 font-medium hover:bg-primary-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {transactionStatus === 'loading_script' ? "Loading Secure Gateway..." : "Proceed to Pay"}
                </button>
              </div>
              
              <p className="text-center text-xs text-muted-foreground/80 mt-4">
                By signing up, you agree to our <a href="/terms" target="_blank" className="underline hover:text-foreground">Terms of Service</a> and <a href="/privacy" target="_blank" className="underline hover:text-foreground">Privacy Policy</a>.
              </p>
            </form>
          )}

          {transactionStatus !== 'idle' && transactionStatus !== 'loading_script' && (
            <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center">
              <AnimatePresence mode="wait">
                {transactionStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center text-green-600"
                  >
                    <CheckCircle2 size={80} className="mb-4" />
                    <h3 className="text-2xl font-bold text-foreground">Payment Successful!</h3>
                    <p className="text-muted-foreground mt-2">Setting up your workspace...</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
                    <h3 className="text-xl font-bold text-foreground mb-2">Securely processing your payment...</h3>
                    <p className="text-muted-foreground">Please do not close this window.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <p className="text-xs text-center text-muted-foreground mt-6 pb-4">
            Already have an account?{" "}
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8080'}/login`} className="text-primary hover:text-primary-deep font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
