'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setSession } from '@/app/_lib/sessionReducer';
import { useSession, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import { fetchData } from '@/app/_lib/userReducer';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const userData = useSelector((state) => state.userData?.user);

  useEffect(() => {
    const userIdFromCookie = JSON.parse(Cookies.get("shopflow_session") || null);
    const userId = userIdFromCookie?.user?.id;
    const token = userIdFromCookie?.token;

    if (userId) {
      dispatch(setSession(userIdFromCookie));
      dispatch(fetchData(`user/userProfileInfo?userId=${userId}`, token));
    }
  }, [dispatch]);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
      Cookies.remove("shopflow_session");
      dispatch(setSession(null));
      router.refresh();
    } catch (error) {
      console.error('Sign-out error:', error);
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
            {userData?.name || 'Sign in'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {userData?.name ? (
          <>
            <DropdownMenuItem>
              <Link href="/user/profile2" className="w-full block py-2 px-3 hover:text-orange-500">
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
          <DropdownMenuItem>
            <Link href="/auth" className="w-full text-center text-orange-500 font-medium text-sm">
              Sign in or New Customer start here..
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
