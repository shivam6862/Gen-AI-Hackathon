import React from "react";
import classes from "@/styles/chat/GiveChatname.module.css";
import CustomInputField from "./CustomInputField";
import { RxCross1 } from "react-icons/rx";
import ChatBotContext from "@/contexts/ChatBot-context";
import { useContext } from "react";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import useCreateNewchat from "@/hooks/useCreateNewchat";

type Chat = {
  name: string;
};

type GiveChatnameProps = {
  chat: Chat;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSetErrors: (id: string) => void;
  chatsError: Chat;
  setIsvisibleUserChat: (value: boolean) => void;
};

const GiveChatname: React.FC<GiveChatnameProps> = ({
  chat,
  handleChange,
  handleSetErrors,
  chatsError,
  setIsvisibleUserChat,
}) => {
  const ctx = useContext(ChatBotContext);
  const router = useRouter();
  const { CreateNewchat } = useCreateNewchat();
  const [isDisabled, setIsDisabled] = React.useState(false);

  const makeNewChat = async () => {
    setIsDisabled(true);
    const chatId = v4();
    const name = chatId + "_" + chat.name;
    const response = (await CreateNewchat(name)) as any;
    if (response?.type === "Success") {
      setIsvisibleUserChat(false);
      ctx.setSidebarData(response?.chatName);
      router.push(`/chat/${name}`);
    } else {
      setIsDisabled(false);
    }
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>
        <h1>Chat Name</h1>
        <span onClick={() => setIsvisibleUserChat(false)}>
          <RxCross1 />
        </span>
      </div>
      <CustomInputField
        placeholder="Enter Chat Name"
        type="text"
        value={chat.name}
        id="chat-name"
        handleChanges={handleChange}
        onBlur={() => handleSetErrors("name")}
        error={chatsError.name}
        isInput={true}
      />
      <button
        onClick={() => {
          makeNewChat();
        }}
        disabled={isDisabled || chatsError.name !== "" || chat.name === ""}
      >
        <span>Start Chat</span>
      </button>
    </div>
  );
};

export default GiveChatname;
