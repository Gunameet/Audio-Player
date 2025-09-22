import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const STATIC_USER = {
    email: "Akshardham@gmail.com",
    password: "Akshardham@123",
    name: "BAPS Swaminarayan Akshardham",
};

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (auth === "true" && storedUser) {
            setIsLoggedIn(true);
            setUser(storedUser);
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("auth", "true");
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, user, login, logout, STATIC_USER }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
