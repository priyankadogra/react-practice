import { createContext, useContext } from "react";

export const theme = createContext<string>("light");

export function useTheme() {
    return useContext(theme);
}