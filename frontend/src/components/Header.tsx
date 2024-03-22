"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "../styles/header.module.css";
import ContactLogo from "./ContactLogo";
import { usePathname } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState<boolean>(true);
  const [currentNav, setCurrentNav] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const navref = useRef<HTMLDivElement | any>(null);
  const NavBarContent = [
    "/Home",
    "/signup",
    "/chat",
    "/diagnosis",
    "/#contact",
  ];
  const NavBarContentLink = [
    "/",
    "/account/signup",
    "/chat/new",
    "/diagnosis",
    "#contact",
  ];
  const currentPath = usePathname();

  const navBarBottomNavigation = (index: number) => {
    const navDiv = navref.current;
    const aElements = navDiv.getElementsByTagName("a");
    const calcLeft = aElements[index].offsetLeft;
    navDiv.style.setProperty("--left-navbar", calcLeft + "px");
    const calWidth = aElements[index].offsetWidth / navDiv.offsetWidth;
    navDiv.style.setProperty("--width-navbar", calWidth);
  };

  if (windowWidth >= 620 && isNavCollapsed === true) {
    setIsNavCollapsed(false);
  }

  const handleNavLinkClick = (index: number) => {
    navBarBottomNavigation(index);
    setCurrentNav(index);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    navBarBottomNavigation(currentNav);
  }, [windowWidth]);

  useEffect(() => {
    if (currentPath == "/") {
      return;
    }
    const currentIndex = NavBarContent.findIndex(
      (path) => path === currentPath
    );
    if (currentIndex != -1) handleNavLinkClick(currentIndex);
  }, [currentPath]);

  const [storedValue] = useLocalStorage("user", {
    login_token: "",
    id: "",
    email: "",
    phone_number: "",
    name: "",
  });
  console.log(storedValue);
  const isLogined = storedValue?.login_token ? true : false;

  return (
    <div className={`${classes.header_background} ${classes.header}`}>
      <div className={classes.left_logo}>
        <Link
          href={"/"}
          onClick={() => {
            handleNavLinkClick(0);
          }}
        >
          <Image src={"/robot.jpg"} width={50} height={48} alt="logo" />
        </Link>
      </div>

      <button
        className={isNavCollapsed ? classes.hamburgerchange : classes.hamburger}
        onClick={() => {
          setIsNavCollapsed(!isNavCollapsed);
        }}
      >
        <div className={classes.line1}></div>
        <div className={classes.line2}></div>
        <div className={classes.line3}></div>
      </button>
      <div
        className={
          isNavCollapsed
            ? classes.right_Navigation_Collapsed
            : classes.right_Navigation
        }
        ref={navref}
      >
        {NavBarContent.map((item, index) => (
          <Link
            href={NavBarContentLink[index]}
            id={item}
            key={index}
            onClick={() => {
              setIsNavCollapsed(false);
              handleNavLinkClick(index);
            }}
            style={
              currentNav == index
                ? isNavCollapsed
                  ? { color: "var(--black-color)" }
                  : { color: "var(--primary-color)" }
                : {}
            }
          >
            {item.includes("#") ? item.substring(2) : item.substring(1)}
          </Link>
        ))}
        <div className={classes.contactlogos}>
          <h1>Follow us on</h1>
          <ContactLogo size={"30px"} rotate={0} gapSize={"1rem"} />
        </div>
      </div>
    </div>
  );
};

export default Header;
