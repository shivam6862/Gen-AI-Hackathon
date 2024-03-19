"use client";
import React from "react";
import ErrorComponent from "@/components/Error";

const Error: React.FC = () => {
  return (
    <ErrorComponent
      error="Error..."
      reload={() => {
        window.location.reload();
      }}
    />
  );
};

export default Error;
