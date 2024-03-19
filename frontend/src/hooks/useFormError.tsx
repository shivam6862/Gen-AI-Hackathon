import React, { useState } from "react";
import { useNotification } from "./useNotification";

type FormValues = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  confirmPassword: string;
};

type FormErrors = {
  [K in keyof FormValues]: string;
};

const useFormError = () => {
  const { NotificationHandler } = useNotification();
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    confirmPassword: "",
  });

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    confirmPassword: "",
  });

  const validators: {
    [K in keyof FormValues]: (value: string, password: string) => string;
  } = {
    name: (name: string) => (name ? "" : "Name is required"),
    email: (email: string) => {
      if (!email) return "Email is required";
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))
        return "Email is invalid";
      return "";
    },
    phone_number: (phone_number: string) =>
      phone_number ? "" : "Phone Number is required",
    password: (password: string) => {
      if (!password) return "Password is required";
      if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password))
        return "Password must be at least 8 characters long, contain a number, a special character and a capital letter";
      return "";
    },
    confirmPassword: (confirmPassword: string, password: string) => {
      if (!confirmPassword) return "Confirm Password is required";
      if (password !== confirmPassword) return "Password does not match";
      return "";
    },
  };

  const handleSetErrors = (id: keyof FormValues) => {
    const newErrors = { ...errors };
    newErrors[id] = validators[id](values[id], values.password);
    setErrors(newErrors);
  };

  const handleCheckSubmission = () => {
    const newErrors: FormErrors = { ...errors };
    Object.keys(values).forEach((key) => {
      const id = key as keyof FormValues;
      console.log(id);
      newErrors[id] = validators[id](values[id], values.password);
    });
    setErrors(newErrors);
    const isFormValid = Object.values(newErrors).every((value) => !value);
    if (!isFormValid) {
      NotificationHandler("Error", "Form is not valid", "Error");
    }
    return isFormValid;
  };

  return { errors, handleSetErrors, values, setValues, handleCheckSubmission };
};

export default useFormError;
