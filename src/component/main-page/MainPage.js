import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import ChartColumn from './ChartColumn'

const MainPage = () => {

    const context = useContext(GlobalContext)
    const [orders] = context.ordersApi.orders
    const [products] = context.productsApi.products
    const [totalRevent, setTotalRevent] = useState(0)
    const { id } = JSON.parse(localStorage.getItem('login_admin'))

    const numberFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const getTotalRevent = async () => {
        const res = await axios.get(`/totalrevenue/user/${id}`)
        if (res && res.data) setTotalRevent(res.data)
    }
    const productStatus = products.filter(item => { return item.status === 0 })
    useEffect(() => {
        getTotalRevent()
    }, [])
    const order = orders.filter(item => {
        return item.status == 0
    })
    return (
        <div className="Dashboard-mainPage">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
            </div>
            <div className="container-fluid">
                <div className="row dashboardRow">
                    < div className="col-xl-12 col-md-6 mb-4" >
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center text-center ">
                                    <div className="col mr-2">
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1">
                                            doanh thu
                                        </div>
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount text-primary">
                                            {numberFormat.format(totalRevent)}
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    < div className="col-xl-3 col-md-6 mb-4" >
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center ">
                                    <div className="col mr-2">
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1">
                                            Chờ xác nhận</div>
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount text-primary">
                                            {order ? order.length : 0} đơn hàng
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    < div className="col-xl-3 col-md-6 mb-4" >
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center ">
                                    <div className="col mr-2">
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1">
                                            Số sản phẩm trong kho</div>
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount text-primary">
                                            {products ? products.length : 0} sản phẩm
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    < div className="col-xl-3 col-md-6 mb-4" >
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center ">
                                    <div className="col mr-2">
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1">
                                            Tổng đơn hàng</div>
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount text-primary">
                                            {orders && orders.length} đơn
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    < div className="col-xl-3 col-md-6 mb-4" >
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center ">
                                    <div className="col mr-2">
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1">
                                            Sản phẩm chờ duyệt</div>
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount text-primary">
                                            {productStatus && productStatus.length} sản phẩm
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-xl-12 col-md-6 mb-4 chartDemo'>
                        {/* <Chart /> */}
                        <ChartColumn />
                    </div>
                </div>

            </div>

        </div >
    )
}

export default MainPage
