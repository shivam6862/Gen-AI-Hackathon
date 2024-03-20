"use client";
import { DiagnosisResultType } from "@/hooks/useFormDiagnosis";
import Modal from "./Modal";
import classes from "@/styles/DiagnosisResult.module.css";
import PositiveResult from "./PositiveResult";
import NegativeResult from "./NegativeResult";
import { useState } from "react";

interface DiagnosisResultProps {
  result: DiagnosisResultType;
  onClose: () => void;
  useFormData: any;
  setUseFormData: React.Dispatch<any>;
}

const DiagnosisResult = ({
  result,
  onClose,
  useFormData,
  setUseFormData,
}: DiagnosisResultProps) => {
  const diagnosisResult = result.response[0] > 0.5 ? false : true;

  return (
    <Modal onClose={onClose}>
      <div className={classes["modal-container"]}>
        <div className={classes["modal-header"]}>
          <h1>Result</h1>
          <button onClick={onClose} className={classes["close-btn"]}>
            X
          </button>
        </div>
        {diagnosisResult ? (
          <div className={classes["result-container"]}>
            <NegativeResult
              useFormData={useFormData}
              setUseFormData={setUseFormData}
            />
          </div>
        ) : (
          <div className={classes["result-container"]}>
            <PositiveResult />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DiagnosisResult;
