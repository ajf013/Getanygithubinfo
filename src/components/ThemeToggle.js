import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className={`ui icon button ${theme === 'dark' ? 'inverted basic' : 'basic'}`}
            onClick={toggleTheme}
            style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1000 }}
            aria-label="Toggle Theme"
        >
            <i className={`icon ${theme === 'light' ? 'moon' : 'sun'}`}></i>
        </button>
    );
};

export default ThemeToggle;
