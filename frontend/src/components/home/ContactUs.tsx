"use client";
import React, { useState } from "react";
import classes from "@/styles/home/contactUs.module.css";
import Image from "next/image";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <h1>Subscribe Us</h1>
        <p>Subscribe to our newsletter to get the latest updates</p>
        <div className={classes.input_container}>
          <input
            type="text"
            placeholder="Enter your email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Subscribe</button>
        </div>
        <div className={classes.images}>
          <Image
            src="/image/contact.jpg"
            alt="contact us"
            width={230}
            height={230}
          />
        </div>
      </div>
      <div className={classes.background}></div>
    </div>
  );
};

export default ContactUs;
