"use client";
import React, { useState } from "react";
import classes from "@/styles/account/signin.module.css";
import InputField from "@/components/InputField";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Image from "next/image";
import useSignUpUser from "@/hooks/useSignInUser";
import useFormError from "@/hooks/useFormError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotification } from "@/hooks/useNotification";

const INDEX = Math.floor(Math.random() * 2) === 1;

const Signin: React.FC = () => {
  const router = useRouter();
  const { NotificationHandler } = useNotification();
  const { signInUser, loading } = useSignUpUser();
  const { errors, handleSetErrors, values, setValues } = useFormError();
  const [isTextPassword, setIsTextPassword] = useState(true);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const handleSignUp = async () => {
    const { confirmPassword, name, phone_number, ...rest } = values;
    if (!rest.email || !rest.password) {
      NotificationHandler("Error", "Please fill all fields", "Error");
      return;
    }
    const response = await signInUser(rest);
    if (response.status === 200) {
      router.push("/");
    }
    console.log(response);
  };

  const { email, password } = values;
  const { email: emailError, password: passwordError } = errors;

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.left}>
          <Image
            src={INDEX ? "/image/ai-diseases.jpg" : "/image/doctor.jpg"}
            alt="signup"
            width={800}
            height={600}
          />
        </div>
        <div className={classes.right}>
          <div className={classes.right_container}>
            <h1>Login to access your account</h1>
            <div className={classes.input_box}>
              <InputField
                placeholder="Email"
                type="email"
                value={email}
                id="email"
                handleChanges={handleChanges}
                onBlur={() => {
                  handleSetErrors("email");
                }}
                error={emailError}
              />
            </div>
            <div className={classes.input_box}>
              <InputField
                placeholder="Password"
                type={isTextPassword ? "password" : "text"}
                value={password}
                id="password"
                handleChanges={handleChanges}
                onBlur={() => {
                  handleSetErrors("password");
                }}
                error={passwordError}
              />
              <div className={classes.password}>
                <div
                  className={classes.openclosed}
                  onClick={() => {
                    setIsTextPassword((prev) => !prev);
                  }}
                >
                  {isTextPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.right_last}>
            <div className={classes.button} onClick={handleSignUp}>
              <div className={classes["spinner"]}>
                {loading && <div className="spin"></div>}
              </div>
              Sign In
            </div>
            <div className={classes["already-account"]}>
              Don’t have an account?
              <Link href="/account/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
