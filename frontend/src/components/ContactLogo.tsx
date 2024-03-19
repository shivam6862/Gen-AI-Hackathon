import React from "react";
import { AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";
import classes from "@/styles/contactLogo.module.css";

interface ContactLogoProps {
  size: string;
  rotate: number;
  gapSize: string;
}

const ContactLogo: React.FC<ContactLogoProps> = ({ size, rotate, gapSize }) => {
  const URL = [
    "https://www.linkedin.com/",
    "https://www.instagram.com/",
    "https://twitter.com/",
    "https://www.facebook.com/",
  ];
  const LOGOS = [
    <AiOutlineLinkedin />,
    <AiOutlineInstagram />,
    <FaSquareXTwitter />,
    <FaFacebook />,
  ];
  const contact_arr = ["linkedin", "instagram", "twitter", "facebook"];

  return (
    <div className={classes.container}>
      <div
        className={classes.box}
        style={rotate == 1 ? { flexDirection: "column" } : { gap: gapSize }}
      >
        {contact_arr.map((item, index) => (
          <Link href={URL[index]} key={index} target="_blank">
            {LOGOS[index]}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ContactLogo;
