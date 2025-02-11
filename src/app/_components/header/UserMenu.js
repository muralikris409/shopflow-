'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import { fetchData } from '@/app/_lib/userReducer';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function UserMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

 
  const { user:userData, loading, error } = useSelector((state) => state.userData);
  console.log(userData,error);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    try {
      const sessionCookie = Cookies.get('shopflow_session');
      if (sessionCookie) {
        const { user, token } = JSON.parse(sessionCookie);
        if (user?.id && token) {
          
          dispatch(fetchData(`user/userProfileInfo?userId=${user.id}`, token));
        }
      }
    } catch (err) {
      setLocalError('Failed to load session data.');
      console.error('Error parsing session cookie:', err);
    }
  }, [dispatch]);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      Cookies.remove('shopflow_session');
      router.refresh();
      router.push('/');
    } catch (err) {
      setLocalError('Sign-out failed. Try again.');
      console.error('Sign-out error:', err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={userData?.profile_pic || '/_assets/user.png'} alt="User Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="font-medium text-white hover:text-orange-500">
            {loading ? 'Loading...' : userData?.name || 'Sign in'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {error || localError ? (
          <DropdownMenuItem className="text-red-500">Error loading user data</DropdownMenuItem>
        ) : loading ? (
          <DropdownMenuItem>Loading...</DropdownMenuItem>
        ) : userData?.name ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/user/profile2" className="block w-full py-2 px-3 hover:text-orange-500">
                My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={handleSignOut} variant="destructive" className="w-full">
                Sign out
              </Button>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/auth" className="w-full text-center text-orange-500 font-medium text-sm">
              Sign in or New Customer start here..
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
