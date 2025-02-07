"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { User, ShoppingCart, Heart, ClipboardList, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

// Lazy load pages to avoid SSR issues
const Wishlist = dynamic(() => import("../../wishlist/page"), { ssr: false });
const OrderPage = dynamic(() => import("../../orders/page"), { ssr: false });
const Cart = dynamic(() => import("../../cartv2/page"), { ssr: false });
const EditProfile = dynamic(() => import("../profile/manage/page"), { ssr: false });
const AddressManagement = dynamic(() => import("../profile/address/page"), { ssr: false });

const UserProfile = () => {
  const { user } = useSelector((state) => state.userData);
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* Sidebar Navigation */}
      <nav className="w-16 md:w-72 bg-white text-gray-800 h-screen p-2 md:p-6 shadow-lg flex flex-col items-center md:items-start md:block z-40 transition-all">
        {/* User Info */}
        <div className="hidden md:flex items-center mb-6">
  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
    {user?.profile_pic ? (
      <img src={user.profile_pic} alt="Profile" className="w-full h-full object-cover" />
    ) : (
      <span className="text-2xl font-bold text-gray-600">{user?.name?.charAt(0)}</span>
    )}
  </div>
  <div className="ml-2">
    <h2 className="text-lg font-semibold text-gray-700">{user?.name}</h2>
    <p className="text-sm text-gray-500">{user?.email}</p>
  </div>
</div>


        {/* Sidebar Menu with Icons Only on Mobile */}
        <ul className="space-y-2 flex flex-col items-center md:items-start w-full">
          {[
            { label: "Profile", icon: <User className="w-6 h-6 md:w-5 md:h-5" />, section: "profile" },
            { label: "Wishlist", icon: <Heart className="w-6 h-6 md:w-5 md:h-5" />, section: "wishlist" },
            { label: "Orders", icon: <ClipboardList className="w-6 h-6 md:w-5 md:h-5" />, section: "orders" },
            { label: "Address", icon: <MapPin className="w-6 h-6 md:w-5 md:h-5" />, section: "editAddress" },
            { label: "Cart", icon: <ShoppingCart className="w-6 h-6 md:w-5 md:h-5" />, section: "cart" },
          ].map(({ label, icon, section }) => (
            <li key={section} className="w-full">
              <Button
                variant="ghost"
                className={`flex flex-col md:flex-row items-center w-full p-3 rounded-lg hover:bg-gray-100 text-gray-700 ${
                  activeSection === section ? "bg-gray-200" : ""
                }`}
                onClick={() => setActiveSection(section)}
              >
                {icon} <span className="hidden md:inline ml-2">{label}</span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 w-full max-h-screen overflow-y-scroll p-6">
        {activeSection === "profile" && <EditProfile />}
        {activeSection === "editAddress" && <AddressManagement />}
        {activeSection === "wishlist" && <Wishlist />}
        {activeSection === "orders" && <OrderPage />}
        {activeSection === "cart" && <Cart />}
      </div>
    </div>
  );
};

export default UserProfile;
