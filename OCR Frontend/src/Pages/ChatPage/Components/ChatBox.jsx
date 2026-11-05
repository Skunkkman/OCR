import { useState } from "react";
import { FaPaperclip, FaArrowRight, FaChevronDown } from "react-icons/fa";
import Dropdown from "../../../Components/Buttons/Dropdown";
import { useTranslation } from "react-i18next";

export default function ChatBox({ onSend }) {
    const { t } = useTranslation();

    const MODELS = [{ label: "Select Model", onClick: () => { } }];
    const [selectedModel, setSelectedModel] = useState(MODELS[0]);
    const [input, setInput] = useState("");

    const modelItems = MODELS.map((m) => ({
        content: <span className="text-sm text-gray-700">{t(`ChatBox.${m.label}`)}</span>,
        onClick: () => setSelectedModel(m.label),
    }));

    const handleSendMessage = () => {
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    };


    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="w-full flex flex-col gap-2">
            {/* Chatbox Card */}
            <div className="relative w-full h-full bg-gray-400 rounded-2xl shadow-gray-500 shadow-sm p-2 flex flex-col gap-1">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full flex-1 min-h-0 bg-transparent text-white placeholder-gray-200 resize-none outline-none px-2 py-1 text-md"
                    placeholder={t("ChatBox.Message")}
                />

                {/* Controls row */}
                <div className="flex flex-row items-center justify-between gap-2">
                    {/* Model Selection */}
                    <Dropdown
                        button={
                            <button
                                type="button"
                                title="Select model"
                                className="flex items-center gap-1 px-2 py-1 rounded-full text-gray-600 bg-gray-400 border-gray-600 border hover:bg-gray-500 hover:text-gray-200 transition-all duration-150 cursor-pointer text-sm"
                            >
                                <span>{t(`ChatBox.${selectedModel.label}`)}</span>
                                <FaChevronDown size={10} />
                            </button>
                        }
                        dropdownItems={modelItems}
                        settings={{ dropdownPosition: "left", dropdownmt: "mb-2" }}
                    />

                    {/* Buttons */}
                    <div className="flex flex-row gap-1">
                        <button
                            type="button"
                            title="Attach file"
                            className="flex items-center justify-center w-7 h-7 rounded-full text-gray-600 hover:bg-gray-500 hover:text-gray-200 active:scale-95 transition-all duration-150 cursor-pointer"
                        >
                            <FaPaperclip size={16} />
                        </button>
                        <button
                            type="button"
                            title="Send"
                            onClick={handleSendMessage}
                            className="flex items-center justify-center w-7 h-7 rounded-full text-gray-600 hover:bg-gray-500 hover:text-gray-200 active:scale-95 transition-all duration-150 cursor-pointer"
                        >
                            <FaArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <span className="w-full flex justify-center text-xs text-gray-600">
                {t("ChatBox.AIDisclaimer")}
            </span>
        </div>
    );
}
