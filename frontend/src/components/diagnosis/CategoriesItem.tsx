import React from "react";
import classes from "@/styles/diagnosis/categories.module.css";
import Image from "next/image";
import Link from "next/link";

type CategorieSliderItemProps = {
  data: {
    a_tag: string;
    image: string;
    paragraph: string;
    heading: string;
    unique_uuid: string;
  };
};

const CategorieSliderItem: React.FC<CategorieSliderItemProps> = ({ data }) => {
  return (
    <Link href={`/form/${data.a_tag}`}>
      <div className={classes.item_container}>
        <Image
          src={`/image/diagnosis/${data.image}`}
          width={400}
          height={400}
          alt={data.unique_uuid}
        />
        <div className={classes.backdrop}></div>
        <div className={classes.paragraph}>{data.paragraph}</div>
        <div className={classes.description}>{data.heading}</div>
      </div>
    </Link>
  );
};

export default CategorieSliderItem;
