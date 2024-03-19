"use client";
import React, { useEffect, useState } from "react";
import classes from "@/styles/page.module.css";
import Image from "next/image";
import { useNotification } from "@/hooks/useNotification";
import AboutHealthcare from "@/components/home/AboutHealthcare";
import ContactUs from "@/components/home/ContactUs";

export default function Home() {
  const { NotificationHandler } = useNotification();
  useEffect(() => {
    NotificationHandler(
      "Gen Ai mech hackthon",
      "Welcome to the hackthon",
      "Success"
    );
  }, []);

  return (
    <div className={classes["container"]}>
      <div className={classes["box"]}>
        <div className={classes["top-image"]}>
          <Image
            src="/image/background.jpg"
            alt="background"
            width={1920}
            height={1080}
          />
          <div className={classes["image"]}></div>
          <div className={classes["about-heading"]}>
            <h1>Ethical AI in the healthcare</h1>
            <h2>It could be in diagnosis or recommendation</h2>
          </div>
        </div>
        <AboutHealthcare />
        <ContactUs />
      </div>
    </div>
  );
}
