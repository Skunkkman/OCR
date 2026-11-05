import { useState } from "react";
import ChatBox from "./Components/ChatBox";
import SideBar from "./Components/SideBar";

export default function ChatPage() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    return (
        <div className="w-screen h-screen bg-gray-300 overflow-hidden">
            <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
            <ChatBox isSideBarOpen={isSideBarOpen} />
        </div>
    );
}
