"use client";
import React, { useEffect, useRef, useContext } from "react";
import ChatItem from "./ChatItem";
import classes from "@/styles/chat/CustomBotChat.module.css";
import LoadingComponent from "@/components/Loading";
import ChatBotContext from "@/contexts/ChatBot-context";

type Chat = {
  data: {
    role: string;
    parts: {
      text: string;
    }[];
  }[];
};

const CustomBotChat: React.FC<Chat> = ({ data }) => {
  const chatBotCtx = useContext(ChatBotContext);
  const chatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatsRef.current) {
      console.log(chatsRef.current.scrollHeight);
      chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <div className={classes["container"]}>
      <div className={classes["chats"]} ref={chatsRef}>
        {data.map((chat, index) => (
          <ChatItem key={index} message={chat.parts[0].text} user={chat.role} />
        ))}
        {chatBotCtx.isloading && (
          <>
            <LoadingComponent
              height="auto"
              size="11px"
              width="auto"
              alignItems="flex-start"
            />
            <div
              style={{
                paddingBottom: "2rem",
              }}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomBotChat;
