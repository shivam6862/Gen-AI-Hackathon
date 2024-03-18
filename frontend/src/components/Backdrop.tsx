import React from "react";
import classes from "@/styles/backdrop.module.css";

type BackdropProps = {
  zIndex: number;
  onClick?: () => void;
};
const Backdrop: React.FC<BackdropProps> = ({ zIndex, onClick }) => {
  return (
    <div
      className={classes.backdrop}
      style={{
        zIndex: zIndex,
      }}
      onClick={onClick}
    ></div>
  );
};

export default Backdrop;
