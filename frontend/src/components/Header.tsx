"use client";
import React from "react";
import classes from "@/styles/header.module.css";
import Image from "next/image";
import Link from "next/link";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Header() {
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
    <div className={classes["container"]}>
      <div className={classes["home"]}>
        <Link href="/">
          <Image src="/robot.jpg" alt="Logo" width={50} height={50} />
        </Link>
        <h1>Genai Hackthon</h1>
      </div>
      <div className={classes["links"]}>
        <Link href="/account/signin">SignIn</Link>
        <Link href="/chat/new">Chat</Link>
        <Link href="/diagnosis">Diagnosis</Link>
      </div>
    </div>
  );
}
