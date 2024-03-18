"use client";
import React, { useState, FC, ReactComponentElement } from "react";
import { v4 } from "uuid";
import { ReactElement } from "react";

type MessageType = {
  title: string;
  message: string;
  id: string;
  type: string;
  logo: ReactElement;
};

type NotificationContextType = {
  typeMessage: MessageType[];
  onMessage: (
    title: string,
    message: string,
    type: string,
    logo: ReactElement
  ) => void;
  onDelete: (id: string) => void;
};

const NotificationContext = React.createContext<NotificationContextType>({
  typeMessage: [],
  onMessage: () => {},
  onDelete: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const NotificationContextProvider: React.FC<Props> = (props) => {
  const [typeMessage, setTypeMessage] = useState<MessageType[]>([]);

  const messageHandler = (
    title: string,
    message: string,
    type: string,
    logo: ReactElement
  ) => {
    setTypeMessage((prev) => [
      ...prev,
      { title, message, id: v4(), type, logo },
    ]);
  };

  const onDeleteHandler = (id: string) => {
    setTypeMessage((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        typeMessage,
        onMessage: messageHandler,
        onDelete: onDeleteHandler,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
