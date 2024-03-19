import React from "react";
import classes from "@/styles/chat/ChatItem.module.css";
import Markdown from "react-markdown";

type ChatItemProps = {
  message: string;
  user: string;
};

const ChatItem: React.FC<ChatItemProps> = ({ message, user }) => {
  return (
    <div className={classes["container"]}>
      <div className={`${classes["message-box"]} ${classes[user]}`}>
        <div className={classes["user-logo"]}>{user.substring(0, 2)}</div>
        <div className={classes["message"]}>
          <Markdown>{message}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
