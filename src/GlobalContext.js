import { createContext, useEffect, useState } from "react";
import CategoriesApi from "./api/CategoriesApi";
import SupplierApi from "./api/SupplierApi";
import ProductApi from './api/ProductApi'
import UserApi from './api/UserApi'
import OrdersApi from './api/OrderApi'
import axios from 'axios'
export const GlobalContext = createContext()

export const DataProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false)
    const [firstLogin, setFirstLogin] = useState(false)
    const getUser = async (id) => {
        const res = await axios.get(`/store/user/${id}`)
        if (!res.data) setFirstLogin(true);
        else setFirstLogin(false)
    }
    useEffect(() => {
        const res = JSON.parse(localStorage.getItem('login_admin'))
        if (res) {
            if (res.token && res.roles[0].authority === 'Admin' || res.token && res.roles[0].authority === 'Buyer') setIsLogin(true)
            if (res.token && res.roles[0].authority === 'Buyer') {
                getUser(res.id)
            }
        }
        else setIsLogin(false)

    }, [])
    const data = {
        categoriesApi: CategoriesApi(),
        suppliersApi: SupplierApi(),
        productsApi: ProductApi(isLogin),
        usersApi: UserApi(),
        isLogin: [isLogin, setIsLogin],
        ordersApi: OrdersApi(),
        isFirstLogin: [firstLogin, setFirstLogin]
    }
    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    )
}