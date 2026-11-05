import { useState } from "react";
import SideBar from "./Components/SideBar";
import ChatContainer from "./Components/ChatContainer";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);

    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    const handleSend = (text) => {
        setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), sender: "user", content: text },
            { id: crypto.randomUUID(), sender: "bot", content: "Response" },
        ]);
    };

    const handleNewChat = () => {
        setMessages([])
    };

    return (
        <div className="w-screen min-h-screen bg-gray-300">
            <SideBar
                isOpen={isSideBarOpen}
                setIsOpen={setIsSideBarOpen}
                onNewChat={handleNewChat}
            />
            <ChatContainer
                isSideBarOpen={isSideBarOpen}
                messages={messages}
                onSend={handleSend}
            />
        </div>
    );
}
