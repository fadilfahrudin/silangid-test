import { createContext, useState, ReactNode, useEffect } from "react";
import axiosWithAuth from "@/lib/axios";

interface User {
    email: string;
    name: string;
}

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {

        try {
            const res = await axiosWithAuth.post("/login", { email, password });
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }


    };

    const logout = async () => {
        await axiosWithAuth.post("/logout");
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
