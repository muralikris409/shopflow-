"use client"
import React, { useState ,useEffect} from 'react';
import { CartIcon } from '../../(application)/icons/Icon';
import UserMenu from './UserMenu';
import OptionsMenu from './CountryToggle';
import Link from 'next/link';
import { useSelector,useDispatch } from 'react-redux';
import MenuBar from "./MenuBar"
import { fetchData } from '@/app/_lib/categoryReducer';
import SearchBar from './SearchBar';
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn=useSelector(state=>state.session.user);
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchData('/products/category'));
    
  }, [dispatch]);

  const categories=useSelector(state=>state.api);
  return (
    <header>

      <nav className="bg-gray-900 px-4 lg:px-6 py-2 ">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl text-white">
        <Link href="/" className="flex">
  <span className="text-md sm:text-md md:text-3xl font-bold">
    <span className="text-white">Shop</span>
    <span className="text-orange-500">Flow</span>
    <br />
    <span className="block text-xs font-light">Global leading online shop</span>
  </span>
</Link>
    
         <SearchBar/>
          <div className="hidden lg:flex items-center space-x-6">
           
            <UserMenu />
            <div>
            <Link href="/cart" className="relative flex items-center justify-center text-gray-300 hover:text-white">
              {CartIcon}
              {(isLoggedIn)&&<span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-orange-500 rounded-full transform translate-x-2 -translate-y-2">
                
              </span>}
            </Link>
            </div>
          </div>

          <button
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={handleMobileMenuToggle}
          >
            <span className="sr-only">Toggle navigation</span>
            ☰
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-gray-800 px-4 py-2 space-y-4">
            {/* <OptionsMenu /> */}
            <UserMenu />
          </div>
        )}
      </nav>
      <MenuBar menuData={categories?.data?.data}/>
    </header>
  );
}
