"use client";
import { resetPassword } from "@/app/(application)/_service/UserService";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Suspense } from 'react';

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordComponent />
    </Suspense>
  );
};

export default ResetPassword;

const ResetPasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchQuery = useSearchParams();
  const token = searchQuery.get("token");

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setError("All fields are required.");
      setSuccess("");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setSuccess("");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
    } else {
      setError("");
      try {
        const response = await resetPassword(token, password);
        if (response.status === 200) {
          setSuccess("Your password has been reset successfully!");
          setError("");
        } else {
          setError(response.message || "An error occurred while resetting the password.");
          setSuccess("");
        }
      } catch (err) {
        setError("Failed to reset password. Please try again later.");
        setSuccess("");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg m-10">
      <h2 className="text-3xl font-semibold text-gray-800 text-center">Reset Password</h2>
      <p className="text-sm text-gray-500 text-center mt-2">
        Please enter your new password below.
      </p>
      <div className="mt-6">
        <input
          type="password"
          className={`w-full px-4 py-3 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200`}
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <input
          type="password"
          className={`w-full px-4 py-3 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200`}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      <button
        onClick={handleSubmit}
        className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
      >
        Reset Password
      </button>
    </div>
  );
};