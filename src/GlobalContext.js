import { createContext } from "react";
import CategoriesApi from "./api/CategoriesApi";
import SupplierApi from "./api/SupplierApi";
import ProductApi from './api/ProductApi'
export const GlobalContext = createContext()

export const DataProvider = ({ children }) => {
    const data = {
        categoriesApi: CategoriesApi(),
        suppliersApi: SupplierApi(),
        productsApi: ProductApi()
    }
    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    )
}