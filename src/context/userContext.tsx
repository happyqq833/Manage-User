import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UserInfo } from "../ultis/auth";

interface UserContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

