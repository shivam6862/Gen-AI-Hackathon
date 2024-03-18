"use client";
import React from "react";
import classes from "@/styles/customInputField.module.css";

type CustomInputFieldProps = {
  placeholder: string;
  type: string;
  value: string | number;
  id: string;
  handleChanges: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onBlur: () => void;
  error: string;
  isInput: boolean;
};

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  placeholder,
  type,
  value,
  id,
  handleChanges,
  onBlur,
  error,
  isInput,
}) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["box"]}>
        {isInput ? (
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
        ) : (
          <textarea
            placeholder=" "
            value={value}
            id={id}
            onChange={(e) => handleChanges(e)}
            onBlur={onBlur}
            style={{
              borderColor: error ? "var(--light-warn-color)" : "",
            }}
          ></textarea>
        )}
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

export default CustomInputField;
