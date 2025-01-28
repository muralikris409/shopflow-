"use client";
import { getProfileInfo } from "@/app/(application)/_service/UserService";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state?.session?.user?.id);
  const token = useSelector((state) => state?.session?.token);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProfileInfo(token, userId); 
        setUser(response.data.data);
      } catch (err) {
        setError("Failed to load profile data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchProfileInfo();
    }
    
  }, [userId, token]); 

  if (loading) {
    return <div className="text-center">Loading...</div>; // Display loading message or spinner
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Display error message
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md m-10">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {user.profile_pic ? (
            <img src={user?.profile_pic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-bold text-gray-500">{user?.name?.charAt(0)}</span>
          )}
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-600">{user?.phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Orders</h3>
          <p className="text-gray-600">View your past orders</p>
          <Link href="/orders" className="mt-2 text-blue-500 hover:underline">View Orders</Link>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Wishlist</h3>
          <p className="text-gray-600">Check your saved items</p>
          <Link href="/wishlist" className="mt-2 text-blue-500 hover:underline">View Wishlist</Link>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow col-span-2">
          <h3 className="text-lg font-semibold text-gray-800">Edit Profile</h3>
          <p className="text-gray-600">Update your information</p>
          <Link href="/user/profile/manage" className="mt-2 text-blue-500 hover:underline">Edit Profile</Link>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow col-span-2">
          <h3 className="text-lg font-semibold text-gray-800">Edit address</h3>
          <p className="text-gray-600">Update your addresses</p>
          <Link href="/user/profile/address" className="mt-2 text-blue-500 hover:underline">Edit Profile</Link>
        </div>
        
      </div>
    </div>
  );
};

export default UserProfile;
