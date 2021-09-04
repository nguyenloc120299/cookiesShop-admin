import axios from 'axios'
import React, { useContext, useState } from 'react'
import Search from '../../component/search/Search'
import HeaderTitle from '../../component/view/HeaderTitle'
import Pagination from '../../component/view/Pagination'
import { GlobalContext } from '../../GlobalContext'
import ModalProduct from './ModalProduct'
import ButtonTable from '../../component/view/ButtonTable'
const Product = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const context = useContext(GlobalContext)
    const [products] = context.productsApi.products
    const [categories] = context.categoriesApi.categories
    const [supliers] = context.suppliersApi.suppliers
    const totalItem = 6;
    const [callBack, setCallBack] = context.productsApi.callBack
    const pageCount = Math.ceil(products.length / totalItem);
    const [isModal, setIsModal] = useState(false)
    const [IsImgInput, setIsImgInput] = useState(false)

    const [isSave, SetIsSave] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const PageVisited = pageNumber * totalItem
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const [id_category, setId_Category] = useState('')
    const [id_supplier, setId_Supplier] = useState('')
    const [img, setImg] = useState(false)

    const handleUploadImg = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0];
            if (!file) return alert("file không tồn tại")
            if (file.type !== 'image/jpge' && file.type !== 'image/png') return alert('file không đúng định dạng')
            let formData = new FormData()
            formData.append('file', file)
            setIsLoading(true)

            const res = await axios.post('https://polar-woodland-25756.herokuapp.com/upload', formData, { headers: { 'content-type': 'multipart/form-data' } })
            setIsLoading(false)
            setImg(res.data)
        } catch (err) {

        }
    }
    const handleDestroy = async () => {

        try {
            setIsLoading(true)
            await axios.post('https://polar-woodland-25756.herokuapp.com/destroy', { public_id: img.public_id })
            setIsLoading(false)
            setImg(false)
        } catch (err) {
            return err.response.data.msg
        }
    }
    const removeAccents = (str) => {
        let AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ];
        for (let i = 0; i < AccentsMap.length; i++) {
            let re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            let char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    }
    const [productValue, setProductValue] = useState({
        name: '',
        code: '',
        sort_description: '',
        detail_description: '',
        price: '',
        avartar: '',
        quantity: ''

    })
    const onChangeInput = e => {
        const { name, value } = e.target
        setProductValue({ ...productValue, [name]: value })
    }
    const onChaneShowMoDal = (type, id) => {
        if (type === 'add') {
            setProductValue({
                name: '',
                code: '',
                sort_description: '',
                detail_description: '',
                price: '',
                avartar: '',
                quantity: ''
            })
            SetIsSave(true)
            setIsModal(!isModal)
            setIsEdit(false)
            setImg(false)

        } else if (type === 'edit') {
            setProductValue({
                name: '',
                code: '',
                sort_description: '',
                detail_description: '',
                price: '',
                avartar: '',
                quantity: ''

            })

            setIsEdit(true)
            setIsModal(!isModal)
            SetIsSave(false)
            setImg(false)
            products.forEach(product => {
                if (product.id === id) {

                    setProductValue({ ...product })
                    setIsImgInput(product.avartar)
                }
            });

        }

    }
    const onCloseModal = () => {
        setIsModal(false)
    }
    const [alert, setAlert] = useState({
        isShow: false,
        type: '',
        msg: ''


    })
    const ShowAlert = (isShow, type, msg) => {
        setAlert({
            isShow: isShow,
            type: type,
            msg: msg
        })
    }
    const dislayTable = products.slice(PageVisited, totalItem + PageVisited).map(item => (

        <tr key={item.id}>
            <td >{item.id}</td>
            <td ><img src={item.avartar} alt='' style={{

                width: '160px',
                height: '80px',
                objectFit: 'cover'
            }} /></td>
            <td >{item.name}</td>
            <td>{item.code}</td>
            <td>{item.sort_description}</td>
            <td>{item.detail_description}</td>
            <td style={item.ban_nhanh === 0 ? { color: 'green' } : { display: 'red' }}>{item.ban_nhanh === 1 ? 'Bán nhanh' : " Bán chậm"}</td>
            <td>{item.price}</td>
            <td>{item.competitive_price}</td>

            <td>{item.date_sale}</td>
            <td>{item.quantity}</td>
            <td><button className='button__status' style={item.featured === 1 ? { color: 'green' } : { color: 'red' }}>{item.featured === 1 ? 'Có' : 'Không'}</button></td>
            <td><button className='button__status'
                style={item.status === 1 ? { color: 'green' } : { color: 'red' }}
                onClick={() => onChangeSatus(item.id)}>
                {item.status === 1 ? 'Đăng' : 'Chưa đăng'}
            </button></td>
            <ButtonTable item={item} onChaneShowMoDal={onChaneShowMoDal} />
        </tr>

    ))

    const onChangeSatus = async (id) => {
        setId_Supplier('')
        setId_Category('')
        products.forEach(product => {
            if (product.id === id) {
                setProductValue({ ...product })

            }


        });

        categories.forEach(i => {

            i.products.forEach(element => {
                if (element.id === id) setId_Category(i.id)
            });

        });
        supliers.forEach(i => {

            i.products.forEach(element => {
                if (element.id === id) setId_Supplier(i.id)
            });

        });

        setIsLoading(true)
        if (productValue.status === 0) {
            await axios.put(`/products/categories/${id_category}/suppliers/${id_supplier}/users/1  `, {
                ...productValue,

                status: 1,


            })
        } else {
            await axios.put(`/products/categories/${id_category}/suppliers/${id_supplier}/users/1  `, {
                ...productValue,

                status: 0,


            })
        }
        setIsLoading(false)
        setCallBack(!callBack)
        setIsModal(false)
        ShowAlert(true, 'success', 'Thành công')
    }
    const onSubmit = async (id) => {
        try {
            //console.log(teacherValue)
            if (isSave) {
                setIsLoading(true)

                console.log({ ...productValue, avartar: img.url });
                await axios.post(`/products/categories/${productValue.category}/suppliers/${productValue.supplier}/users/1`, {
                    ...productValue,
                    avartar: img.url,
                    featured: 0,
                    status: 0,
                    ban_nhanh: 0,
                    competitive_price: 0,
                    date_sale: new Date()

                })
                setIsLoading(false)
                setCallBack(!callBack)
                setIsModal(false)
                ShowAlert(true, 'success', 'Thành công')
            }
            if (isEdit) {
                setIsLoading(true)
                let id_category, id_supplier;
                categories.forEach(i => {

                    i.products.forEach(element => {
                        if (element.id === id) id_category = i.id
                    });

                });
                supliers.forEach(i => {

                    i.products.forEach(element => {
                        if (element.id === id) id_supplier = i.id
                    });

                });
                //  console.log(id_category, id_supplier)
                setIsLoading(true)
                if (IsImgInput) await axios.put(`/products/categories/${id_category}/suppliers/${id_supplier}/users/1  `, {
                    ...productValue
                })
                else
                    await await axios.put(`/products/categories/${id_category}/suppliers/${id_supplier}/users/1  `, {
                        ...productValue,

                        avartar: img.url,


                    })

                setIsLoading(false)
                setCallBack(!callBack)
                setIsModal(false)
                ShowAlert(true, 'success', 'Thành công')
                setIsImgInput(false)
            }

        } catch (err) {
            ShowAlert(true, 'danger', err.response.data.msg)
            setIsLoading(false)
        }


    }
    const onDelete = async (id) => {
        try {
            setIsLoading(true)
            // console.log(id)
            await axios.delete(`/products/${id}`)
            setIsLoading(false)
            setCallBack(!callBack)
            setIsModal(false)
            ShowAlert(true, 'success', "Đã xóa thành công")
        } catch (err) {
            ShowAlert(true, 'danger', err.response.data.msg)
            setIsLoading(false)
        }

    }
    const handleCloseImgaeInput = () => {
        setIsImgInput(!IsImgInput)

    }
    return (
        <>
            <>

                <div className='container'>
                    {/* {alert.isShow && <Alert {...alert} showAlert={ShowAlert} />} */}
                    <HeaderTitle title='sản phẩm' onChaneShowMoDal={onChaneShowMoDal} />
                    <ModalProduct
                        isModal={isModal}
                        isEdit={isEdit}
                        isSave={isSave}
                        img={img}
                        onCloseModal={onCloseModal}
                        handleUpLoad={handleUploadImg}
                        handleDestroy={handleDestroy}
                        onChangeInput={onChangeInput}
                        onSubmit={onSubmit}
                        value={productValue}
                        isLoading={isLoading}
                        onDelete={onDelete}
                        IsImgInput={IsImgInput}
                    />
                    <Search />
                    <div className='row'>
                        <table className='table-hover table'>

                            <thead >
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Ảnh</th>
                                    <th scope='col'>Tên sản phẩm</th>
                                    <th scope='col'>Code</th>
                                    <th scope='col' >Mô tả</th>
                                    <th scope='col'>Chi tiết</th>
                                    <th scope='col'>Bán nhanh</th>
                                    <th scope='col'>Giá</th>
                                    <th scope='col'>Giá giảm</th>
                                    <th scope='col'>Ngày nhập</th>
                                    <th scope='col'>Số lượng</th>
                                    <th scope='col'>Nổi bật</th>
                                    <th scope='col'>Trang thái</th>
                                    <th scope='col'></th>
                                    <th scope='col'></th>

                                </tr>

                            </thead>
                            <tbody className='mt-4'>
                                {dislayTable}

                            </tbody>
                        </table>

                    </div>
                    <div className='row'>
                        <Pagination pageCount={pageCount} changePage={changePage} />
                    </div>
                </div>
            </>
        </>
    )
}

export default Product
