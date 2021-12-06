
import 'bootstrap/dist/css/bootstrap.min.css';
const DetailListOrders = ({ item }) => {
    console.log(item);
    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Danh sánh sản phẩm</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <table className='table-hover table'>
                            <thead >
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Sản phẩm</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Tổng tiền</th>
                                    <th scope="col">Giảm giá</th>
                                    <th scope="col">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className='mt-4'>
                                {
                                    item.map((item, index) => (
                                        <tr>
                                            <td>{index}</td>
                                            <td>
                                                <div>{item.name}</div>
                                                <img src={item.avartar} alt='' style={{
                                                    width: '70px',
                                                    height: '70px'
                                                }} />
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>{item.totalmoney}</td>
                                            <td>{item.discount}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default DetailListOrders
