import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { NotificationContextProvider } from "@/contexts/Notification-context";
import Notifications from "@/components/notification/Notifications";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChatBotContextProvider } from "@/contexts/ChatBot-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GenAi Mech hackathon",
  description: "GenAi Mech hackathon 2024",
  icons: "robot.jpg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationContextProvider>
          <ChatBotContextProvider>
            <Notifications />
            <Header />
            {children}
            <Footer />
          </ChatBotContextProvider>
        </NotificationContextProvider>
      </body>
    </html>
  );
}
