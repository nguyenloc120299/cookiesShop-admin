import { apiInstance } from '../../baseApi'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import ChartColumn from './ChartColumn'
import { BiCalendar } from 'react-icons/bi'
const MainPage = () => {

    const context = useContext(GlobalContext)
    const [orders] = context.ordersApi.orders
    const [products] = context.productsApi.products
    const [totalRevent, setTotalRevent] = useState(0)
    const { id } = JSON.parse(localStorage.getItem('login_admin'))
    const [revenue, setRevenue] = useState([])
    const numberFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const getTotalRevent = async () => {
        const res = await apiInstance.get(`/totalrevenue/user/${id}`)
        if (res && res.data) setTotalRevent(res.data)
    }
    const getRevenue = async () => {
        const res = await apiInstance.get(`/revenue/user/${id}`)
        if (res && res.data) setRevenue(res.data.thongke)
    }
    const productStatus = products.filter(item => { return item.status === 0 })
    useEffect(() => {
        getTotalRevent()
        getRevenue()
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
                                    <div className='d-flex align-items-center'>
                                        {/* <label >
                                            <BiCalendar style={{
                                                fontSize: '50px'
                                            }} />

                                        </label>

                                        <input id="fileInput1" type="date" className='form-control'

                                        /> */}
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
                                            Ch??? x??c nh???n</div>
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount text-primary">
                                            {order ? order.length : 0} ????n h??ng
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
                                            S??? s???n ph???m trong kho</div>
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount text-primary">
                                            {products ? products.length : 0} s???n ph???m
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
                                            T???ng ????n h??ng</div>
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount text-primary">
                                            {orders && orders.length} ????n
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
                                            S???n ph???m ch??? duy???t</div>
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount text-primary">
                                            {productStatus && productStatus.length} s???n ph???m
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
                        <ChartColumn revenue={revenue} />
                    </div>
                </div>

            </div>

        </div >
    )
}

export default MainPage
