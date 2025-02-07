"use client";
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../../_lib/sessionReducer";
import { useRouter } from "next/navigation";
import { googleOAuth, login, signUp } from "@/app/_service/UserService";
import Link from "next/link";
import UserCartService from "@/app/_service/UserCartService";
import { parseCookies } from 'nookies';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const userCartService = new UserCartService();
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const historyRoute = useSelector(state => state?.utils?.history?.route);
  const router = useRouter();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({});
    setErrors({});
    setSuccess(null);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const syncUser = () => {
    const cookies = parseCookies();

    const userData = cookies.shopflow_session;
    console.log(userData);
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        dispatch(setSession(parsedData));
      } catch (error) {
        console.error("Failed to parse user data from cookies:", error);
      }
    }
  };

  const validate = () => {
    const validationErrors = {};
    const requiredFields = isLogin
      ? ["email", "password"]
      : ["email", "password", "confirmPassword", "username"];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        validationErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      } else if (field === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field])) {
          validationErrors[field] = "Invalid email format";
        }
      } else if (field === "confirmPassword" && formData.password !== formData.confirmPassword) {
        validationErrors[field] = "Passwords do not match";
      }
    });

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(null);
      return;
    }

    try {
      setErrors({});
      if (isLogin) {
        setLoading(true);
        const response = await login(formData);
        console.log(response)

        syncUser();
        if (historyRoute) {
          historyRoute.includes("product") ? router.push(`${historyRoute}`) : router.push("/cart");
        } else {
          router.push("/");
        }
      } else {
        setLoading(true);
        const response = await signUp(formData);
        
        // await userCartService.migrateCart(response?.data?.id);
        setSuccess(response?.message || "Registration successful! Please sign in.");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
      setErrors({ form: error+"" || "An unexpected error occurred. Please try again." });
      setSuccess(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res=await signIn("google");
      console.log(res);
      await googleOAuth(session?.user);
      syncUser();
      router.push("/");
    } catch (error) {
      console.error("Google login error:", error);
      // alert(JSON.stringify(error));
      setErrors({ form:error.message|| "An unexpected error occurred. Please try again." });
      setSuccess(null);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      syncUser();
    }
  }, [status]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-between mb-6">
          <button
            className={`flex-1 text-center py-2 font-semibold ${isLogin ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
            onClick={() => setIsLogin(true)}
          >
            SIGN IN
          </button>
          <button
            className={`flex-1 text-center py-2 font-semibold ${!isLogin ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
            onClick={() => setIsLogin(false)}
          >
            REGISTER
          </button>
        </div>

        {/* Error Display */}
        {errors.form && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {errors.form}
          </div>
        )}

        {/* Success Display */}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username || ""}
                onChange={(e) => handleChange("username", e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password || ""}
              onChange={(e) => handleChange("password", e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
          
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          )}

          <button
            type="submit"
            className="w-full mb-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-red-600"
          >
           {loading ? "loading" : (isLogin ? "Sign in" : "Register")}
          </button>
        </form>

        {isLogin && (
          <div className="mt-4">
            <Link href="/forgetpwd" className="text-sm text-gray-500 hover:text-orange-500">
              Forgot your password?
            </Link>
          </div>
        )}

        <div className="flex flex-col items-center w-full">
          <div className="text-gray-400 mt-1">Quick Access With</div>
          <button
            className="flex flex-row justify-center mt-2"
            onClick={handleGoogleLogin}
          >
    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1">
      <defs></defs>
      <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Color-" transform="translate(-401.000000, -860.000000)">
          <g id="Google" transform="translate(401.000000, 860.000000)">
            <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"></path>
            <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"></path>
            <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"></path>
            <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"></path>
          </g>
        </g>
      </g>
    </svg>          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
