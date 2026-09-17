import { useContext } from "react";
import { AuthContext } from "@/lib/auth-context";

export const useAuth = () => useContext(AuthContext);