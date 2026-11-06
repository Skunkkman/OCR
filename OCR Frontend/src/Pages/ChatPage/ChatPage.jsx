import { useState } from "react";
import SideBar from "./Components/SideBar";
import ChatContainer from "./Components/ChatContainer";

export default function ChatPage() {
    const DEFAULT_CHAT = {
        title: "Test Chat",
        messages: [
            { id: crypto.randomUUID(), sender: "user", content: "Test Message" },
            { id: crypto.randomUUID(), sender: "bot", content: "Test Response" }
        ],
    }
    const [title, setTitle] = useState();
    const [messages, setMessages] = useState([]);

    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    const handleLoadChat = () => {
        setTitle(DEFAULT_CHAT.title);
        setMessages(DEFAULT_CHAT.messages);
    }

    const handleSend = (text) => {
        setTitle("Test Chat");
        setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), sender: "user", content: text },
            { id: crypto.randomUUID(), sender: "bot", content: "Response" },
        ]);
    };

    const handleNewChat = () => {
        setMessages([]);
    };

    return (
        <div className="w-screen min-h-screen bg-gray-300">
            <SideBar
                isOpen={isSideBarOpen}
                setIsOpen={setIsSideBarOpen}
                onNewChat={handleNewChat}
                onLoadChat={handleLoadChat}
            />
            <ChatContainer
                isSideBarOpen={isSideBarOpen}
                chatTitle={title}
                messages={messages}
                onSend={handleSend}
            />
        </div>
    );
}
