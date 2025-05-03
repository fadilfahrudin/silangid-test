
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../type/userType";
import axiosWithAuth from "@/lib/axios";


type UserContextType = {
    users: UserType[];
    setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
    userId: number;
    setUserId: React.Dispatch<React.SetStateAction<number>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [userId, setUserId] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosWithAuth.get("/user");
                if (!res.data) {
                    throw new Error("Failed to fetch users");
                }
                
                setUsers(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className='absolute left-0 top-0 w-full h-full  flex justify-center items-center'>
                <div className='w-[50px] aspect-square bg-neutral-950 rounded-full animate-bounce'></div>
            </div>
        )
    }

    return (
        <UserContext.Provider value={{ users, setUsers, userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
