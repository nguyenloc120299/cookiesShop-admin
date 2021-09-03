import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Categories from './categories/Categories'
import Supplier from './suplier/Supplier'
import Product from './product/Product'

const ProductManager = () => {
    return (
        <div className='mt-5'>
            <Tabs defaultActiveKey="home" className="mb-3">
                <Tab eventKey="home" title="Quản lý sản phẩm">
                    <Product />
                </Tab>
                <Tab eventKey="loaiSP" title="Quản lý loại sản phẩm">
                    <Categories />
                </Tab>
                <Tab eventKey="nhaCC" title="Quản lý nhà cung cấp">
                    <Supplier />
                </Tab>
            </Tabs>
        </div>
    )
}

export default ProductManager
