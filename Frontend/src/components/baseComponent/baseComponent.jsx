

import React, { useEffect, useState, useRef } from 'react';
import LOGO from "../../assets/logo.png";
import Container from '../container/container';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import SearchComponent from '../../components/landing/search/SearchComponent';
import { FaShoppingCart } from 'react-icons/fa';

const BaseComponent = () => {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Fetch user data from localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Error parsing user from localStorage:", err);
            }
        }
    }, []);

    useEffect(() => {
        const handleUserChange = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (err) {
                    console.error("Error parsing user:", err);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        window.addEventListener("userChanged", handleUserChange);
        return () => window.removeEventListener("userChanged", handleUserChange);
    }, []);

    // Handle outside click to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
                setIsPinned(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('user_id');
        console.log('Logged out successfully');
        window.dispatchEvent(new Event("userChanged"));
        navigate('/login');
    };

    const handleClickToggle = () => {
        setIsPinned(!isPinned);
        setShowDropdown(!isPinned);
    };

    const userId = user ? user.id : null;
    const isAdmin = user && user.email === 'admin@shoptherecipe.com';

    return (
        <div className="base-header-container">
            <div className="whole-header">
                {/* Top Header */}
                <div className="top-header">
                    <div className="top-header-content">
                        {user ? (
                            <div
                                className="username-dropdown-wrapper"
                                ref={dropdownRef}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => {
                                    if (!isPinned) setShowDropdown(false);
                                }}
                            >
                                <div className="username-dropdown" onClick={handleClickToggle}>
                                    <span>Welcome, {user.name} ⏷</span>
                                    {showDropdown && (
                                        <ul className="dropdown-menu">
                                            <li><Link to={`/profile/${userId}`}>Profile</Link></li>
                                            <li><Link to={`/orders/${userId}`}>Orders</Link></li>
                                            <li><button onClick={handleLogout}>Logout</button></li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="auth-links">
                                <Link to="/login">LOGIN</Link>
                                <Link to="/signup">SIGNUP</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Header */}
                <nav className="main-header">
                    <div className="main-header-content">
                        <div className="left-logo">
                            <Link to={isAdmin ? "/adminportal" : "/"}>
                                <img src={LOGO} alt="logo" className="nav-logo" />
                            </Link>
                        </div>
                        <div className="center-area">
                            <div className="center-links">
                                {isAdmin ? (
                                    <>
                                        <Link to="/adminportal">REPORTS</Link>
                                        <Link to="/admin/recipes">RECIPES</Link>
                                        <Link to="/admin/ingredients">INGREDIENTS</Link>
                                        <Link to="/admin/orders">ORDERS</Link>
                                        <Link to="/admin/users">USERS</Link>
                                        <Link to="/admin/cart">CART</Link>
                                        <Link to="/admin/contactform">CONTACT FORM RESPONSES</Link>

                                    </>
                                ) : (
                                    <>
                                        <Link to="/recipes">RECIPES</Link>
                                        <Link to="/products">PRODUCTS</Link>
                                        <Link to="/contact">CONTACT</Link>
                                    </>
                                )}
                            </div>
                            {!isAdmin && (
                            <div className="search-bar">
                                <SearchComponent />
                            </div>
                            )}
                        </div>
                        <div className="right-cart">
                            {userId && !isAdmin && (
                                <Link to={`/cart/${userId}`}>
                                <FaShoppingCart size={25} />
                                </Link>
                            )}
                            </div>

                    </div>
                </nav>
            </div>

            <Outlet />
        </div>
    );
};

export default BaseComponent;
