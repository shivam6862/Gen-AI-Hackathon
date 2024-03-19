"use client";
import { useContext } from "react";
import ChatBotContext from "@/contexts/ChatBot-context";
import { useNotification } from "./useNotification";

const useUpdatechatById = () => {
  const chatBotCtx = useContext(ChatBotContext);
  const { NotificationHandler } = useNotification();
  const UpdatechatById = async (
    chatId: string,
    message: string,
    files: any
  ) => {
    console.log(chatId, message, files);
    // convert message to json format
    const messageJson = JSON.stringify({ message: message });
    console.log(messageJson);
    try {
      chatBotCtx.setIsLoading(true);
      const formData = new FormData();
      if (files) {
        files.forEach((pdf: any) => {
          formData.append("upload_files", pdf);
        });
      }
      formData.append("message", message);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genaimech/chat/${chatId}/`,
        {
          method: "POST",
          body: formData,
        }
      );
      const responsedata = await response.json();
      console.log("responsedata", responsedata);
      chatBotCtx.setIsLoading(false);
      if (responsedata.type === "Error") {
        NotificationHandler("Custom ChatBot", responsedata.message, "Error");
        return "";
      }
      return responsedata.response;
    } catch (err) {
      console.log(err);
      chatBotCtx.setIsLoading(false);
      NotificationHandler("Custom ChatBot", "Something went wrong", "Error");
      return "";
    }
  };
  return { UpdatechatById };
};

export default useUpdatechatById;
