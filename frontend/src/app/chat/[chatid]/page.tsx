"use client";
import React, { useEffect, useState } from "react";
import classes from "@/styles/chatIdpage.module.css";

type Props = {
  params: {
    chatid: string;
  };
};

const Page: React.FC<Props> = ({ params: { chatid } }) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["box"]}>Chat page for the app {chatid}...</div>
    </div>
  );
};

export default Page;
