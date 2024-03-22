import { useNotification } from "./useNotification";

const useGetchatById = () => {
  const { NotificationHandler } = useNotification();
  const GetchatById = async (chatId: string) => {
    console.log(chatId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genaimech/getchat/${chatId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      if (responsedata.type === "Error") {
        NotificationHandler(
          "GenAiMech HealthCare",
          responsedata.message,
          "Error"
        );
        return [];
      }
      return responsedata.response;
    } catch (err) {
      console.log(err);
      NotificationHandler(
        "GenAiMech HealthCare",
        "Something went wrong",
        "Error"
      );
      return [];
    }
  };
  return { GetchatById };
};

export default useGetchatById;
