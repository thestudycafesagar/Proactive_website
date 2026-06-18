"use client";

import { useState } from "react";
import Link from "next/link";

import { InteractiveLoginGraphic } from "@/components/site/InteractiveLoginGraphic";

export default function LoginPage() {
  const [emailLength, setEmailLength] = useState(0);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(true);
    setTimeout(() => setHasError(false), 3000);
  };

  return (
    /*
      Full-screen split. Dark outer background matches screenshot.
      Inside: a large card-like container that is split Left (animation) | Right (form)
    */
    <div className="flex min-h-screen items-center justify-center bg-[#1A1A1A] p-4 sm:p-6">
      <div className="flex w-full max-w-[880px] overflow-hidden rounded-[2rem] shadow-2xl" style={{ minHeight: "560px" }}>

        {/* ── LEFT PANEL ── Interactive SVG characters */}
        <div className="hidden lg:flex lg:w-[52%] shrink-0">
          <InteractiveLoginGraphic
            emailLength={emailLength}
            isPasswordFocused={isPasswordFocused}
            hasError={hasError}
          />
        </div>

        {/* ── RIGHT PANEL ── Login Form */}
        <div className="flex flex-1 flex-col items-center justify-center bg-white px-10 py-12 lg:rounded-r-[2rem]">
          {/* Plus icon (decorative, matches screenshot top) */}
          <div className="mb-6 text-3xl font-thin select-none text-[#1A1A1A]">✚</div>

          <h1 className="font-display text-[1.75rem] font-bold text-[#1A1A1A] text-center">
            Welcome back!
          </h1>
          <p className="mt-1 text-sm text-gray-500 text-center">Please enter your details</p>

          <form className="mt-8 w-full max-w-[320px] space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A]">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setEmailLength(e.target.value.length)}
                onFocus={() => setIsPasswordFocused(false)}
                className="mt-1 block w-full border-0 border-b border-gray-300 bg-transparent pb-2 pt-1 text-sm text-[#1A1A1A] placeholder:text-gray-400 focus:border-[#1A1A1A] focus:outline-none transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1A1A1A]">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className={`block w-full border-0 border-b bg-transparent pb-2 pt-1 pr-8 text-sm text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none transition-colors ${hasError ? "border-red-500" : "border-gray-300 focus:border-[#1A1A1A]"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    /* Eye-off icon */
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    /* Eye icon */
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
              {hasError && (
                <p className="mt-1 text-xs text-red-500">Incorrect email or password.</p>
              )}
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300 text-[#1A1A1A] focus:ring-0" />
                Remember for 30 days
              </label>
              <a href="#" className="text-xs text-gray-500 hover:text-[#1A1A1A] transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Log In button */}
            <button
              type="submit"
              className="flex w-full justify-center rounded-full bg-[#1A1A1A] py-3 text-sm font-semibold text-white transition hover:bg-black"
            >
              Log in
            </button>

            {/* Google button */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-3 text-sm font-semibold text-[#1A1A1A] transition hover:bg-gray-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Log in with Google
            </button>

            {/* Sign up link */}
            <p className="text-center text-xs text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-[#1A1A1A] hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
