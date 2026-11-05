import { motion, AnimatePresence } from "framer-motion";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";

export default function ChatContainer({ isSideBarOpen, messages, onSend, chatName = "Test_Chat" }) {
    const hasMessages = messages.length > 0;

    return (
        <div className="absolute inset-0 flex justify-center pointer-events-none">
            <motion.div
                initial={false}
                animate={{ x: isSideBarOpen ? "calc(8.75vw)" : "0vw" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="pointer-events-auto flex flex-col w-full max-w-3xl px-4 min-h-0 h-full py-4"
            >
                <AnimatePresence initial={false}>
                    {hasMessages && (
                        <motion.header
                            key="chat-header"
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="shrink-0 mb-3 flex items-center justify-center"
                        >
                            <h1
                                className="max-w-full truncate text-sm font-semibold text-gray-600 tracking-wide"
                                title={chatName}
                            >
                                {chatName}
                            </h1>
                        </motion.header>
                    )}
                </AnimatePresence>

                <div className="w-full flex flex-col gap-y-4 mb-2 flex-1 min-h-0 overflow-y-auto mt-16">
                    <AnimatePresence initial={false}>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className={`${message.sender == "user" ? "self-end" : "self-start"}`}
                            >
                                <ChatMessage message={message} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={false}
                    animate={{ y: hasMessages ? 0 : "-35vh" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0"
                >
                    <ChatBox onSend={onSend} />
                </motion.div>
            </motion.div>
        </div>
    );
}
