import { createContext } from "react";
import CategoriesApi from "./api/CategoriesApi";
import SupplierApi from "./api/SupplierApi";

export const GlobalContext = createContext()

export const DataProvider = ({ children }) => {
    const data = {
        categoriesApi: CategoriesApi(),
        suppliersApi: SupplierApi()
    }
    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    )
}