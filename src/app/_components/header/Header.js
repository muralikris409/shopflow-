"use client";
import React, { useState, useEffect } from "react";
import { CartIcon } from "../../(application)/icons/Icon";
import UserMenu from "./UserMenu";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import MenuBar from "./MenuBar";
import { fetchData } from "@/app/_lib/categoryReducer";
import SearchBar from "./SearchBar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state?.session?.user);
  const cartCount = useSelector((state) => state?.cart?.length);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData("/products/category"));
  }, [dispatch]);

  const categories = useSelector((state) => state.categories);

  return (
    <header>
      <nav className="bg-gray-900 px-4 lg:px-6 py-2 max-w-screen">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl text-white">
          {/* Logo */}
          <Link href="/" className="flex">
            <span className="text-md sm:text-md md:text-3xl font-bold">
              <span className="text-white">Shop</span>
              <span className="text-orange-500">Flow</span>
              <br />
              <span className="block text-xs font-light">Global leading online shop</span>
            </span>
          </Link>

          {/* Search Bar - Visible in Desktop */}
          <div className="hidden lg:flex flex-1 justify-center">
            <SearchBar />
          </div>

          {/* User Menu & Cart */}
          <div className="hidden lg:flex items-center space-x-6">
            <UserMenu />
            <Link href="/cart" className="relative flex items-center justify-center text-gray-300 hover:text-white">
              {CartIcon}
              {isLoggedIn && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-orange-500 rounded-full transform translate-x-2 -translate-y-2">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
            <span className="sr-only">Toggle navigation</span> ☰
          </button>
        </div>

        {/* Mobile Search Bar (Separate Line) */}
        <div className="block  lg:hidden mt-2 px-4">
          <SearchBar />

        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-gray-800 px-1 py-2 space-y-1">
            <UserMenu />
            <Link href="/cart" className="ml-4 relative flex text-white text-sm hover:text-white">
              {CartIcon} <p className="ml-3">Cart</p>
            </Link>
          </div>
        )}
      </nav>

      {/* MenuBar (Categories) */}
      <MenuBar menuData={categories?.data?.data} />
    </header>
  );
}
