import classes from "@/styles/PositiveResult.module.css";
const PositiveResult = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["message-box model"]}>
        <p>Congratulations! 🎉🎉</p>
        <p style={{ marginTop: "1rem" }}>You are healthy.</p>
      </div>
    </div>
  );
};

export default PositiveResult;
