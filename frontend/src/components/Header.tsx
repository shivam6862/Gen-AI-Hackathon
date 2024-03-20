import React from "react";
import classes from "@/styles/header.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
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
        <Link href="/account/signup">SignUp</Link>
        <Link href="/chat/new">Chat</Link>
        <Link href="/diagnosis">Diagnosis</Link>
        <Link href="/form/cancer">Form</Link>
      </div>
    </div>
  );
}
