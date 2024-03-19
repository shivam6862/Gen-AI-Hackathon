"use client";
import React, { useEffect, useState } from "react";
import classes from "@/styles/formpage.module.css";
import Form from "@/components/form/Form";
import dummyData from "./data.json";

type Props = {
  params: {
    name: string;
  };
};

const Page: React.FC<Props> = ({ params: { name } }) => {
  const foundItem: any = dummyData.find((item) => {
    return item.hasOwnProperty(name);
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.top_description}>
          <div className={classes.description_box}>
            <h1>Tell us about your diagnosis ,{name}</h1>
            <p>
              Please fill out the form below to tell us about your diagnosis.
            </p>
          </div>
        </div>
        <div className={classes.middle_background}></div>
        <div className={classes.bottom_form}>
          <div className={classes.box_form}>
            <Form formData={foundItem ? foundItem[name] : {}} name={name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
