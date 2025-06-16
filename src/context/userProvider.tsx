import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { getUserInfo, UserInfo } from "../ultis/auth";
import { UserContext } from "./userContext";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserInfo | null>(() => {
        return getUserInfo();
    });


    useEffect(() => {
        const userData = getUserInfo();
        if (userData) {
            setUser(userData);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
