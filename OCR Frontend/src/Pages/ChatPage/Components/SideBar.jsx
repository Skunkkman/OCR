import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import SideBarChatRow from './SideBarChat';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { updateLanguageFromCookie } from '../../../../i18n';
import Dropdown from '../../../Components/Buttons/Dropdown';
import { FaPlus } from "react-icons/fa";

export default function SideBar({ isOpen, setIsOpen, onNewChat }) {
    const { t } = useTranslation();

    const cookies = new Cookies();

    const [currentLanguage, setCurrentLanguage] = useState(cookies.get('language') || 'en');

    const handleLanguageChange = (newLanguage) => {
        cookies.set('language', newLanguage, { path: '/' });
        setCurrentLanguage(newLanguage);
        updateLanguageFromCookie();
    };

    return (
        <>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="sidebar"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed top-0 left-0 z-40 w-7/10 md:w-[17.5%] h-screen bg-gray-400 border-r-[0.5px] border-gray-200 shadow-gray-500 shadow-md"
                    >
                        <div className="flex flex-col h-full w-full">
                            <div className="flex flex-row justify-between items-center p-2 text-md text-gray-600">
                                <Dropdown
                                    button={
                                        <button
                                            className={`h-6 mb-1 transition-transform duration-200 ease-out bg-center bg-cover rounded-sm cursor-pointer hover:scale-110 active:scale-95 ${currentLanguage === 'en' ? 'aspect-[2_/_1]' : 'aspect-[3_/_2]'}`}
                                            title='Language Selection Dropdown'
                                            style={{ backgroundImage: `url(/Flag_${currentLanguage}.svg)` }}
                                        >
                                        </button>
                                    }
                                    dropdownTitle={t('SideBar.Language')}
                                    dropdownItems={[
                                        { content: <><img src='/Flag_en.svg' alt='UK Flag Icon' className='w-8 h-5'></img> English</>, onClick: () => handleLanguageChange('en') },
                                        { content: <><img src='/Flag_ru.svg' alt='Russian Flag Icon' className='w-8 h-5'></img> Русский</>, onClick: () => handleLanguageChange('ru') },
                                    ]}
                                    settings={{
                                        dropdownPosition: 'left',
                                        dropdownmt: 'mt-2',
                                    }}
                                />
                                <FaChevronLeft
                                    onClick={() => setIsOpen(false)}
                                    className="cursor-pointer rounded-full p-1 transition-colors duration-200 hover:bg-gray-500 hover:text-gray-200"
                                    size={28}
                                />
                            </div>
                            <div className="flex flex-row justify-center mt-4">
                                <button className="w-9/10 p-2 h-full bg-gray-500 hover:bg-gray-600 active:scale-98 rounded-3xl text-white text-md cursor-pointer font-semibold shadow-sm hover:shadow-md transition-all duration-200 ease-in-out flex items-center justify-center gap-2"
                                    onClick={onNewChat}
                                >
                                    <FaPlus size={14} />
                                    <span>{t("SideBar.NewChat")}</span>
                                </button>
                            </div>
                            <div className="flex flex-col h-full w-full mt-4 min-h-0">
                                <div className="px-4 no-scrollbar-arrows scrollbar-thumb-gray-600 scrollbar-track-transparent flex flex-col w-full flex-1 min-h-0 overflow-y-auto">
                                    <span className='ml-2 text-xs font-semibold mt-2'>{t("SideBar.Today")}</span>
                                    {Array.from({ length: 2 }).map((_, key) => (
                                        <SideBarChatRow key={key} chat={{ "name": "Test_Chat" }} />
                                    ))}
                                    <span className='ml-2 text-xs font-semibold mt-2'>{t("SideBar.7Days")}</span>
                                    {Array.from({ length: 10 }).map((_, key) => (
                                        <SideBarChatRow key={key} chat={{ "name": "Test_Chat" }} />
                                    ))}
                                    <span className='ml-2 text-xs font-semibold mt-2'>{t("SideBar.30Days")}</span>
                                    {Array.from({ length: 25 }).map((_, key) => (
                                        <SideBarChatRow key={key} chat={{ "name": "Test_Chat" }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        key="toggle"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-2 left-2 z-50"
                    >
                        <FaChevronRight
                            onClick={() => setIsOpen(true)}
                            className="cursor-pointer rounded-full p-1 text-gray-600 bg-gray-200 hover:bg-gray-500 hover:text-gray-200 transition-colors duration-200"
                            size={28}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
