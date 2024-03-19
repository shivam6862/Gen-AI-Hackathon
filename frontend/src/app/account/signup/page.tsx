"use client";
import React, { useState } from "react";
import classes from "@/styles/account/signup.module.css";
import InputField from "@/components/InputField";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Image from "next/image";
import useSignUpUser from "@/hooks/useSignUpUser";
import useFormError from "@/hooks/useFormError";
import Link from "next/link";

const INDEX = Math.floor(Math.random() * 2) === 1;

const Signup: React.FC = () => {
  const { signUpUser, loading } = useSignUpUser();
  const { errors, handleSetErrors, values, setValues, handleCheckSubmission } =
    useFormError();
  const [isTextPassword, setIsTextPassword] = useState(true);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const handleSignUp = async () => {
    const isFormValid = handleCheckSubmission();

    if (!isFormValid) return;
    const { confirmPassword, ...rest } = values;
    const response = await signUpUser(rest);

    console.log(response);
  };

  const { name, email, password, phone_number, confirmPassword } = values;
  const {
    name: nameError,
    email: emailError,
    password: passwordError,
    phone_number: phone_numberError,
    confirmPassword: confirmPasswordError,
  } = errors;

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
            <h1>Create Your Free Account</h1>
            <div className={classes.input_box}>
              <InputField
                placeholder="Full Name"
                type="text"
                value={name}
                id="name"
                handleChanges={handleChanges}
                onBlur={() => {
                  handleSetErrors("name");
                }}
                error={nameError}
              />
            </div>
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
                placeholder="Phone Number"
                type="number"
                value={phone_number}
                id="phone_number"
                handleChanges={handleChanges}
                onBlur={() => {
                  handleSetErrors("phone_number");
                }}
                error={phone_numberError}
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
            <div className={classes.input_box}>
              <InputField
                placeholder="Confirm Password"
                type={isTextPassword ? "password" : "text"}
                value={confirmPassword}
                id="confirmPassword"
                handleChanges={handleChanges}
                onBlur={() => {
                  handleSetErrors("confirmPassword");
                }}
                error={confirmPasswordError}
              />
            </div>
          </div>
          <div className={classes.right_last}>
            <div className={classes.privacy_policy}>
              By creating an account, I accept the
              <span> Terms</span> & Conditions & <span>Privacy Policy</span>
            </div>
            <div className={classes.button} onClick={handleSignUp}>
              <div className={classes["spinner"]}>
                {loading && <div className="spin"></div>}
              </div>
              Create Accounts
            </div>
            <div className={classes["already-account"]}>
              Already have an account?
              <Link href="/account/signin">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
