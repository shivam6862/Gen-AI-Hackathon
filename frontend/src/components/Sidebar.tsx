"use client";
import classes from "@/styles/sidebar.module.css";
import ChatBotContext from "@/contexts/ChatBot-context";
import { useEffect, useContext } from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import useGetallchats from "@/hooks/useGetallchats";

const SideBar: React.FC = () => {
  const chatBotCtx = useContext(ChatBotContext);
  const sidebarData = chatBotCtx.sidebarData;
  const isSidebarOpen = chatBotCtx.isSidebarOpen;

  const { Getallchats } = useGetallchats();

  const handleToggleSiderbar = () => {
    chatBotCtx.toggleSidebar(!isSidebarOpen);
  };

  useEffect(() => {
    const fun = async () => {
      const response = await Getallchats();
      console.log(response);
      chatBotCtx.setSidebarArray(response);
    };
    if (typeof window !== "undefined") {
      fun();
    }
  }, []);

  return (
    <div
      className={`${classes["container"]} ${
        isSidebarOpen ? classes["slide-in"] : classes["slide-out"]
      }`}
      style={{
        width: isSidebarOpen ? "250px" : "0px",
      }}
    >
      <div
        className={`${classes["box"]}`}
        style={{
          display: isSidebarOpen ? "block" : "none",
        }}
      >
        <div className={`${classes["new-chat"]}`}>
          <Link href="/chat/new">New Chat</Link>
        </div>
        {sidebarData?.map((item) => (
          <Link
            className={classes["item"]}
            href={`/chat/${item.id}`}
            key={item.id}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className={classes["toggle-sidebar"]} onClick={handleToggleSiderbar}>
        <FaChevronRight />
      </div>
    </div>
  );
};

export default SideBar;
