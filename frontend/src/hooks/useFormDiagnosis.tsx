import { useNotification } from "./useNotification";

export type DiagnosisResultType = {
  type: "Success" | "Error";
  response: number[];
};
const useFormDiagnosis = () => {
  const { NotificationHandler } = useNotification();
  const FormDiagnosis = async (diagnosis: string, data: any) => {
    console.log(diagnosis);
    console.log(data);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genaimech/form/${diagnosis}/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      if (responsedata.type === "Error") {
        NotificationHandler("Form Diagnosis", responsedata.message, "Error");
        return "Error";
      }
      return {
        type: "Success",
        response: responsedata.response[0],
      };
    } catch (err) {
      console.log(err);
      NotificationHandler("Form Diagnosis", "Something went wrong", "Error");
      return {
        type: "Error",
      };
    }
  };
  return { FormDiagnosis };
};

export default useFormDiagnosis;
