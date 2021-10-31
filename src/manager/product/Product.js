import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import Search from '../../component/search/Search'
import HeaderTitle from '../../component/view/HeaderTitle'
import Pagination from '../../component/view/Pagination'
import { GlobalContext } from '../../GlobalContext'
import ModalProduct from './ModalProduct'
import ButtonTable from '../../component/view/ButtonTable'
import { ImCheckmark } from 'react-icons/im'
import { MdCancel } from 'react-icons/md'
import { BsFillCursorFill } from 'react-icons/bs'
import { BsFillXSquareFill } from "react-icons/bs";
import Alert from '../../component/untill/Alert'
import swal from 'sweetalert';
import { BsImageFill } from 'react-icons/all'
import ImageModal from './ImageModal'
import './product.css'
const Product = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const context = useContext(GlobalContext)
    const [users] = context.usersApi.users
    const [id_user, setId_user] = useState('')
    const [products] = context.productsApi.products
    const [categories] = context.categoriesApi.categories
    const [supliers] = context.suppliersApi.suppliers
    const totalItem = 6;
    const [callBack, setCallBack] = context.productsApi.callBack
    const pageCount = Math.ceil(products.length / totalItem);
    const [isModal, setIsModal] = useState(false)
    const [IsImgInput, setIsImgInput] = useState(false)
    const [img1, img2] = useState(false)
    const [isSave, SetIsSave] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const PageVisited = pageNumber * totalItem
    const [listPicture, setListPicture] = useState([])
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const [id_category, setId_Category] = useState('')
    const [id_supplier, setId_Supplier] = useState('')
    const [img, setImg] = useState(false)
    const [imgArr, setImgArr] = useState([])
    const [isShowListPicture, setisShowListPicture] = useState(false)
    const res = JSON.parse(localStorage.getItem('login_admin'))
    const handleUploadImg = async e => {
        e.preventDefault()
        try {
            const files = [...e.target.files];
            let newImage = []
            let newImageURL = []
            if (files.length > 4) return swal("", "Chỉ được thêm ít nhất 4 ảnh", "warning");
            files.forEach(async file => {


                if (!file) return alert("file không tồn tại")
                if (file.type !== 'image/jpge' && file.type !== 'image/png') return alert('file không đúng định dạng')
                newImageURL.push(file)
                let formData = new FormData()
                formData.append('file', file)
                setIsLoading(true)

                const res = await axios.post('https://polar-woodland-25756.herokuapp.com/upload', formData, { headers: { 'content-type': 'multipart/form-data' } })
                setIsLoading(false)
                //console.log(res.data);

                if (res && res.data) newImage.push({ ...res.data })

                //setImg(res.data)
                //console.log(newImage);
            });
            setImg(newImage)
            //  console.log('aaaaaaa', ...newImageURL);
            setImgArr([...imgArr, ...newImageURL])
        } catch (err) {

        }
    }

    const deleteImages = (index) => {
        const newArr = [...imgArr]
        newArr.splice(index, 1)
        setImgArr(newArr)
    }
    const handleDestroy = async (item) => {

        try {
            setIsLoading(true)
            await axios.post('https://polar-woodland-25756.herokuapp.com/destroy', { public_id: item.public_id })
            setIsLoading(false)
            setImg(false)
        } catch (err) {
            console.log(err);
        }
    }
    // const removeAccents = (str) => {
    //     let AccentsMap = [
    //         "aàảãáạăằẳẵắặâầẩẫấậ",
    //         "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    //         "dđ", "DĐ",
    //         "eèẻẽéẹêềểễếệ",
    //         "EÈẺẼÉẸÊỀỂỄẾỆ",
    //         "iìỉĩíị",
    //         "IÌỈĨÍỊ",
    //         "oòỏõóọôồổỗốộơờởỡớợ",
    //         "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    //         "uùủũúụưừửữứự",
    //         "UÙỦŨÚỤƯỪỬỮỨỰ",
    //         "yỳỷỹýỵ",
    //         "YỲỶỸÝỴ"
    //     ];
    //     for (let i = 0; i < AccentsMap.length; i++) {
    //         let re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    //         let char = AccentsMap[i][0];
    //         str = str.replace(re, char);
    //     }
    //     return str;
    // }
    const [productValue, setProductValue] = useState({
        name: '',
        code: '',
        sort_description: '',
        detail_description: '',
        price: '',
        avartar: '',
        quantity: ''

    })

    const showListPicture = (id) => {
        setisShowListPicture(!isShowListPicture)
        products.forEach(element => {
            if (element.id === id) {
                setProductValue({

                    id: element.id,
                    name: element.name,
                    code: element.name,
                    sort_description: element.sort_description,
                    detail_description: element.detail_description,
                    price: element.price,
                    avartar: element.avartar,
                    date_sale: element.date_sale,
                    quantity: element.quantity,
                    promotion: element.promotion,
                    listpictureProductDTOs: element.listPictureproduct
                })
                setListPicture(element.listPictureproduct)

            }
        });
    }
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
                quantity: '',
                promotion: ''

            })

            setIsEdit(true)
            setIsModal(!isModal)
            SetIsSave(false)
            setImg(false)
            products.forEach(product => {
                if (product.id === id) {

                    setProductValue({

                        id: product.id,
                        name: product.name,
                        code: product.name,
                        sort_description: product.sort_description,
                        detail_description: product.detail_description,
                        price: product.price,
                        avartar: product.avartar,
                        date_sale: product.date_sale,
                        quantity: product.quantity,
                        promotion: product.promotion,

                        listpictureProductDTOs: product.listPictureproduct
                    })
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

                width: '100px',
                height: '150px',
                objectFit: 'cover'
            }} />



            </td>
            <td >{item.name}</td>
            <td>{item.code}</td>
            <td>{item.sort_description}</td>
            <td>{item.detail_description}</td>
            <td>{item.ban_nhanh}</td>
            <td>{item.price}</td>
            <td>{item.competitive_price}</td>

            <td>{item.date_sale}</td>
            <td>{item.quantity}</td>
            <td>{item.promotion}</td>
            <td><button className={item.featured === 1 ? 'btn btn-outline-success' : 'btn btn-outline-danger'}

                onClick={() => onChangeSatus(item.id, 'featured')}
            >{item.featured === 1 ? <BsFillCursorFill /> : <BsFillXSquareFill />}</button></td>
            <td><button className={item.status === 1 ? 'btn btn-outline-success' : 'btn btn-outline-danger'}

                onClick={() => onChangeSatus(item.id, 'status')}>
                {item.status === 1 ? <ImCheckmark /> : <MdCancel />}
            </button></td>
            <ButtonTable item={item} onChaneShowMoDal={onChaneShowMoDal} />
            <td><button className='btn-detail-2'><BsImageFill style={{
                fontSize: '22px'
            }} onClick={() => showListPicture(item.id)} /></button></td>
        </tr>

    ))
    useEffect(() => {

    }, [users])
    const onChangeSatus = async (id, type) => {

        let producta = {}
        products.forEach(product => {
            if (product.id === id) {
                //      setProductValue({ ...product })
                producta = product

            }


        });
        users && users.forEach(element => {
            element.products.forEach(element1 => {
                if (element1.id === id) setId_user(element.id);
            });
        });
        categories && categories.forEach(i => {

            i.products.forEach(element => {
                if (element.id === id) setId_Category(i.id)
            });

        });
        supliers && supliers.forEach(i => {

            i.products.forEach(element => {
                if (element.id === id) setId_Supplier(i.id)
            });

        });

        setIsLoading(true)
        if (type === 'status') {
            if (producta.status === 0) {
                await axios.put(`/products/categories/${id_category}/suppliers/${id_supplier}/users/${id_user}  `, {
                    ...producta,
                    status: 1,
                })
            }
            if (producta.status === 1) {
                await axios.put(`/products/categories/${id_category}/suppliers/${id_supplier}/users/${id_user}   `, {
                    ...producta,

                    status: 0,


                })
            }
        }
        if (type === 'featured') {
            if (producta.featured === 0) {
                await axios.put(`/products/categories/${id_category}/suppliers/${id_supplier}/users/${id_user}   `, {
                    ...producta,
                    featured: 1,
                })
            }
            if (producta.featured === 1) {
                await axios.put(`/products/categories/${id_category}/suppliers/${id_supplier}/users/${id_user}  `, {
                    ...producta,

                    featured: 0,


                })
            }
        }

        setIsLoading(false)
        setCallBack(!callBack)
        // setIsModal(false)
        swal("Thay đổi thành công!", "", "success");
    }
    const onSubmit = async (id) => {
        try {
            //console.log(teacherValue)
            if (isSave) {
                setIsLoading(true)
                let files = []
                // console.log(img);
                img && img.forEach(element => {
                    files.push({
                        file: element.url
                    })
                });
                // console.log(files);
                await axios.post(`/products`, {
                    name: productValue.name,
                    code: productValue.code,
                    sort_description: productValue.sort_description,
                    detail_description: productValue.detail_description,
                    price: productValue.price,
                    quantity: productValue.quantity,
                    userId: res.id,
                    categoriesId: productValue.category,
                    suppliersId: productValue.supplier,
                    listpictureProductDTOs: files
                }
                )
                // })


                setIsLoading(false)
                setCallBack(!callBack)
                setIsModal(false)
                swal("Thay đổi thành công!", "", "success");
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
                //  console.log(supliers);
                //   console.log(id_category, id_supplier)
                setIsLoading(true)
                if (IsImgInput)

                    await axios.put(`/products`, {

                        ...productValue,
                        userId: res.id,
                        categoriesId: id_category,
                        suppliersId: id_supplier,


                    })
                else {

                    //  let files = []
                    // console.log(img);
                    // img && img.slice(1, 5).forEach(element => {
                    //     files.push({
                    //         file: element.url
                    //     })
                    // });
                    await axios.put(`/products`, {
                        ...productValue,

                        avartar: img[0].url,
                        // listpictureProductDTOs:file
                        userId: res.id,
                        categoriesId: id_category,
                        suppliersId: id_supplier,

                    })
                }

                setIsLoading(false)
                setCallBack(!callBack)
                setIsModal(false)
                swal("Thay đổi thành công!", "", "success");
                setIsImgInput(false)
            }

        } catch (err) {
            //     ShowAlert(true, 'danger', err.response.data.msg)
            console.log(err);
            setIsLoading(false)
        }


    }
    const onDelete = async (id) => {
        try {
            setIsLoading(true)
            // console.log(id)
            swal({
                title: " Bạn có chắc không? ",

                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        await axios.delete(`/products/${id}`)
                        setIsLoading(false)
                        setCallBack(!callBack)
                        setIsModal(false)
                        swal(" Bạn đã xóa sản phẩm khỏi giỏi hàng ", {
                            icon: "success",
                        });
                    }
                });


        } catch (err) {
            console.log(err);
            // ShowAlert(true, 'danger', err.response.data.msg)
            setIsLoading(false)
        }

    }
    const handleCloseImgaeInput = () => {
        setIsImgInput(!IsImgInput)

    }
    // console.log(imgArr);
    return (
        <>


            <div className='m-3'>
                {alert.isShow && <Alert {...alert} showAlert={ShowAlert} />}
                <HeaderTitle title='sản phẩm' onChaneShowMoDal={onChaneShowMoDal} />

                <ModalProduct
                    isModal={isModal}
                    isEdit={isEdit}
                    isSave={isSave}
                    img={img}
                    img1={img1}
                    onCloseModal={onCloseModal}
                    handleUpLoad={handleUploadImg}
                    handleDestroy={handleDestroy}
                    onChangeInput={onChangeInput}
                    onSubmit={onSubmit}
                    value={productValue}
                    isLoading={isLoading}
                    onDelete={onDelete}
                    IsImgInput={IsImgInput}
                    closeImage={handleCloseImgaeInput}
                    imgArr={imgArr}
                    deleteImages={deleteImages}
                />
                {
                    isShowListPicture && <ImageModal
                        setisShowListPicture={setisShowListPicture}
                        listPicture={listPicture}
                        setListPicture={setListPicture}
                        value={productValue}
                    />
                }
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
                                <th scope='col'>Đã bán</th>
                                <th scope='col'>Giá</th>
                                <th scope='col'>Giá giảm</th>
                                <th scope='col'>Ngày nhập</th>
                                <th scope='col'>Số lượng</th>
                                <th scope='col'>Khuyến mãi</th>
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
    )
}

export default Product
