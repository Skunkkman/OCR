import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Dropdown({
    button,
    dropdownTitle,
    dropdownItems,
    settings = {}
}) {
    const defaultSettings = {
        closeOnSelect: true,
        dropdownPosition: 'right'
    };

    settings = { ...defaultSettings, ...settings };

    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        const handleEsc = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen]);

    const menuVariants = {
        hidden: {
            opacity: 0,
            y: -8,
            scale: 0.95,
            transition: { duration: 0.15, ease: "easeIn" },
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.2, ease: "easeOut" },
        },
    };

    return (
        <div
            ref={wrapperRef}
            className="relative flex items-center justify-center w-max text-2xl font-semibold text-black select-none"
        >
            {button ? (
                React.cloneElement(button, { onClick: toggleMenu })
            ) : (
                <FaBars
                    size={32}
                    color="black"
                    onClick={toggleMenu}
                    className="cursor-pointer transition-transform duration-200 ease-out hover:text-gray-600 hover:scale-110 active:scale-95"
                />
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="dropdown"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        style={{ originY: 0 }}
                        className={`
                            absolute top-full ${settings.dropdownmt ?? "mt-2"} bg-gray-400 w-max rounded-lg shadow-lg z-50 border border-gray-300
                            min-w-10/10
                            ${settings.dropdownPosition === 'left' ? 'left-0' : 'right-0'}
                        `}
                    >
                        {dropdownTitle && (
                            <div className="px-4 py-3 text-lg font-semibold border-b border-gray-200">
                                {dropdownTitle}
                            </div>
                        )}
                        {dropdownItems?.map((item, key) => (
                            <div
                                className="flex items-center gap-3 px-4 py-2 text-lg hover:bg-gray-500 cursor-pointer transition-colors"
                                key={key}
                                onClick={(e) => {
                                    item.onClick(e);
                                    if (settings.closeOnSelect) setIsOpen(false);
                                }}
                            >
                                {item.content}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
