import React, { createContext, useEffect, useState } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [localStorageSessionId, setSessionId] = useState('');

    useEffect(() => {
        // Generate a random session ID
        const generateSessionId = () => {
            return '_' + Math.random().toString(36).substr(2, 13).padEnd(14, '1');
        };

        // Check if session ID exists in local storage
        const storedSessionId = localStorage.getItem('user_id');
        if (storedSessionId) {
            setSessionId(storedSessionId);
        }
        else {
            const newSessionId = generateSessionId();
            localStorage.setItem('user_id', newSessionId);
            setSessionId(newSessionId);
        }
    }, []);

    return (
        <SessionContext.Provider value={{ localStorageSessionId, setSessionId }}>
            {children}
        </SessionContext.Provider>
    );
};



