'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCountry, updateLanguage } from '@/app/_lib/genericReducer';

export default function OptionsMenu() {
  const dispatch = useDispatch();
  const { country: currentShipping, language: currentLanguage } = useSelector((state) => state.generic.data);
  
 
  const DEFAULT_COUNTRY = 'India';
  const DEFAULT_LANGUAGE = 'English (India)';
  const DEFAULT_CURRENCY = 'USD US$';

  const [isOpen, setIsOpen] = useState(false);
  const [shipping, setShipping] = useState(currentShipping || DEFAULT_COUNTRY);
  const [language, setLanguage] = useState(currentLanguage || DEFAULT_LANGUAGE);
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  console.log(currentShipping+"   "+currentLanguage);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const hideDropdown = () => {
    setIsOpen(false);
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setShipping(selectedCountry);
    dispatch(updateCountry(selectedCountry));
    localStorage.setItem('country', selectedCountry);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    dispatch(updateLanguage(selectedLanguage));
    localStorage.setItem('language', selectedLanguage);
  };

  useEffect(() => {
    const persistedCountry = localStorage.getItem('country') || DEFAULT_COUNTRY;
    const persistedLanguage = localStorage.getItem('language') || DEFAULT_LANGUAGE;
    setShipping(persistedCountry);
    setLanguage(persistedLanguage);
    dispatch(updateCountry(persistedCountry));
    dispatch(updateLanguage(persistedLanguage));
  }, [dispatch]);

  return (
    <div
      className="relative"
      onMouseLeave={hideDropdown}
    >
      <span className="text-gray-300 text-sm me-2">Ship to</span>
      <button
        id="dropdownUserAvatarButton"
        onClick={toggleDropdown}
        className="flex items-center text-sm bg-transparent focus:outline-none"
        type="button"
      >
        <span className="font-medium text-white hover:text-orange-500">{shipping}/{language}</span>
      </button>

      {isOpen && (
        <div
          id="dropdownAvatar"
          className="absolute right-0 z-10 bg-white rounded-lg shadow w-80 p-4 dark:bg-gray-700"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shipping to:</label>
            <select
              value={shipping}
              onChange={handleCountryChange}
              className="block w-full text-gray-600 p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div className="mb-4 z-10">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language:</label>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 text-gray-600 focus:border-orange-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="English (India)">English (India)</option>
              <option value="English (US)">English (US)</option>
              <option value="English (UK)">English (UK)</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="block w-full p-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="USD US$">USD US$</option>
              <option value="INR ₹">INR ₹</option>
              <option value="EUR €">EUR €</option>
              <option value="GBP £">GBP £</option>
            </select>
          </div>

          <button
            onClick={hideDropdown}
            className="block w-full bg-orange-900 text-white font-medium py-2 rounded-lg hover:bg-orange-800"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
