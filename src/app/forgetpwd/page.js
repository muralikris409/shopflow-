"use client"
import { forgotPassword } from "@/app/_service/UserService";
import React, { useState } from "react";

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false);
  const  handleSubmit =async () => {

    if (!email) {
      setError("Email is required.");
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      try{
        setLoading(true);
      await forgotPassword(email);
      }
      catch(err){
        console.log(err?.response?.data?.message)
        setError(err?.response?.data?.message||"Something went wrong")
      }
      finally{
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md m-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Forgot Password</h2>
      <p className="text-sm text-gray-600 text-center mt-2">
        Enter your email address to receive a reset link.
      </p>
      <div className="mt-4">
        <input
          type="email"
          className={`w-full px-4 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
       {loading?"Loading...": "Submit"}
      </button>
    </div>
  );
};

export default ForgotPasswordEmail;
