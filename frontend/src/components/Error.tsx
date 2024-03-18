import React from "react";
import classes from "@/styles/error.module.css";

interface ErrorComponentProps {
  error: string;
  reload: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error, reload }) => {
  return (
    <div className={classes["container"]}>
      <h2>500 Server Error</h2>
      <button
        onClick={reload}
        style={{
          all: "unset",
          padding: "1rem 2rem",
          color: "var(--white-color)",
          fontSize: "1.5rem",
          border: "1px solid var(--white-color)",
          borderRadius: "0.5rem",
          backgroundColor: "var(--primary-color)",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorComponent;
