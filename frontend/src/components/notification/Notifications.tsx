"use client";
import React, { useContext } from "react";
import classes from "@/styles/notification/notifications.module.css";
import Notification from "./Notification";
import NotificationContext from "@/contexts/Notification-context";

const Notifications = () => {
  const notificationsCtx = useContext(NotificationContext);
  return (
    <div className={`${classes.container}`}>
      {notificationsCtx.typeMessage.map((message) => (
        <Notification {...message} key={message.id} />
      ))}
    </div>
  );
};

export default Notifications;
