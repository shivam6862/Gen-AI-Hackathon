import React from "react";
import classes from "@/styles/loading.module.css";

type LoadingProps = {
  height?: string;
  size?: string;
  width?: string;
  alignItems?: string;
};

const LoadingComponent: React.FC<LoadingProps> = ({
  height,
  size,
  width,
  alignItems,
}) => {
  return (
    <div
      className={classes["container"]}
      style={{
        height: height ? height : "98vh",
        width: width ? width : "100%",
        alignItems: alignItems ? alignItems : "center",
      }}
    >
      <div
        className={classes["item-container"]}
        style={{
          width: width ? width : "150px",
        }}
      >
        <div
          className={`${classes["item-1"]} ${classes["item"]}`}
          style={{
            width: size ? size : "25px",
            height: size ? size : "25px",
          }}
        ></div>
        <div
          className={`${classes["item-2"]} ${classes["item"]}`}
          style={{
            width: size ? size : "25px",
            height: size ? size : "25px",
          }}
        ></div>
        <div
          className={`${classes["item-3"]} ${classes["item"]}`}
          style={{
            width: size ? size : "25px",
            height: size ? size : "25px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
