import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getAccount = () => {
        try {
            const raw = localStorage.getItem("session");
            if (!raw) {
                setUser(null);
                return;
            }

            const parsed = JSON.parse(raw);
            setUser(parsed);
        } catch (error) {
            console.error("Auth parse error", error);
            setUser(null);
        }
    };

    const login = (session) => {
        localStorage.setItem("session", JSON.stringify(session));
        setUser(session);
    };

    const logout = () => {
        localStorage.removeItem("session");
        setUser(null);
    };

    useEffect(() => {
        getAccount();
        setLoading(false);
    }, []);

    const contextValue = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        hasRole: (role) => user?.roles?.includes(role),
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);