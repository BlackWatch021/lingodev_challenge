"use client";
import ChatSection from "@/app/components/ChatSection";
import SideNavBar from "@/app/components/SideNavBar";
import UserName from "@/app/components/UserName";
import { useChat } from "@/hooks/useChat";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

const Chat = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const [userName, setUserName] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [askUserName, setAskUserName] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [language, setLanguage] = useState("en");
  const [lastLanguge, setLastLanguage] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [allMessages, setAllMessages] = useState<
    { name: string; text: string; system?: string }[]
  >([]);

  const { socket, joinRoom, roomExists, roomStatus, sendMessage, expiresAt } =
    useChat();

  const sendMessageSocket = () => {
    if (!userMessage.trim()) return; // avoid empty messages
    setUserMessage("");
    sendMessage(roomId, userMessage);
    setAllMessages((prev) => [...prev, { name: userName, text: userMessage }]);
  };

  // language translation, initial translation
  useEffect(() => {
    if (!allMessages.length || language === lastLanguge) return;
    setIsTranslating(true);

    const translateChat = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/translation/bulk`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: allMessages,
              currentLanguage: lastLanguge,
              translateTo: language,
            }),
          },
        );
        const data = await response.json();
        console.log("TRANSLATION API RESPOSNE", data);
        setAllMessages(data.data);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsTranslating(false);
      }
    };
    translateChat();
  }, [language]);

  // Asking/setting user name
  useEffect(() => {
    const savedUser = localStorage.getItem("username");

    if (!savedUser) {
      setAskUserName(true);
    } else {
      setUserName(savedUser);
      setAskUserName(false);
    }
  }, []);

  // check room + join (when username ready)
  useEffect(() => {
    if (!socket || !userName) return;

    roomExists(roomId);
    joinRoom(roomId, userName);
  }, [socket, userName, roomId]);

  //Listen for messages (with cleanup)
  useEffect(() => {
    if (!socket) return;

    const handleReceive = (data: any) => {
      if (lastLanguge === language) {
        setAllMessages((prev) => [
          ...prev,
          { name: data.userName, text: data.message },
        ]);
        return;
      } else if (lastLanguge !== language) {
        const translateChat = async () => {
          setIsTranslating(true);
          try {
            console.log("new message", data.message);
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/translation/chunk`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  message: data.message,
                  currentLanguage: lastLanguge,
                  translateTo: language,
                }),
              },
            );
            const responseData = await response.json();
            console.log("SINGLE TRANSLATION API RESPOSNE", responseData);
            setAllMessages((prev) => [
              ...prev,
              { name: data.userName, text: responseData.data },
            ]);
          } catch (error) {
            console.error({ error });
          } finally {
            setIsTranslating(false);
          }
        };
        translateChat();
      }
    };

    socket.on("receive_message", handleReceive);

    // Socket user joined
    socket.on("user_joined", (data) => {
      setAllMessages((prev) => [
        ...prev,
        {
          name: data.userName,
          text: "",
          system: "user_joined",
        },
      ]);
      setUserCount(data.userCount);
    });
    // Socket user left
    socket.on("user_left", (data) => {
      setAllMessages((prev) => [
        ...prev,
        {
          name: data.userName,
          text: "",
          system: "user_left",
        },
      ]);
      setUserCount(data.userCount);
    });

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [socket, language, lastLanguge]);

  // Ask user name
  if (askUserName) {
    return (
      <UserName setUserName={setUserName} setAskUserName={setAskUserName} />
    );
  }

  // Loading state
  if (roomStatus === null) {
    return (
      <div className="w-full h-[80vh] flex flex-col gap-y-2 justify-center items-center">
        <LoaderCircle size={35} className="animate-spin" />
        <p className="font-terminal text-2xl">Initializing...</p>
      </div>
    );
  }

  // Room doesn't exist
  if (roomStatus === false) {
    return (
      <div className="w-full h-[80vh] flex flex-col gap-y-2 justify-center items-center">
        <p className="font-terminal text-2xl">Agent, room doen't exist</p>
        <Link
          href="/"
          className="underline underline-offset-4 text-textSecondary hover:text-terminalGreen transition-all duration-200"
        >
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-[93.5vh]">
      <SideNavBar
        userCount={userCount}
        expiresAt={expiresAt}
        language={language}
        setLanguage={setLanguage}
        setLastLanguage={setLastLanguage}
        isTranslating={isTranslating}
      />
      <ChatSection
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        allMessages={allMessages}
        userName={userName}
        sendMessageSocket={sendMessageSocket}
        isTranslating={isTranslating}
      />
    </div>
  );
};

export default Chat;
