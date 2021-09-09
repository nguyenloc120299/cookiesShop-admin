import { createContext, useEffect, useState } from "react";
import CategoriesApi from "./api/CategoriesApi";
import SupplierApi from "./api/SupplierApi";
import ProductApi from './api/ProductApi'
import UserApi from './api/UserApi'
export const GlobalContext = createContext()

export const DataProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        const res = JSON.parse(localStorage.getItem('login_admin'))
        if (res) {
            if (res.token && res.roles[0].authority === 'Admin') setIsLogin(true)
        }
        else setIsLogin(false)

    }, [])
    const data = {
        categoriesApi: CategoriesApi(),
        suppliersApi: SupplierApi(),
        productsApi: ProductApi(),
        usersApi: UserApi(),
        isLogin: [isLogin, setIsLogin]
    }
    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    )
}