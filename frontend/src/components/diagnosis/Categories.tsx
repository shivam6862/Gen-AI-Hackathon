import React from "react";
import classes from "@/styles/diagnosis/categories.module.css";
import CategorieSliderItem from "./CategoriesItem";

const CategorieData = [
  {
    a_tag: "diabetes",
    heading: "Diabetes Awareness",
    paragraph:
      "Diabetes is a chronic condition that affects millions of people worldwide.",
    unique_uuid: "5f3a6b2c-1d9f-4cbf-9d4a-6c7b8a1d9f2c",
    image: "diabetes.jpg",
  },
  {
    a_tag: "asthma",
    heading: "Asthma Management",
    paragraph:
      "Asthma is a respiratory condition characterized by inflammation of the airways, leading to episodes of wheezing, coughing, chest tightness, and shortness of breath. ",
    unique_uuid: "6a2dfe32-6f8a-4c67-87d9-af345d8c6b1f",
    image: "asthma.jpg",
  },
  {
    a_tag: "stroke",
    heading: "Stroke Prevention",
    paragraph:
      "Stroke is a medical emergency that occurs when blood flow to the brain is interrupted, depriving brain cells of oxygen and nutrients. ",
    unique_uuid: "f8ebf4f2-84e5-4f7c-bae4-38a5cfe56d4d",
    image: "stroke.jpg",
  },
  {
    a_tag: "cancer",
    heading: "Cancer Awareness",
    paragraph:
      "Cancer is a complex group of diseases characterized by the uncontrolled growth and spread of abnormal cells. ",
    unique_uuid: "a8bcdf91-4a94-496b-9f21-d75bca74c06a",
    image: "cancer.jpg",
  },
];

const CategorieSlider = () => {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {CategorieData.map((item, index) => (
          <div className={`${classes.items_container}`} key={index}>
            <CategorieSliderItem data={item} key={item.unique_uuid} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorieSlider;
