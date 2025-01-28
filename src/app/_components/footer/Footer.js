import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaPinterestP, FaTiktok, FaApple, FaGooglePlay, FaTelegram, FaWhatsapp, FaReddit, FaVk } from "react-icons/fa";
import { IoQrCodeOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-8">
      

        <div className="mt-8 text-center text-sm">
          © 2006-2024 ShopFlow. <a href="#" className="hover:text-orange-500">Terms</a> | <a href="#" className="hover:text-orange-500">Privacy</a> | <a href="#" className="hover:text-orange-500">Specialized Affairs</a>
        </div>
      
    </footer>
  );
}
