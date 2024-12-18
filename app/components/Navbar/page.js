"use client";


import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaRegHeart,
  FaRegUserCircle,
  FaRegBell,
} from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "@/app/redux/slices/authSlice";
import { useRouter } from 'next/navigation';
import { CiShoppingCart } from "react-icons/ci";

const Navbar = () => {
  const user = useSelector(state => state.auth.user);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  console.log(isAuthenticated);
  const handleLogout = () => {
    dispatch(logout());
   
    router.push('/');
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref for the menu
  const pathname = usePathname(); // Get the current route

  // Toggle menu and body overlay
  const toggleMenu = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 854) {
      setIsMenuOpen(!isMenuOpen);
      document.body.classList.toggle("menu-open", !isMenuOpen);
    }
  };
  

  // Close menu on body click
  const handleBodyClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
      document.body.classList.remove("menu-open");
    }
  };

  // Add and clean up event listener
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", handleBodyClick);
    } else {
      document.removeEventListener("click", handleBodyClick);
    }
    return () => {
      document.removeEventListener("click", handleBodyClick);
    };
  }, [isMenuOpen]);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, []);

  // Add `active` class based on the current route
  const getLinkClass = (href) => {
    return pathname === href ? "active" : "";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`navbarMain ${isSticky ? "fixed" : ""}`}>
    <div className="navbarContainer">
      <nav className="navbar">
        <div className="navIcons">
          <div className="menuToggle" onClick={toggleMenu}>
            {!isMenuOpen ? (
              <FaBars className="icon" />
            ) : (
              <FaTimes className="icon" />
            )}
          </div>
          <div className="logo">
            <Link href="/">
              <img src="/image/logo.png" alt="Logo" />
            </Link>
          </div>

          {/* Navigation Items */}
          <ul
            ref={menuRef} // Attach the ref here
            className={`navItems ${isMenuOpen ? "active" : ""}`}
          >
            <li>
               <Link
                href="/"
                className={getLinkClass("/")}
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/pages/Pets"
                className={getLinkClass("/pages/Pets")}
                onClick={toggleMenu}
              >
                Pets
              </Link>
            </li>
            <li>
            <Link
                href="/pages/Products"
                className={getLinkClass("/pages/Products")}
                onClick={toggleMenu}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/pages/Shop"
                className={getLinkClass("/pages/Shop")}
                onClick={toggleMenu}
              >
                Shops
              </Link>
            </li>
            <li>
            <Link
                href="/pages/Blog"
                className={getLinkClass("/pages/Blog")}
                onClick={toggleMenu}
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
        {isAuthenticated ? (
          <div className="rightMenu">
          <Link href="/pages/Cart" >
          <CiShoppingCart />
          </Link>

          <Link href="/pages/Profile" >
            <span className="helloText">
            {/* {user.firstName}  */}
            <img src="/image/profile.png" alt="ee" />
            </span>
          </Link>
        <button onClick={handleLogout} className='login-btn'>Logout</button>

        </div>
        ) : (
          <div className="rightMenu">
          
              <Link
                href="/pages/Login"
                className='login-btn'
                onClick={toggleMenu}
              >
                Login
              </Link>
         </div>
        )}
        {/* Right Side Icons */}
        
      </nav>
    </div>
  </div>
  );
};

export default Navbar;
