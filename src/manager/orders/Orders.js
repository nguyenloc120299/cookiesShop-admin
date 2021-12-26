import React, { useContext, useEffect, useState } from 'react'
import PaginationReact from 'react-paginate'
import swal from 'sweetalert'
import { GlobalContext } from '../../GlobalContext'
import DetailListOrders from './DetailListOrders'
import './order.css'
import TableAdmin from './TableAdmin'
import Loading from '../../valid/Loading'
import TableBuyer from './TableBuyer'
import { apiInstance } from '../../baseApi'
import { Tab, Tabs } from 'react-bootstrap'
import { RiUserLocationFill, RiUserSearchLine } from 'react-icons/ri'
import { MdVerifiedUser } from 'react-icons/md'
const Orders = () => {
    const context = useContext(GlobalContext)
    const res = JSON.parse(localStorage.getItem('login_admin'))
    const [orders] = context.ordersApi.orders
    const [ordersDetailAdmin] = context.ordersApi.ordersDetailAdmin
    const [callBack, setCallBack] = context.ordersApi.callBack
    const totalItem = 18;
    const [isLoading, setIsLoading] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const [type, setType] = context.ordersApi.status
    const [typeAdmin, setTypeAdmin] = context.ordersApi.typeAdmin
    const pageCount = Math.ceil(orders.length / totalItem);
    const [detailOrder, setDetailOrder] = useState([])
    const PageVisited = pageNumber * totalItem
    const [info, setInfo] = useState('')
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const confirmOrdersAdmin = async (orderId) => {
        setIsLoading(true)
        await apiInstance.post(`/orders/${orderId}/verify`)
        swal('Xác nhận đơn hàng thành công', 'Đã chuyển đơn hàng cho người bán', 'success')
        setCallBack(!callBack)
        setIsLoading(false)
    }
    const getInfo = async (id) => {
        const res = await apiInstance.get(`/orders/show-order/${id}`)
        console.log(res.data);
        if (res && res.data) setInfo(res.data)
    }
    const onChangeStatus = async (status, id) => {
        if (status === 0)
            await apiInstance.post(`/status/orderDetail/${id}/type/1`)
        if (status === 1)
            await apiInstance.post(`/status/orderDetail/${id}/type/2`)
        if (status === 2)
            await apiInstance.post(`/status/orderDetail/${id}/type/3`)
        swal('Hoàn tất', '', 'success')
        setCallBack(!callBack)
    }

    const displayOrderAdminDetail = ordersDetailAdmin.slice(PageVisited, totalItem + PageVisited).map((item, index) => (
        <tr key={index}>
            <td>
                {index}
            </td>
            <td>
                <div className='d-flex flex-column justify-content-center'>
                    <div>{item.name}</div>
                    <img src={item.avartar} alt='' style={{
                        width: '5rem',
                        objectFit: "cover"
                    }} />

                </div>

            </td>
            <td>{item.quantity}</td>


            <td>{item.discount > 0 ? (item.discount) : item.totalmoney}</td>
            <td
                style={item.status === 0
                    ? { color: 'green', fontWeight: 'bold' }
                    : item.status === 1 ? { color: 'orange', fontWeight: "bold" } : {
                        color: 'blue', fontWeight: "bold"
                    }}
            >{item.status === 0 ? 'Chưa xác nhận' : item.status === 1 ? 'Đang giao' : 'Đã giao'}</td>

            <td>
                {
                    item.status === 3 ?
                        <p style={{
                            color: 'green',
                            fontWeight: '700'
                        }}>Hoàn tất</p> :
                        <button className='btn btn-primary' onClick={() => onChangeStatus(item.status, item.id)}>{item.status === 2 ? 'Hoàn tất'
                            : 'Tiếp tục'}</button>
                }</td>
        </tr>
    ))
    const displayOrder = orders.slice(PageVisited, totalItem + PageVisited).map((item, index) => (
        <tr key={index}>
            <td>
                {index}
            </td>
            <td>
                <div className='d-flex flex-column justify-content-center'>
                    <div>{item.name}</div>
                    <img src={item.avartar} alt='' style={{
                        width: '5rem',
                        objectFit: "cover"
                    }} />

                </div>

            </td>
            <td>{item.quantity}</td>


            <td>{item.discount > 0 ? (item.discount) : item.totalmoney}</td>
            <td>{item.dateorder}</td>

            <td
                style={item.status === 0
                    ? { color: 'green', fontWeight: 'bold' }
                    : item.status === 1 ? { color: 'orange', fontWeight: "bold" } : {
                        color: 'blue', fontWeight: "bold"
                    }}
            >{item.status === 0 ? 'Chưa xác nhận' : item.status === 1 ? 'Đang giao' : 'Đã giao'}</td>
            <td className=''><RiUserSearchLine style={{
                fontSize: '2rem'
            }} data-toggle="modal" data-target="#exampleModal111" type='button'
                onClick={() => getInfo(item.id)}
            /></td>
            <td>
                {
                    item.status === 3 ?
                        <p style={{
                            color: 'green',
                            fontWeight: '700'
                        }}>Hoàn tất</p> :
                        <button className='btn btn-primary' onClick={() => onChangeStatus(item.status, item.id)}>{item.status === 2 ? 'Hoàn tất'
                            : 'Tiếp tục'}</button>
                }</td>
        </tr>
    ))

    const displayOrderAdmin = orders.slice(PageVisited, totalItem + PageVisited).map((item, index) => (
        <tr key={index}>
            <td>
                {index}
            </td>
            <td
                style={item.payments === 0
                    ? { color: 'green', fontWeight: 'bold' }
                    : { color: 'blue', fontWeight: "bold" }}
            >{item.status === 0 ? 'Trưc tiếp' : 'Online'}</td>
            <td>
                {item.deliveryaddress}
            </td>
            <td>{item.namecustomer}</td>


            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.note}</td>
            <td
                style={item.status === 0
                    ? { color: 'orange', fontWeight: 'bold' }
                    : item.status === 1 ? { color: 'green', fontWeight: "bold" } : {
                        color: 'blue', fontWeight: "bold"
                    }}
            >{item.status === 0 ? 'Chưa xác nhận' : item.status === 1 ? 'Đơn hàng đã duyệt' : 'Đã giao'}</td>
            <td><i className="fas fa-info-circle" style={{
                fontSize: '2rem',
                color: "GrayText"
            }} data-toggle="modal" data-target="#exampleModal"
                onClick={() => setDetailOrder(item.listOrderDetail)}
            /></td>
            {
                item.status === 0 ? <td><button className='btn btn-primary' onClick={() => confirmOrdersAdmin(item.id)}>Xác nhận đơn hàng</button></td>
                    : <td className='text-center'><i className="fas fa-check-circle text-success" /></td>
            }
        </tr >
    ))

    return (
        <div className='orders m-5'>
            {
                isLoading && <Loading />
            }
            {
                <DetailListOrders item={detailOrder} />
            }
            {
                (res.token && res.roles[0].authority === 'Admin') &&

                <Tabs defaultActiveKey="home" className="mb-3 text-color-dark" >
                    <Tab eventKey="home" title="Tất cả đơn hàng">
                        <TableAdmin displayOrder={displayOrderAdmin} />
                    </Tab>

                    <Tab eventKey="loaiSP" title="Quản lý chi tiết đơn hàng admin">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">

                            <li className="nav-item" onClick={() => setTypeAdmin(5)}>
                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Tất cả </a>
                            </li>

                            <li className="nav-item" onClick={() => setTypeAdmin(0)}>
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Chờ xác nhận </a>
                            </li>
                            <li className="nav-item" onClick={() => setTypeAdmin(1)}>
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Đang giao </a>
                            </li>
                            <li className="nav-item" onClick={() => setTypeAdmin(2)}>
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Đã giao </a>
                            </li>


                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">


                                <TableBuyer displayOrder={displayOrderAdminDetail} />
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                                <TableBuyer displayOrder={displayOrderAdminDetail} />
                            </div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                                <TableBuyer displayOrder={displayOrderAdminDetail} />
                            </div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                                <TableBuyer displayOrder={displayOrderAdminDetail} />
                            </div>
                        </div>
                    </Tab>


                </Tabs>
            }
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                {
                    !(res.token && res.roles[0].authority === 'Admin') &&
                    <>
                        <li className="nav-item" onClick={() => setType(5)}>
                            <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Tất cả </a>
                        </li>

                        <li className="nav-item" onClick={() => setType(0)}>
                            <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Chờ xác nhận </a>
                        </li>
                        <li className="nav-item" onClick={() => setType(1)}>
                            <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Đang giao </a>
                        </li>
                        <li className="nav-item" onClick={() => setType(2)}>
                            <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Đã giao </a>
                        </li>
                    </>
                }
            </ul>
            {
                (res && res.roles[0].authority === 'Buyer') &&

                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">


                        <TableBuyer displayOrder={displayOrder} />
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                        <TableBuyer displayOrder={displayOrder} />
                    </div>
                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                        <TableBuyer displayOrder={displayOrder} />
                    </div>
                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                        <TableBuyer displayOrder={displayOrder} />
                    </div>
                </div>
            }
            <div className='row'>
                <PaginationReact previousLabel={"Trở lại"}
                    nextLabel={"Tiếp theo"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination"}
                    previousLinkClassName={"previousBtn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"} />
            </div>
            <div className="modal fade" id="exampleModal111" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title font-weight-bold text-center" id="exampleModalLabel">Thông tin <RiUserLocationFill /></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className='font-weight-bold'>Họ tên người mua : <span className='text-primary'>{info.namecustomer}</span></p>
                            <p className='font-weight-bold'>Ghi chú : <span className='text-primary'>{info.note}</span></p>
                            <p className='font-weight-bold'>Số điện thoại: <span className='text-primary'>{info.phone}</span></p>
                            <p className='font-weight-bold'>Email : <span className='text-primary'>{info.email}</span></p>
                            <p className='font-weight-bold'>Địa chỉ nhận hàng :<span className='text-primary'>{info.deliveryaddress}</span></p>
                            <p className='font-weight-bold'>Hình thức thanh toán :<span className='text-primary'>{info.payments === 0 ? 'Thanh toán trực tiếp' : 'Đã thanh toán online'}</span></p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Orders
