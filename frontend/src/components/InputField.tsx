"use client";
import React from "react";
import classes from "@/styles/inputField.module.css";

type InputFieldProps = {
  placeholder: string;
  type: string;
  value: string;
  id: string;
  handleChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error: string;
};

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  type,
  value,
  id,
  handleChanges,
  onBlur,
  error,
}) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["box"]}>
        <input
          placeholder=" "
          type={type}
          value={value}
          id={id}
          onChange={(e) => handleChanges(e)}
          onBlur={onBlur}
          style={{
            borderColor: error ? "var(--light-warn-color)" : "",
          }}
        />
        <label>
          {error ? (
            <span className={classes["error"]}>{error}</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default InputField;
