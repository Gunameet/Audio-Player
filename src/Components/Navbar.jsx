import React, { useState, useEffect } from "react";
import { Button, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ className, style, onLogout }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const auth = localStorage.getItem("auth");
        setIsLoggedIn(!!auth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        setIsLoggedIn(false);
        navigate("/login", { replace: true });
        onLogout();
    };

    const items = [
        { label: <Link to="/">Daily Rituals</Link>, key: "home" },
        // { label: <Link to="/playlist">More</Link>, key: "playlist" },
        isLoggedIn
            ? {
                label: (
                    <Button
                        type="link"
                        onClick={handleLogout}
                        style={{ padding: 0, color: "black" }}
                    >
                        Logout
                    </Button>
                ),
                key: "logout",
            }
            : { label: <Link to="/login">Login</Link>, key: "login" },
    ];

    return (
        <Menu
            mode="horizontal"
            items={items}
            // overflowedIndicator={null}
            className={className ?? "text-white p-4 text-lg font-bold"}
            style={{ background: "transparent", borderBottom: "none", ...style }}
        />
    );
}

export default Navbar;
