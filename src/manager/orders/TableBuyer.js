import React from 'react'

const TableBuyer = ({ displayOrder }) => {
    return (
        <div className='row mt-3'>
            <table className='table-hover table'>

                <thead >

                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sản phẩm</th>

                        <th scope="col">Số lượng sản phẩm</th>

                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thao tác</th>

                    </tr>





                </thead>
                <tbody className='mt-4'>
                    {displayOrder}
                </tbody>
            </table>


        </div>
    )
}

export default TableBuyer
