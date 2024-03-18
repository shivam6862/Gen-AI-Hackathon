"use client";
import React, { useEffect, useState } from "react";
import classes from "@/styles/page.module.css";
import CustomInputField from "@/components/CustomInputField";
import { useNotification } from "@/hooks/useNotification";
import Backdrop from "@/components/Backdrop";

export default function Home() {
  const { NotificationHandler } = useNotification();
  useEffect(() => {
    NotificationHandler(
      "Gen Ai mech hackthon",
      "Welcome to the hackthon",
      "Success"
    );
  }, []);

  const [message, setMessage] = useState<string>("");
  const [errror, setError] = useState<string>("");

  return (
    <div className={classes["container"]}>
      <div className={classes["box"]}>Home page for the app ...</div>
      <CustomInputField
        placeholder="Name"
        type="text"
        value={message}
        id="name"
        handleChanges={(e) => {
          setMessage(e.target.value);
        }}
        onBlur={() => {
          if (message.length < 3) {
            setError("Name should be more than 3 characters");
          } else {
            setError("");
          }
        }}
        error={errror}
        isInput={true}
      />
      <Backdrop zIndex={1} />
    </div>
  );
}
