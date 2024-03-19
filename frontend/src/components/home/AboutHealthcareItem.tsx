import React, { useEffect } from "react";
import classes from "@/styles/home/aboutHealthcareItem.module.css";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import Link from "next/link";

interface AboutHealthcareItemProps {
  item: {
    a_tag: string;
    image: string;
    heading: string;
    about: string;
    three_key_points: string[];
    short_motivation: string;
  };
  index: number;
}
const AboutHealthcareItem: React.FC<AboutHealthcareItemProps> = ({
  item,
  index,
}) => {
  return (
    <div className={classes.servicesItem} key={index}>
      <div className={classes.left}>
        <div className={classes.servicesItemImage}>
          <Image
            src={item.image}
            alt="Website Making"
            width={610}
            height={345}
          />
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.servicesItemHeading}>
          <h1>{item.heading}</h1>
        </div>
        <div className={classes.servicesItemAbout}>
          <p>{item.about}</p>
        </div>
        <div className={classes.servicesItemThreeKeyPoints}>
          <ul>
            {item.three_key_points.map((point, index) => (
              <li key={index}>
                <TiTick />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.servicesItemShortMotivation}>
          <p>{item.short_motivation}</p>
        </div>
        <div className={classes.button}>
          <Link href={item.a_tag}>
            <p>Get Started</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutHealthcareItem;
