import { useNotification } from "./useNotification";

const useGetallchats = () => {
  const { NotificationHandler } = useNotification();
  const Getallchats = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genaimech/getallchats`,
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
        NotificationHandler("Custom ChatBot", responsedata.message, "Error");
        return [];
      }
      return responsedata.response;
    } catch (err) {
      console.log(err);
      NotificationHandler("Custom ChatBot", "Something went wrong", "Error");
      return [];
    }
  };
  return { Getallchats };
};

export default useGetallchats;
