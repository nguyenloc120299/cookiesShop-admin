import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Categories from './categories/Categories'
import Supplier from './suplier/Supplier'
import Product from './product/Product'

const ProductManager = () => {
    const res = JSON.parse(localStorage.getItem('login_admin'))
    return (
        <div className='mt-5'>
            <Tabs defaultActiveKey="home" className="mb-3 text-color-dark" >
                <Tab eventKey="home" title="Quản lý sản phẩm">
                    <Product />
                </Tab>
                {
                    (res.token && res.roles[0].authority === 'Admin') &&

                    <Tab eventKey="loaiSP" title="Quản lý loại sản phẩm">
                        <Categories />
                    </Tab>
                }
                {
                    (res.token && res.roles[0].authority === 'Admin') &&
                    <Tab eventKey="nhaCC" title="Quản lý nhà cung cấp">
                        <Supplier />
                    </Tab>
                }
            </Tabs>
        </div>
    )
}

export default ProductManager
