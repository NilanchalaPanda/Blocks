"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@components/ui/button";
import { CircleX, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const [nav, setNav] = useState(false);

  // State to manage the user's login status
  const { user, isSignedIn } = useUser();

  const path = usePathname();

  const handleNav = () => {
    setNav((prev) => !prev);
  };

  // Navigation items for logged in users
  const loggedInNavItems = [
    { id: 1, text: "For Sell", to: "/sell" },
    // { id: 2, text: "For Rent", to: "/rent" },
    { id: 3, text: "Agent Finder", to: "/agents" },
  ];

  // Navigation items for not logged in users
  const loggedOutNavItems = [{ id: 1, text: "About Us", to: "/about" }];

  return (
    <div className="z-10 flex justify-between items-center py-6 px-4 md:px-20 bg-slate-100 shadow-xl rounded-b-[20px]">
      {/* Logo */}
      <Link href={"/"} className="flex items-center justify-center space-x-3">
        <Image
          className="text-[#7f1790]"
          src={"/logo.svg"}
          width={30}
          height={30}
          alt="Logo"
        />
        <span className="text-[#7f1790] font-bold lg:text-xl lg:font-semibold lg:font-mono">
          BLOCKS
        </span>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center">
        {(isSignedIn ? loggedInNavItems : loggedOutNavItems).map((item) => (
          <Link
            href={item.to}
            key={item.text}
            className={`hover:text-purple-800 px-4 font-medium cursor-pointer duration-300 ${
              path === item.to ? "text-primary" : ""
            }`}
          >
            {item.text}
          </Link>
        ))}

        {!isSignedIn && (
          <div className="flex gap-x-2">
            <Link href={"/sign-in"}>
              <Button variant="outline" className="text-md hidden md:block">
                Login
              </Button>
            </Link>

            <Link href={"/sign-up"}>
              <Button className="text-md hidden md:block">Get Started</Button>
            </Link>
          </div>
        )}
        {isSignedIn && (
          <>
            <Link href={"/add-new-listing"} className="mr-3">
              <Button className="px-6 text-[16px]">Post Your Ad</Button>
            </Link>

            <UserButton />
          </>
        )}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        <MenuIcon className="text-black" size={30} />
      </div>  

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[100%] h-[100%] bg-gradient-to-b from-gray-200 from-10% via-purple-500 via-30% to-[#7f1790] to-90% ease-in-out duration-500 z-20 pt-10 text-center"
            : "fixed md:hidden left-[-100%] top-0 w-[100%] h-[100%] bg-gradient-to-b from-gray-200 from-10% via-purple-500 via-30% to-[#7f1790] to-90% ease-in-out duration-500 z-20 pt-10 text-center"
        }
      >
        {/* Close Icon */}
        <div onClick={handleNav} className="absolute right-5 top-5">
          <CircleX className="duration-200" size={30} />
        </div>

        {/* Mobile Logo */}

        <Link
          href={"/"}
          onClick={handleNav}
          className="flex items-center justify-center space-x-3 mt-10"
        >
          <Image
            className="text-[#7f1790]"
            src={"/logo.svg"}
            width={40}
            height={40}
            alt="Logo"
          />
          <span className="text-5xl font-semibold font-mono">BLOCKS</span>
        </Link>

        {/* Mobile Navigation Items */}
        {(isSignedIn ? loggedInNavItems : loggedOutNavItems).map((item) => (
          <Link
            href={item.to}
            key={item.id}
            onClick={handleNav}
            className="p-4 text-black flex text-center flex-col font-medium text-2xl mt-24"
          >
            {item.text}
          </Link>
        ))}

        {!isSignedIn && (
          <Button
            variant="outline"
            className="text-2xl px-10 py-5 font-semibold"
            onClick={handleNav}
          >
            Login
          </Button>
        )}

        {isSignedIn && (
          <div className="p-4 flex justify-center">
            <Link href={"/add-new-listing"} className="mr-3">
              <Button>Post Your Ad</Button>
            </Link>

            {/* USER PROFILE BUTTON */}
            <UserButton />
          </div>
        )}
      </ul>
    </div>
  );
};

export default Header;
