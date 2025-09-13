import React, { useState } from 'react';
import Navbar from '../Pages/shared/Navbar';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const [darkMode, setDarkMOde] = useState(false);

    const toggleTheme = () => {
        setDarkMOde(!darkMode);
        document.documentElement.classList.toggle("dark");
    }
    return (
        <div>
            <Navbar darkMode={darkMode} toggleTheme={toggleTheme}></Navbar>
            <Outlet context={{ darkMode, toggleTheme }}></Outlet>
        </div>
    );
};

export default AuthLayout;