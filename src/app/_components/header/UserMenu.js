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
import { Skeleton } from '@/components/ui/skeleton';

export default function UserMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  const { user: userData, loading, error } = useSelector((state) => state.userData);
  console.log(userData, error);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    try {
      const sessionCookie = Cookies.get('shopflow_session');
      if (sessionCookie) {
        const { token } = JSON.parse(sessionCookie);
        if ( token) {
          dispatch(fetchData(`user/userProfileInfo`, token));
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
      router.replace(router.asPath);
    } catch (err) {
      setLocalError('Sign-out failed. Try again.');
      console.error('Sign-out error:', err);
    }
  };

  if (loading) {
    return <UserMenuSkeleton />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost"  className="flex items-center space-x-2 group">
          <Avatar>
            <AvatarImage src={userData?.profile_pic || '/_assets/user.png'} alt="User  Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="font-medium  hover:text-orange-500 group-hover:text-orange-500">
            {userData?.name || 'Sign in'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {error || localError ? (
          <DropdownMenuItem className="text-red-500">Error loading user data</DropdownMenuItem>
        ) : userData?.name ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/user/profile" className="block w-full py-2 px-3 hover:text-orange-500">
                My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={handleSignOut} variant="destructive" className="w-full bg-orange-500">
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

function UserMenuSkeleton() {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar>
            <Skeleton className="w-10 h-10 rounded-full" />
          </Avatar>
          <Skeleton className="h-4 w-20" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <Skeleton className="h-4 w-full" />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Skeleton className="h-4 w-full" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}