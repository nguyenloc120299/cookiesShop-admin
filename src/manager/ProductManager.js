import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Categories from './categories/Categories'

const ProductManager = () => {
    return (
        <div>
            <Tabs defaultActiveKey="home" className="mb-3">
                <Tab eventKey="home" title="Quản lý sản phẩm">
                    <p>Loc1</p>
                </Tab>
                <Tab eventKey="loaiSP" title="Quản lý loại sản phẩm">
                    <Categories />
                </Tab>
                <Tab eventKey="nhaCC" title="Quản lý nhà cung cấp">
                    <p>Loc3</p>
                </Tab>
            </Tabs>
        </div>
    )
}

export default ProductManager
