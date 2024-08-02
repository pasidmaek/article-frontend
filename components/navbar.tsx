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
import { useAuth } from "@/config/context/AuthContext";

export const Navbar = () => {
  const { isLogin, setIsLogin } = useAuth()
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user');
      setIsLogin(!!user);
    };

    checkLoginStatus();
  }, []);

  const handleAuthAction = async (action: 'logout' | 'post') => {
    if (action === 'logout') {
      const result = await logoutService()
      if (result) {
        setIsLogin(false);
      };
    } else if (action === 'post') {
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
                <DropdownItem key="profile" onClick={() => handleAuthAction('post')}>
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
