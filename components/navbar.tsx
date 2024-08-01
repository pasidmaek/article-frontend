'use client'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";
import { useEffect, useState } from "react";
import { logoutService } from "@/config/service/authorize";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown";

export const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLogin(!!localStorage.getItem('user'));
    };

    checkLoginStatus();
  }, [localStorage.getItem('user')]);

  const handleAuthAction = (action: 'logout' | 'profile') => {
    if (action === 'logout') {
      logoutService().then(() => {
        setIsLogin(false);
        localStorage.removeItem('user')
        localStorage.removeItem('autho')
        localStorage.removeItem('article-notsave')
        router.push('/');
      });
    } else if (action === 'profile') {
      router.push('/my_post');
    }
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">SOCIAL</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="md:flex">
          {isLogin ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  radius="sm"
                  src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Menu">
                <DropdownItem key="profile" onClick={() => handleAuthAction('profile')}>
                  My Post
                </DropdownItem>
                <DropdownItem key="logout" color="warning" onClick={() => handleAuthAction('logout')}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              onClick={() => router.push('/signin')}
              className="text-sm font-normal text-default-600 bg-default-100"
              href={siteConfig.links.sponsor}
              variant="flat"
            >
              Signin
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
