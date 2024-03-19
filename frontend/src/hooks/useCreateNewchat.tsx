import { useNotification } from "./useNotification";

const useCreateNewchat = () => {
  const { NotificationHandler } = useNotification();
  const CreateNewchat = async (chatName: string) => {
    console.log(chatName);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genaimech/newchat`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chatName }),
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      if (responsedata.type === "Error") {
        NotificationHandler("Custom ChatBot", responsedata.message, "Error");
        return "Error";
      }
      return {
        type: "Success",
        chatName: responsedata.response.chatName,
      };
    } catch (err) {
      console.log(err);
      NotificationHandler("Custom ChatBot", "Something went wrong", "Error");
      return {
        type: "Error",
        chatName: "Something went wrong",
      };
    }
  };
  return { CreateNewchat };
};

export default useCreateNewchat;
