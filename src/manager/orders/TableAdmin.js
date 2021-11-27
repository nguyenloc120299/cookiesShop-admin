import React from 'react'

const TableAdmin = ({ displayOrder }) => {
    return (
        <div className='row mt-3'>
            <table className='table-hover table'>

                <thead >

                    <tr>
                        <th scope="col">#</th>


                        <th scope="col">Hình thức</th>

                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Tên người đặt</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ghi chú</th>
                        <th scope="col">Số lượng đặt</th>
                        <th scope="col">Chi tiết</th>
                    </tr>





                </thead>
                <tbody className='mt-4'>
                    {displayOrder}
                </tbody>
            </table>


        </div>
    )
}

export default TableAdmin