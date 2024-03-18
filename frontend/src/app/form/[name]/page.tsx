"use client";
import React, { useEffect, useState } from "react";
import classes from "@/styles/formpage.module.css";

type Props = {
  params: {
    name: string;
  };
};

const Page: React.FC<Props> = ({ params: { name } }) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["box"]}>Form page for the app {name}...</div>
    </div>
  );
};

export default Page;
