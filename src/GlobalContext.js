import { createContext } from "react";
import CategoriesApi from "./api/CategoriesApi";

export const GlobalContext = createContext()

export const DataProvider = ({ children }) => {
    const data = {
        categoriesApi: CategoriesApi()
    }
    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    )
}