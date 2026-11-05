import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../../index.css';
import Dropdown from '../Buttons/Dropdown';
import { updateLanguageFromCookie } from '../../../i18n';

function HeaderButton({ content, additionalStyling, onClick }) {
    return (
        <span
            onClick={onClick}
            className={`flex items-center text-2xl font-bold text-black select-none hover:cursor-pointer ${additionalStyling}`}
        >
            {content}
        </span>
    );
}

export default function Header() {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const cookies = new Cookies();

    const [currentLanguage, setCurrentLanguage] = useState(cookies.get('language') || 'en');

    const handleLanguageChange = (newLanguage) => {
        cookies.set('language', newLanguage, { path: '/' });
        setCurrentLanguage(newLanguage);
        updateLanguageFromCookie();
    };

    return (
        <header className="flex w-full h-32 px-6 bg-gray-300 shadow-md">
            {/* Center: Logo */}
            <div className="flex justify-center flex-1">
                <HeaderButton
                    onClick={() => navigate('/')}
                    content={<img src="/Logo.png" alt="Logo" className="object-contain h-20" />}
                />
            </div>

            {/* Right: Language Selection Box */}
            <Dropdown
                button={
                    <button
                        className='w-8 h-5 mb-1 transition-transform duration-200 ease-out bg-center bg-cover rounded-sm cursor-pointer md:w-12 md:h-8 hover:text-gray-600 hover:scale-110 active:scale-95 md:rounded-md sm:mb-0'
                        title='Language Selection Dropdown Button'
                        style={{ backgroundImage: `url(/Flag_${currentLanguage}.svg)` }}
                    >
                    </button>
                }
                dropdownTitle={t('Header.Languages')}
                dropdownItems={[
                    { content: <><img src='/Flag_en.svg' alt='UK Flag Icon' className='w-8 h-5'></img> English</>, onClick: () => handleLanguageChange('en') },
                    { content: <><img src='/Flag_ru.svg' alt='Russian Flag Icon' className='w-8 h-5'></img> Русский</>, onClick: () => handleLanguageChange('ru') },
                ]}
                settings={
                    {
                        dropdownPosition: 'right',
                        dropdownmt: 'mt-2',
                    }
                }
            />
        </header>
    );
}
