"use client";
import { useState } from "react";
import { useNotification } from "./useNotification";

const useSignUpUser = () => {
  const { NotificationHandler } = useNotification();
  const [loading, setLoading] = useState(false);

  const signUpUser = async (data: Record<string, string>) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genaimech/signup/`,
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
      setLoading(false);
      if (responsedata.status === 200) {
        NotificationHandler("Success", responsedata.message, "Success");
      } else {
        NotificationHandler("Error", responsedata.message, "Error");
      }
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
  return { signUpUser, loading };
};

export default useSignUpUser;
