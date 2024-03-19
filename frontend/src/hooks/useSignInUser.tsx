"use client";
import { useState } from "react";
import { useNotification } from "./useNotification";
import useLocalStorage from "./useLocalStorage";
const useSignInUser = () => {
  const [storedValue, setValue] = useLocalStorage("user", {
    name: "",
    phone_number: "",
    email: "",
    login_token: "",
    id: "",
  });

  const { NotificationHandler } = useNotification();
  const [loading, setLoading] = useState(false);

  const signInUser = async (data: Record<string, string>) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genaimech/signin/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      if (responsedata.status === 200) {
        setValue({
          name: responsedata.name,
          phone_number: responsedata.phone_number,
          email: responsedata.email,
          login_token: responsedata.login_token,
          id: responsedata.id,
        });
        NotificationHandler("Success", responsedata.message, "Success");
      } else {
        NotificationHandler("Error", responsedata.message, "Error");
      }
      setLoading(false);
      return responsedata;
    } catch (err) {
      setLoading(false);
      console.log(err);
      NotificationHandler("Error", "Something went wrong", "Error");
      return {
        status: 400,
        message: "Something went wrong",
      };
    }
  };
  return { signInUser, loading };
};

export default useSignInUser;
