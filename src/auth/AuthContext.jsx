import { createContext, useContext, useEffect, useState } from "react";

// Utility functions for working with cookies
const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
};


const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
};

const deleteCookie = (name) => {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Get the token from cookies
    const [user, setUser] = useState(() => getCookie("token") || null);
    const [channel, setChannel] = useState(null);

    const login = (token) => {
        // Set the token in cookies for 7 days
        setCookie("token", token, 7);
        setUser(token);

        // Broadcast the login event to other tabs
        if (channel) {
            channel.postMessage("login");
        }
    };

    const logout = () => {
        // Delete the token from cookies
        deleteCookie("token");
        setUser(null);

        if (channel) {
            channel.postMessage("logout");
        }
    };
    // useEffect(() => {
    //     console.log(user); // This will log whenever `user` changes
    // }, [user]);
    useEffect(() => {
        const authChannel = new BroadcastChannel("auth_channel");
        setChannel(authChannel);

        // Listen for messages from other tabs
        authChannel.addEventListener("message", (event) => {
            if (event.data === "logout") {
                setUser(null); // Sync logout across tabs
            }
        });

        // Clean up the channel on unmount
        return () => {
            authChannel.close();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
