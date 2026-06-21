"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, TextField, Label, FieldError, Card, CardHeader } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client"; 

export default function RegisterPage() {
  const router = useRouter();
  
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  
  // Validation State
  const [wasSubmitted, setWasSubmitted] = useState(false);

  // UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Missing validation variables derived from state
  const isNameInvalid = wasSubmitted && !name.trim();
  const isEmailInvalid = wasSubmitted && !email.trim();
  const isPasswordInvalid = wasSubmitted && password.length < 6;

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignup = async (e) => {
    e.preventDefault();
    setWasSubmitted(true); 
    
    setStatus({ type: "", message: "" });

    if (!name.trim() || !email.trim() || !password ) {
      setStatus({ type: "danger", message: "Please fill in all required fields." });
      return;
    }
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email: email,
        password: password,
        name: name,
        image: photoUrl || undefined, 
        callbackURL: "/", 
      });

      if (error) {
        setStatus({ type: "danger", message: error.message || "Something went wrong." });
      } else {
        setStatus({
          type: "success",
          message: "Account created successfully! Redirecting..."
        });
        setTimeout(() => {
          router.push("/");
        }, 1500);
        setName("");
        setEmail("");
        setPassword("");  
        setPhotoUrl("");
        setWasSubmitted(false);
      }
    } catch (err) {
        setStatus({ type: "danger", message: "An unexpected error occurred." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-900">
      <Card className="w-full max-w-md p-6 shadow-xl border border-default-200">
        <CardHeader className="flex flex-col items-center gap-1 pb-6 pt-0 px-0">
          <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-[#9333ea] to-[#db2777]">
            Create an account
          </h1>
          <p className="text-small text-default-500">Enter your details below to get started</p>
        </CardHeader>
        
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSignup} className="flex flex-col gap-4" noValidate>
            
            {/* Name Input */}
            <TextField isRequired isInvalid={isNameInvalid} className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-default-700">Name</Label>
              <input 
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-default-200 bg-transparent p-2.5 text-sm text-default-900 shadow-xs outline-hidden focus:border-purple-500 transition-colors dark:border-zinc-700"
              />
              <FieldError>Name is required</FieldError>
            </TextField>

            {/* Email Input */}
            <TextField isRequired isInvalid={isEmailInvalid} className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-default-700">Email</Label>
              <input 
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-default-200 bg-transparent p-2.5 text-sm text-default-900 shadow-xs outline-hidden focus:border-purple-500 transition-colors dark:border-zinc-700"
              />
              <FieldError>Please enter a valid email address</FieldError>
            </TextField>

            {/* Photo URL Input */}
            <TextField className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-default-700">Photo URL</Label>
              <input 
                type="url"
                placeholder="https://example.com/avatar.jpg (Optional)"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full rounded-xl border border-default-200 bg-transparent p-2.5 text-sm text-default-900 shadow-xs outline-hidden focus:border-purple-500 transition-colors dark:border-zinc-700"
              />
            </TextField>

            {/* Password Input */}
            <TextField isRequired isInvalid={isPasswordInvalid} className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-default-700">Password</Label>
              <div className="relative flex items-center">
                <input 
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-default-200 bg-transparent p-2.5 pr-10 text-sm text-default-900 shadow-xs outline-hidden focus:border-purple-500 transition-colors dark:border-zinc-700"
                />
                <button 
                  className="absolute right-3 focus:outline-none text-default-400 hover:text-default-600 transition-colors" 
                  type="button" 
                  onClick={toggleVisibility}
                >
                  {isVisible ? <EyeSlash className="text-xl" /> : <Eye className="text-xl" />}
                </button>
              </div>
              <FieldError>Password must be at least 6 characters</FieldError>
            </TextField>

            {status.message && (
              <div
                className={`p-3.5 rounded-xl border text-sm flex flex-col gap-0.5 shadow-sm transition-all ${
                  status.type === "danger"
                    ? "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-900/60 dark:text-red-200"
                    : "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-200"
                }`}
              >
                <span className="font-bold tracking-wide">
                  {status.type === "danger" ? "Error" : "Success"}
                </span>
                <span className="opacity-90">{status.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              isLoading={isLoading}
              className="w-full mt-2 text-white font-semibold bg-linear-to-r from-[#9333ea] to-[#db2777] shadow-md hover:opacity-90 transition-opacity"
            >
              Sign Up
            </Button>
          </form>

          {/* Navigation Links */}
          <div className="flex flex-col items-center justify-center gap-3 mt-3">
            <p className="text-small text-default-500">
              Already have an account?{" "}
              <Link href="/signin" className="text-[#db2777] hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}