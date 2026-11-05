import { motion } from "framer-motion";
import ChatBox from "./ChatBox";
import ChatMessage from "./UserMessage";

export default function ChatContainer({ isSideBarOpen, messages }) {
    const hasMessages = messages.length > 0;

    return (
        <div className="absolute inset-0 flex justify-center pointer-events-none">
            <motion.div
                initial={false}
                animate={{ x: isSideBarOpen ? "calc(8.75vw)" : "0vw" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`
                    pointer-events-auto flex flex-col w-full max-w-3xl px-4 min-h-0 self-end
                    ${hasMessages ? "h-9/10 py-4" : "h-full justify-center"}
                `}
            >
                {hasMessages && (
                    <div className="w-full flex flex-col gap-y-4 mb-2 flex-1 min-h-0 overflow-y-auto">
                        {messages.map((message, key) => (
                            <ChatMessage key={key} message={message} />
                        ))}
                    </div>
                )}
                <div className={hasMessages ? "shrink-0" : ""}>
                    <ChatBox messages={messages} />
                </div>
            </motion.div>
        </div>
    );
}
