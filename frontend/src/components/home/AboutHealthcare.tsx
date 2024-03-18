import React from "react";
import classes from "@/styles/home/aboutHealthcare.module.css";
import AboutHealthcareItem from "./AboutHealthcareItem";

const data = [
  {
    a_tag: "/chat/doctor",
    image: "/image/doctor.jpg",
    heading: "Ethical AI Chat Application for Healthcare Recommendations",
    about:
      "Our chat application utilizes ethical AI algorithms to provide personalized healthcare recommendations to users. It respects user privacy and ensures that recommendations are good-faith suggestions based on user input and ethical guidelines.",
    three_key_points: [
      "Personalized healthcare recommendations based on user input",
      "Ethical AI algorithms prioritize user privacy and data security",
      "Transparent decision-making process ensures trustworthiness of recommendations",
    ],
    short_motivation:
      "Empower users with personalized healthcare recommendations while maintaining utmost respect for privacy and ethical principles.",
  },
  {
    a_tag: "/diagnosis",
    image: "/image/diseases.jpg",
    heading: "Ethical AI Diagnosis Form for Healthcare Conditions",
    about:
      "Our diagnosis form employs ethical AI techniques to assist in the diagnosis of healthcare conditions. Users can fill out a form providing relevant symptoms and information, and our system will provide potential diagnoses based on ethical guidelines and medical best practices.",
    three_key_points: [
      "Assists in diagnosing healthcare conditions based on user-provided information",
      "Adheres to ethical guidelines and medical best practices",
      "Encourages users to seek professional medical advice for accurate diagnosis and treatment",
    ],
    short_motivation:
      "Provide users with preliminary healthcare condition diagnoses based on user input, while emphasizing the importance of seeking professional medical advice for accurate diagnosis and treatment.",
  },
];

const AboutHealthcare = () => {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.top}>
          <h1>Ethical AI in the Healthcare Industry</h1>
          <p>
            Our healthcare services are designed to provide personalized
            recommendations and preliminary diagnoses based on user input, while
            maintaining the utmost respect for privacy and ethical principles.
          </p>
        </div>
        <div className={classes.servicesItems}>
          {data.map((item, index) => (
            <AboutHealthcareItem item={item} key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutHealthcare;
