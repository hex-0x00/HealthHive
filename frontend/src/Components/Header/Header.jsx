import React, { useState, useRef, useEffect } from "react";
import { Logo, MenuButton, ProfileIcon, Input } from "..";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", route: "/" },
    { name: "Chats", route: "/chats" },
    { name: "About us", route: "/aboutus" },
    { name: "Contact", route: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuUncheck = () => {
    const menuBtn = document.querySelector("#burger-checkbox");
    menuBtn.checked = false;
    setIsMenuOpen(false)
  };

  return (
    <>
      <header className="h-[15vh] w-screen z-40 flex justify-between items-center px-6 md:px-16 lg:px-24">
        <MenuButton className="md:hidden inline z-[60]" onClick={toggleMenu} />
        <Logo />
        <nav
          className={`md:flex ${
            isMenuOpen ? "flex" : "hidden"
          } flex-col md:flex-row absolute md:relative top-28 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-10`}>
          <ul className="flex flex-col md:flex-row md:space-x-7 lg:space-x-9 p-4 md:p-0">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `bold mb-4 md:mb-0 hover:text-black font-semibold text-lg lg:text-xl relative ${
                    isActive
                      ? "text-black active dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`
                }
                to={item.route}
                key={item.name}
                onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </NavLink>
            ))}
          </ul>
        </nav>
        <ProfileIcon />
      </header>
      <div
        className={`flex md:hidden fixed h-screen z-50 w-full bg-[#EBF7F7] dark:bg-[#091f1f] flex-col top-0 transition-all ${
          isMenuOpen ? "left-0" : "left-[-100%]"
        } p-4 justify-center items-center`}>
        <nav className="flex flex-col justify-center items-center">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `mb-4 md:mb-0 hover:text-black font-semibold text-lg lg:text-xl relative ${
                  isActive
                    ? "text-black active dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`
              }
              to={item.route}
              key={item.name}
              onClick={menuUncheck}>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Header;
