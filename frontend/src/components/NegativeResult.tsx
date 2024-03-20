import Markdown from "react-markdown";
import { useState, useContext } from "react";
import classes from "@/styles/NegativeResult.module.css";
import { useRouter, useParams, usePathname } from "next/navigation";
import ChatBotContext from "@/contexts/ChatBot-context";
import useCreateNewchat from "@/hooks/useCreateNewchat";
import LoadingComponent from "./Loading";

type messageType = {
  symptoms: string;
  treatments: string;
  causes: string;
  source: string[];
};
const NegativeResult = ({
  useFormData,
  setUseFormData,
}: {
  useFormData: any;
  setUseFormData: React.Dispatch<any>;
}) => {
  const [message, setMessage] = useState<messageType>({
    symptoms: "",
    treatments: "",
    causes: "",
    source: [],
  });
  const [showPrescription, setShowPrescription] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { name: disease } = useParams();
  const chatCtx = useContext(ChatBotContext);
  const { CreateNewchat } = useCreateNewchat();
  const getPrescription = async () => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    setIsLoading(true);
    try {
      console.log(disease);
      const response = await fetch(
        `${backend_url}/api/genaimech/getprescription/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            diseases: disease,
          }),
        }
      );
      const data = await response.json();
      setMessage(data);
      setShowPrescription(!showPrescription);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  const openChat = async () => {
    const chatId = crypto.randomUUID();

    const name = chatId + "_" + disease;
    const response = (await CreateNewchat(name)) as any;
    if (response?.type === "Success") {
      chatCtx.setSidebarData(response?.chatName);
      router.push(`/chat/${name}`);
    }
  };
  return (
    <div className="container">
      <div className={classes["message-box model"]}>
        <p>We pray for your health.</p>
      </div>

      {showPrescription ? (
        <button
          onClick={() => {
            setShowPrescription(false);
          }}
          className={classes["prescription-btn"]}
        >
          Hide Prescription
        </button>
      ) : isLoading ? (
        <LoadingComponent height="50px" />
      ) : (
        <button
          onClick={getPrescription}
          className={classes["prescription-btn"]}
        >
          Get Prescription
        </button>
      )}

      <div>
        {showPrescription && !isLoading && (
          <>
            <div className={classes["prescription"]}>
              <div>
                <h2>Symptoms</h2>
                <Markdown>{message.symptoms}</Markdown>
              </div>
              <div>
                <h2>Treatments</h2>
                <Markdown>{message.treatments}</Markdown>
              </div>
              <div>
                <h2>Causes</h2>
                <Markdown>{message.causes}</Markdown>
              </div>
              <div>
                <h2>Source</h2>
                {message.source.map((source, index) => (
                  <a
                    key={index}
                    href={source}
                    className={classes["source-link"]}
                  >
                    {source}
                  </a>
                ))}
              </div>
            </div>
            <button onClick={openChat} className={classes["chat-btn"]}>
              Chat With Ai doctor
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NegativeResult;
