import classes from "@/styles/Modal.module.css";
import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}
const Modal = ({ children, onClose }: ModalProps) => {
  const closeHandler = (e: React.MouseEvent) => {
    if ("id" in e.target)
      if (e.target.id == "modal") {
        onClose();
      }
  };
  return (
    <div className={classes.backdrop} id="modal" onClick={closeHandler}>
      <div className={classes.modal}>{children}</div>
    </div>
  );
};
export default Modal;
