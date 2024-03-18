import React from "react";
import classes from "@/styles/diagnosis/diagnosisCategories.module.css";
import CategorieSlider from "./Categories";

const dataToshow = {
  heading: "Empowering Healthcare with Ethical AI",
  short_about:
    "Our Ethical AI in Healthcare initiative aims to revolutionize the medical industry by leveraging cutting-edge artificial intelligence technologies while upholding the highest ethical standards. We believe that AI has the potential to enhance patient care, improve treatment outcomes, and streamline healthcare processes. However, we recognize the importance of ensuring that AI systems are developed and deployed ethically, with transparency, fairness, and accountability at the forefront.",
  short_motivation:
    "The motivation behind our Ethical AI in Healthcare initiative is to harness the power of artificial intelligence to address the complex challenges facing the healthcare industry while safeguarding patient privacy, autonomy, and well-being. By embracing ethical principles and collaborating with healthcare professionals, policymakers, and technology experts, we strive to build AI solutions that are trusted, responsible, and beneficial for all.",
};

const DiagnosisCategories = () => {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.heading}>{dataToshow.heading}</div>
        <div className={classes.short_motivation}>
          {dataToshow.short_motivation}
        </div>
      </div>
      <div className={classes.slider}>
        <CategorieSlider />
      </div>
    </div>
  );
};

export default DiagnosisCategories;
