// "use client";

// import { Button } from "@components/ui/button";
// import { CircleX, MenuIcon } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";

// const Header = () => {
//   // State to manage the navbar's visibility
//   const [nav, setNav] = useState(false);

//   // Toggle function to handle the navbar's display
//   const handleNav = () => {
//     setNav((prev) => !prev);
//   };

//   // Array containing navigation items
//   const navItems = [
//     { id: 1, text: "For Sale", to: "/sale" },
//     { id: 2, text: "For Rent", to: "/" },
//     { id: 3, text: "Agent Finder", to: "/" },
//   ];

//   return (
//     <div className="z-10 flex justify-between items-center py-6 px-4 md:px-20">
//       {/* Logo */}
//       <Link href={"/"}>
//         <Image src={"/logo.svg"} width={30} height={30} />
//       </Link>

//       {/* Desktop Navigation */}
//       <ul className="hidden md:flex items-center">
//         {navItems.map((item) => (
//           <Link
//             href={item.to}
//             key={item.id}
//             className="hover:text-purple-800 px-4 font-medium cursor-pointer duration-300"
//           >
//             {item.text}
//           </Link>
//         ))}
//         <Button variant="outline" className="text-md hidden md:block ml-8">
//           Login
//         </Button>
//       </ul>

//       {/* Mobile Navigation Icon */}
//       <div onClick={handleNav} className="block md:hidden">
//         <MenuIcon className="text-black" size={30} />
//       </div>

//       {/* Mobile Navigation Menu */}
//       <ul
//         className={
//           nav
//             ? "fixed md:hidden left-0 top-0 w-[100%] h-full border-r border-r-gray-900 bg-purple-800 ease-in-out duration-500 z-20 pt-10 text-center"
//             : "fixed md:hidden left-[-100%] top-0 w-[100%] h-full border-r border-r-gray-900 bg-purple-800 ease-in-out duration-500 z-20 pt-10 text-center"
//         }
//       >
//         {/* Close Icon */}
//         <div onClick={handleNav} className="absolute right-5 top-5">
//           <CircleX className="duration-200 text-white" size={30} />
//         </div>

//         {/* Mobile Logo */}
//         <Link
//           href={"/"}
//           onClick={handleNav}
//           className="w-full text-3xl font-bold mb-32"
//         >
//           BLOCKS
//         </Link>

//         {/* Mobile Navigation Items */}
//         {navItems.map((item) => (
//           <Link
//             href={item.to}
//             key={item.id}
//             onClick={handleNav}
//             className="p-4 flex text-center flex-col font-medium text-2xl"
//           >
//             {item.text}
//           </Link>
//         ))}

//         <Button variant="outline">Login</Button>
//       </ul>
//     </div>
//   );
// };

// export default Header;

"use client";

import { Button } from "@components/ui/button";
import { CircleX, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Header = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // State to manage the user's login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Placeholder function to check user's login status
  // Replace this with your actual login status check logic
  useEffect(() => {
    const checkLoginStatus = async () => {
      // Simulating a login check
      const loggedIn = await fakeLoginCheck();
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

  const fakeLoginCheck = () => {
    // Simulate a check for user authentication status
    // Replace with actual logic for checking authentication
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  };

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav((prev) => !prev);
  };

  // Navigation items for logged in users
  const loggedInNavItems = [
    { id: 1, text: "For Sale", to: "/sale" },
    { id: 2, text: "For Rent", to: "/rent" },
    { id: 3, text: "Agent Finder", to: "/agents" },
    { id: 4, text: "Post your Ad", to: "/post-ad" },
  ];

  // Navigation items for not logged in users
  const loggedOutNavItems = [
    { id: 1, text: "About Us", to: "/about" },
    { id: 2, text: "Features", to: "/features" },
  ];

  return (
    <div className="z-10 flex justify-between items-center py-6 px-4 md:px-20">
      {/* Logo */}
      <Link href={"/"}>
        <Image src={"/logo.svg"} width={30} height={30} alt="Logo" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center">
        {(isLoggedIn ? loggedInNavItems : loggedOutNavItems).map((item) => (
          <Link
            href={item.to}
            key={item.id}
            className="hover:text-purple-800 px-4 font-medium cursor-pointer duration-300"
          >
            {item.text}
          </Link>
        ))}
        {!isLoggedIn && (
          <Button variant="outline" className="text-md hidden md:block ml-8">
            Login
          </Button>
        )}
        {isLoggedIn && (
          <div className="ml-8">
            <UserProfileIcon />
          </div>
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
            ? "fixed md:hidden left-0 top-0 w-[100%] h-full border-r border-r-gray-900 bg-purple-800 ease-in-out duration-500 z-20 pt-10 text-center"
            : "fixed md:hidden left-[-100%] top-0 w-[100%] h-full border-r border-r-gray-900 bg-purple-800 ease-in-out duration-500 z-20 pt-10 text-center"
        }
      >
        {/* Close Icon */}
        <div onClick={handleNav} className="absolute right-5 top-5">
          <CircleX className="duration-200 text-white" size={30} />
        </div>

        {/* Mobile Logo */}
        <Link
          href={"/"}
          onClick={handleNav}
          className="w-full text-3xl font-bold mb-32"
        >
          BLOCKS
        </Link>

        {/* Mobile Navigation Items */}
        {(isLoggedIn ? loggedInNavItems : loggedOutNavItems).map((item) => (
          <Link
            href={item.to}
            key={item.id}
            onClick={handleNav}
            className="p-4 flex text-center flex-col font-medium text-2xl"
          >
            {item.text}
          </Link>
        ))}

        {!isLoggedIn && (
          <Button variant="outline" onClick={handleNav}>
            Login
          </Button>
        )}
        {isLoggedIn && (
          <div className="p-4 flex justify-center">
            <UserProfileIcon />
          </div>
        )}
      </ul>
    </div>
  );
};

const UserProfileIcon = () => (
  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
    U
  </div>
);

export default Header;
