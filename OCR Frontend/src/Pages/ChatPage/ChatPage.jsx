import { useState } from "react";
import SideBar from "./Components/SideBar";
import ChatContainer from "./Components/ChatContainer";

export default function ChatPage() {
    let messsages = [
        { "sender": "user", "content": "Test" },
        { "sender": "bot", "content": "Test_Response Test_Response Test_Response Test_Response Test_Response Test_Response Test_Response" },
    ]

    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    return (
        <div className="w-screen min-h-screen bg-gray-300">
            <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
            <ChatContainer isSideBarOpen={isSideBarOpen} messages={messsages}></ChatContainer>
        </div >
    );
}
