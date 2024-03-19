import classes from "@/styles/diagnosis.module.css";
import DiagnosisCategories from "@/components/diagnosis/DiagnosisCategories";

const Page = () => {
  return (
    <div className={classes["container"]}>
      <DiagnosisCategories />
    </div>
  );
};

export default Page;
