import React from 'react';
import { NavLink,useParams } from 'react-router-dom';
import './sidebar.css';

import { FaHome } from "react-icons/fa";
import { PiBooks } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { LiaNewspaperSolid } from "react-icons/lia";


import logo from "../../assets/[removal.ai]_ab348180-27e7-439f-b339-6d4f95342f85-screenshot-2024-03-16-at-3-46-20-am_3QQD13.png"

const Sidebar = () => {
    const { userName } = useParams();
    const handleLogout = () => {
        window.location.href = "/login";
    }
    return (
        <nav className="sidebar">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <ul className="nav-links">
                <li>
                    <NavLink to={`/app/${userName}`} end className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
                        {/* Your icon for Home */}
                        <span><FaHome/></span> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/app/${userName}/add-books`} className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
                        {/* Your icon for Add Books */}
                        <span><PiBooks/></span> Add Books
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/app/${userName}/add-publications`} className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
                        {/* Your icon for Add Books */}
                        <span><LiaNewspaperSolid/></span> Add Publications
                    </NavLink>
                </li>
            </ul>
            <div className="logout" onClick={handleLogout}>
                <IoIosLogOut size={25}/><p className='logout-p' onClick={handleLogout}>Logout</p>
            </div>
        </nav>
    );
};

export default Sidebar;
