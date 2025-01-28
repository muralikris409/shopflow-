
// 'use client';
// import { useState, useEffect, useCallback, use } from 'react';
// import Link from 'next/link';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { setSession } from '@/app/_lib/sessionReducer';
// import { useSession, signOut } from 'next-auth/react';
// import { FaUserCircle } from 'react-icons/fa';
// import Cookies from 'js-cookie'; // Import js-cookie for cookie handling

// export default function UserMenu() {
//   const [isOpen, setIsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { data: session } = useSession();
//   const user = useSelector(state => state?.session?.user);
//   const syncUser = () => {
//     const userData = Cookies.get("shopflow_session");
//     console.log("userData",userData);
//     if (userData) {
//       try {
//         const parsedData = JSON.parse(userData);
//         dispatch(setSession(parsedData));
//       } catch (error) {
//         console.error("Failed to parse user data:", error);
//       }
//     }
//   };

//   const toggleDropdown = () => {
//     setIsOpen(prevState => !prevState);
//   };

//   const handleSignOut = async () => {
//     try {
//       if (session) {
//         await signOut({ callbackUrl: '/' });
//       }
//       Cookies.remove("shopflow_session"); // Remove user data from cookies
//       dispatch(setSession({}));
//       router.reload('/');
//     } catch (error) {
//       console.error('Sign-out error:', error);
//     }
//   };

//   useEffect(() => {
//     syncUser();
//     const handleClickOutside = (event) => {
//       const dropdown = document.getElementById('dropdownAvatar');
//       if (dropdown && !dropdown.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative">
//       <button
//         id="dropdownUserAvatarButton"
//         onClick={toggleDropdown}
//         className="flex items-center text-sm bg-gray-800 px-3 py-1 rounded-md focus:outline-none"
//         type="button"
//         aria-expanded={isOpen}
//         aria-haspopup="true"
//       >
//         <div className="flex items-center">
//           <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-500 flex justify-center items-center mr-2">
//             {user ? (
//               user?.googleId ? (
//                 <img
//                   src={session?.user?.image || '/_assets/user.png'}
//                   alt="User Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <img
//                   src={user?.profile_pic || '/_assets/user.png'}
//                   alt="User Profile"
//                   className="w-full h-full object-cover"
//                 />
//               )
//             ) : (
//               <FaUserCircle className="text-white text-3xl" />
//             )}
//           </div>
//           <span className="font-medium text-white hover:text-orange-500">
//             {user?.name || 'Sign in'}
//           </span>
//         </div>
//       </button>

//       {isOpen && (
//         <div
//           id="dropdownAvatar"
//           className="absolute right-0 z-10 bg-white rounded-lg shadow w-56 dark:bg-gray-700"
//         >
//           {user?.name ? (
//             <ul className="text-sm text-gray-700 dark:text-gray-200">
//               <li className="px-4 py-3">
//                 <button
//                   className="w-full text-left block bg-orange-500 text-white font-medium py-2 px-3 rounded-lg hover:bg-orange-600"
//                   onClick={handleSignOut}
//                 >
//                   Sign out
//                 </button>
//               </li>
//               <li className="px-4 py-2">
//                 <Link href="/user/profile" className="block hover:text-orange-500 hover:underline">
//                   My Account
//                 </Link>
//               </li>
//               <li className="px-4 py-2">
//                 <Link href="/orders" className="block hover:text-orange-500 hover:underline">
//                   My Orders
//                 </Link>
//               </li>
//               <li className="px-4 py-2">
//                 <Link href="/cart" className="block hover:text-orange-500 hover:underline">
//                   My Cart
//                 </Link>
//               </li>
//               <li className="px-4 py-2">
//                 <Link href="/wishlist" className="block hover:text-orange-500 hover:underline">
//                   My Wishlist
//                 </Link>
//               </li>
//             </ul>
//           ) : (
//             <div className="p-4 text-center">
//               <Link href="/auth" className="block mb-2 text-orange-500 font-medium text-sm">
//                 Sign in or New Customer start here..
//               </Link>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setSession } from '@/app/_lib/sessionReducer';
import { useSession, signOut } from 'next-auth/react';
import { FaUserCircle } from 'react-icons/fa';
import Cookies from 'js-cookie';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const user = useSelector((state) => state?.session?.user);

  const syncUser = () => {
    const userData = Cookies.get("shopflow_session");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        dispatch(setSession(parsedData));
      } catch (error) {
        console.error("Failed to parse user data from cookies:", error);
      }
    }
  };
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSignOut = async () => {
    try {
      if (session) {
        await signOut({ callbackUrl: '/' });
      }
      Cookies.remove("shopflow_session");
      dispatch(setSession({})); 
      router.reload('/');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      syncUser();
    }
  
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('dropdownAvatar');
      if (dropdown && !dropdown.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [user]);

  return (
    <div className="relative">
      <button
        id="dropdownUserAvatarButton"
        onClick={toggleDropdown}
        className="flex items-center text-sm bg-gray-800 px-3 py-1 rounded-md focus:outline-none"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-500 flex justify-center items-center mr-2">
           
              {user?.image ?(
                <img
                  src={user?.profile_pic || '/_assets/user.png'}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              
            ) : (
              <FaUserCircle className="text-white text-3xl" />
            )}
          </div>
          <span className="font-medium text-white hover:text-orange-500">
            {user?.name || 'Sign in'}
          </span>
        </div>
      </button>

      {isOpen && (
        <div
          id="dropdownAvatar"
          className="absolute right-0 z-10 bg-white rounded-lg shadow w-56 dark:bg-gray-700"
        >
          {user?.name ? (
            <ul className="text-sm text-gray-700 dark:text-gray-200">
              <li className="px-4 py-3">
                <button
                  className="w-full text-left block bg-orange-500 text-white font-medium py-2 px-3 rounded-lg hover:bg-orange-600"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </li>
              <li className="px-4 py-2">
                <Link href="/user/profile" className="block hover:text-orange-500 hover:underline">
                  My Account
                </Link>
              </li>
              <li className="px-4 py-2">
                <Link href="/orders" className="block hover:text-orange-500 hover:underline">
                  My Orders
                </Link>
              </li>
              <li className="px-4 py-2">
                <Link href="/cart" className="block hover:text-orange-500 hover:underline">
                  My Cart
                </Link>
              </li>
              <li className="px-4 py-2">
                <Link href="/wishlist" className="block hover:text-orange-500 hover:underline">
                  My Wishlist
                </Link>
              </li>
            </ul>
          ) : (
            <div className="p-4 text-center">
              <Link href="/auth" className="block mb-2 text-orange-500 font-medium text-sm">
                Sign in or New Customer start here..
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
