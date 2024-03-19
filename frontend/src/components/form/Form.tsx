"use client";
import React, { useState, useEffect } from "react";
import useFormDiagnosis from "@/hooks/useFormDiagnosis";
import classes from "@/styles/form/form.module.css";

type Props = {
  formData: any;
  name: string;
};

const Form: React.FC<Props> = ({ formData, name }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { FormDiagnosis } = useFormDiagnosis();
  const [useFormData, setUseFormData] = useState<any>(
    Object.keys(formData).reduce((acc: { [key: string]: any }, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const values = Object.values(useFormData).map((value: any) =>
        parseInt(value)
      );
      const response = await FormDiagnosis(name, values);
      console.log(response);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUseFormData({ ...useFormData, [name]: value });
  };

  return (
    <div className={classes.container}>
      <div className={classes.form_box}>
        <h1>Tell us about your diagnosis</h1>
        <form onSubmit={handleSubmit} className={classes.container_form}>
          {Object.entries(formData).map(([fieldName, fieldConfig]) => (
            <label key={fieldName}>
              {fieldName}:
              {formData[fieldName].type === "dropdown" ? (
                <select
                  name={fieldName}
                  value={useFormData[fieldName]}
                  onChange={handleChange}
                >
                  {formData[fieldName].option?.map(
                    (option: { value: string; show: string }) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={option.value === ""}
                      >
                        {option.show}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <input
                  type={formData[fieldName].type}
                  name={fieldName}
                  value={useFormData[fieldName]}
                  onChange={handleChange}
                  placeholder={`Enter the ${fieldName}`}
                  key={fieldName}
                />
              )}
            </label>
          ))}
          <button type="submit">
            {isLoading ? (
              <div className="spin-wrapper">
                <div className="spin"></div>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
