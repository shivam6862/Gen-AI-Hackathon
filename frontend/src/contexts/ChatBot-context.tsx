"use client";
import React, { createContext, useState } from "react";

type SidebarItem = {
  title: string;
  id: string;
};

type ChatBotContextType = {
  isSidebarOpen: boolean;
  toggleSidebar: (value: boolean) => void;
  sidebarData: SidebarItem[];
  setSidebarData: (value: string) => void;
  setSidebarArray: (value: string[]) => void;
  isloading: boolean;
  setIsLoading: (value: boolean) => void;
};

const initialSidebarData: SidebarItem[] = [];

const ChatBotContext = createContext<ChatBotContextType>({
  isSidebarOpen: false,
  toggleSidebar: () => {},
  sidebarData: initialSidebarData,
  setSidebarData: () => {},
  setSidebarArray: () => {},
  isloading: false,
  setIsLoading: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ChatBotContextProvider: React.FC<Props> = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [sidebarData, setSidebarData] =
    useState<SidebarItem[]>(initialSidebarData);

  const onSetIsSidebarOpen = (value: boolean) => {
    setIsSidebarOpen(value);
  };

  const onSetSidebarData = (value: string) => {
    const [id, title] = value.split("_");
    const newSidebarData = sidebarData.concat({ title, id });
    setSidebarData(newSidebarData);
  };

  const onsetSidebarArray = (value: string[]) => {
    const newArray = value.map((item) => {
      const title = item?.split("_")[1];
      return {
        title,
        id: item,
      };
    });
    setSidebarData(newArray);
  };

  const onSetIsLoading = (value: boolean) => {
    setIsLoading(value);
  };

  return (
    <ChatBotContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar: onSetIsSidebarOpen,
        sidebarData,
        setSidebarData: onSetSidebarData,
        setSidebarArray: onsetSidebarArray,
        isloading,
        setIsLoading: onSetIsLoading,
      }}
    >
      {props.children}
    </ChatBotContext.Provider>
  );
};

export default ChatBotContext;
