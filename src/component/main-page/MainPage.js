import React from 'react'

const MainPage = () => {
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
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount">
                                            10000
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
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount">
                                            2 đơn hàng
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
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount">
                                            3 sản phẩm
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
                                            Tổng sản phẩm đã bán</div>
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount">
                                            3 sản phẩm
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
                                        <div className="text-xxs font-weight-bold  text-uppercase mb-1 dashboardCount">
                                            3 sản phẩm
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='col-xl-12 col-md-6 mb-4 chartDemo'>
                        <Chart />
                    </div> */}
                </div>

            </div>

        </div >
    )
}

export default MainPage
