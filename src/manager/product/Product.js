import React, { useContext, useState, useEffect } from 'react'
import Search from '../../component/search/Search'
import { imageUpload } from '../../valid/uploadImage'
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
import { BsImageFill, BiSearch } from 'react-icons/all'
import ImageModal from './ImageModal'
import './product.css'
import Loading from '../../valid/Loading'
import { apiInstance } from '../../baseApi'
function isNumeric(value) {
    return /^\d+$/.test(value);
}
const Product = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const context = useContext(GlobalContext)
    const [users] = context.usersApi.users
    const [id_user, setId_user] = useState('')
    const [products, setProducts] = context.productsApi.products
    const [categories] = context.categoriesApi.categories
    const [supliers] = context.suppliersApi.suppliers
    const totalItem = 6;
    const [callBack, setCallBack] = context.productsApi.callBack
    const pageCount = Math.ceil(products.length / totalItem);
    const [isModal, setIsModal] = useState(false)
    const [IsImgInput, setIsImgInput] = useState(false)
    const [imgEdit, setImgEdit] = useState(false)
    const [img1, img2] = useState(false)
    const [isSave, SetIsSave] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const PageVisited = pageNumber * totalItem
    const [listPicture, setListPicture] = useState([])
    const [isMore, setIsMore] = useState(false)
    const [errLog, setErrLog] = useState('')
    const [valueSearch, setValueSearch] = useState('')
    const handleOnChangeSearch = async (e) => {
        const value = e.target.value
        const res = await apiInstance.post('/products/searchtext', {
            searchtext: value
        })
        if (res && res.data)
            setProducts(res.data)
    }
    // const [isImgInput, setIsImgInput] = useState(false)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const [id_category, setId_Category] = useState('')
    const [id_supplier, setId_Supplier] = useState('')
    const [img, setImg] = useState(false)
    const [imgArr, setImgArr] = useState(false)
    const [isShowListPicture, setisShowListPicture] = useState(false)
    const res = JSON.parse(localStorage.getItem('login_admin'))
    const handleUploadImg = async e => {

        if (isSave) {
            const files = [...e.target.files];
            if (files.length < 2) return swal("", "Th??m nhi???u h??n 2 ???nh", "warning")
            if (files.length > 4) return swal("", "Ch??? ???????c th??m ??t nh???t 4 ???nh", "warning");

            files.forEach(async file => {


                if (!file) return alert("file kh??ng t???n t???i")
                if (file.type !== 'image/jpg' && file.type !== 'image/png') return swal("", "File kh??ng ????ng ?????nh d???ng", "warning")

            })
            setImg(files)
        }
        if (isEdit) {
            const file = e.target.files[0];
            if (!file) return swal('File kh??ng ????ng ?????nh d???ng', '', 'warning')
            if (file.type !== 'image/jpg' && file.type !== 'image/png') return swal('file kh??ng ????ng ?????nh d???ng', '', 'warning')
            setImg(file)


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
            await apiInstance.post('https://polar-woodland-25756.herokuapp.com/destroy', { public_id: item.public_id })
            setIsLoading(false)
            setImg(false)
        } catch (err) {
            console.log(err);
        }
    }
    // const removeAccents = (str) => {
    //     let AccentsMap = [
    //         "a??????????????????????????????????????????????",
    //         "A??????????????????????????????????????????????",
    //         "d??", "D??",
    //         "e??????????????????????????????",
    //         "E??????????????????????????????",
    //         "i????????????",
    //         "I????????????",
    //         "o??????????????????????????????????????????????",
    //         "O??????????????????????????????????????????????",
    //         "u?????????????????????????????",
    //         "U?????????????????????????????",
    //         "y??????????????",
    //         "Y??????????????"
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
        price: 0,
        avartar: '',
        quantity: ''

    })
    const checkValue = ({
        code,
        price,
        quantity }) => {
        const err = {}
        if (code.length > 7) err.code = 'Code nh??? h??n 7 k?? t???'
        if (!isNumeric(price)) err.price = 'Gi?? ti???n l?? s???'
        if (!isNumeric(quantity)) err.quantity = 'S??? l?????ng l?? s???'
        return {
            errMsg: err,
            errLength: Object.keys(err).length
        }
    }
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
                    status: element.status,
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
                        code: product.code,
                        sort_description: product.sort_description,
                        detail_description: product.detail_description,
                        price: product.price,
                        avartar: product.avartar,
                        date_sale: product.date_sale,
                        quantity: product.quantity,
                        promotion: product.promotion,
                        status: product.status,
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
    // const [alert, setAlert] = useState({
    //     isShow: false,
    //     type: '',
    //     msg: ''


    // })
    // const ShowAlert = (isShow, type, msg) => {
    //     setAlert({
    //         isShow: isShow,
    //         type: type,
    //         msg: msg
    //     })
    // }
    const dislayTable = products.slice(PageVisited, totalItem + PageVisited).map(item => (

        <tr key={item.id}>
            <td >
                <div>{item.name}</div>
                <img src={item.avartar} alt='' style={{

                    width: '150px',
                    height: '150px',
                    objectFit: 'cover'
                }} />



            </td>

            <td>{item.code}</td>
            <td style={{
                minWidth: '10rem'
            }}>{item.sort_description}</td>
            <td style={{
                minWidth: '12rem'
            }}>{item.detail_description.length < 150 ? item.detail_description : `
                ${item.detail_description.slice(0, isMore ? 500 : 150)} `}<a href='#'
                    onClick={() => setIsMore(!isMore)}
                >{item.detail_description.length > 150 && (isMore ? 'Thu g???n' : '...Xem th??m')}</a></td>
            <td>{item.ban_nhanh}</td>
            <td>{(item.price).toLocaleString()}</td>
            {/* <td>{(item.competitive_price).toLocaleString()}</td> */}

            <td>{new Date(item.date_sale).toLocaleDateString()}</td>
            <td>{(item.quantity).toLocaleString()}</td>
            <td>{item.promotion} %</td>
            {
                !(res.token && res.roles[0].authority === 'Admin') &&
                <td style={item.status === 0 ? { color: 'red', fontWeight: 'bold' }
                    : { color: 'green', fontWeight: 'bold' }
                }>
                    {item.status === 0 ? 'Ch??a duy???t' : '???? duy???t'}
                </td>
            }
            {
                (res.token && res.roles[0].authority === 'Admin') && <>

                    <td><button className={item.featured === 1 ? 'btn btn-outline-success' : 'btn btn-outline-danger'}

                        onClick={() => onChangeSatus(item.id, 'featured')}
                    >{item.featured === 1 ? <BsFillCursorFill /> : <BsFillXSquareFill />}</button></td>
                    <td><button className={item.status === 1 ? 'btn btn-outline-success' : 'btn btn-outline-danger'}

                        onClick={() => onChangeSatus(item.id, 'status')}>
                        {item.status === 1 ? <ImCheckmark /> : <MdCancel />}
                    </button></td>
                </>
            }
            <ButtonTable item={item} onChaneShowMoDal={onChaneShowMoDal} />
            <td><button className='btn-detail-2'><BsImageFill style={{
                fontSize: '22px'
            }} onClick={() => showListPicture(item.id)} /></button></td>
        </tr >

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
                await apiInstance.post(`/status/products/${producta.id}/type/${1}`)
            }
            if (producta.status === 1) {
                await apiInstance.post(`/status/products/${producta.id}/type/${0}`)
            }
        }
        if (type === 'featured') {
            if (producta.featured === 0) {
                await apiInstance.post(`/featured/products/${producta.id}/type/${1}`)
            }
            if (producta.featured === 1) {
                await apiInstance.post(`/featured/products/${producta.id}/type/${0}`)
            }
        }

        setIsLoading(false)
        setCallBack(!callBack)
        // setIsModal(false)
        swal("Thay ?????i th??nh c??ng!", "", "success");
    }
    const onSubmit = async (id) => {
        try {
            //console.log(teacherValue)
            const check = checkValue(productValue)
            if (check.errLength > 0) return setErrLog(check.errMsg)
            else {
                if (isSave) {
                    setIsLoading(true)
                    let media
                    let files = []
                    console.log(img);
                    media = await imageUpload(img)
                    // console.log(img);
                    media.forEach(element => {
                        files.push({
                            file: element.url
                        })
                    });
                    // console.log(files);
                    await apiInstance.post(`/products`, {
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

                    })


                    setIsLoading(false)
                    setCallBack(!callBack)
                    setIsModal(false)
                    setImg(false)
                    swal("Thay ?????i th??nh c??ng!", "", "success");
                }
                if (isEdit) {
                    // console.log(IsImgInput);
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

                    setIsLoading(true)
                    if (!img)

                        await apiInstance.put(`/products`, {
                            ...productValue,
                            userId: res.id,
                            categoriesId: id_category,
                            suppliersId: id_supplier,
                        })

                    else {
                        let media

                        media = await imageUpload([img])

                        // img && img.slice(1, 5).forEach(element => {
                        //     files.push({
                        //         file: element.url
                        //     })
                        // });
                        await apiInstance.put(`/products`, {
                            ...productValue,

                            avartar: media[0].url,
                            userId: res.id,
                            categoriesId: id_category,
                            suppliersId: id_supplier,

                        })
                    }

                    setIsLoading(false)
                    setCallBack(!callBack)
                    setIsModal(false)
                    swal("Thay ?????i th??nh c??ng!", "", "success");
                    setIsImgInput(false)
                    setImg(false)
                }
            }
            setErrLog('')

        } catch (err) {
            //     ShowAlert(true, 'danger', err.response.data.msg)
            swal('C?? l???i x???y ra vui l??ng th??? l???i', '', 'error');
            setIsLoading(false)
        }


    }
    const onDelete = async (id) => {
        try {

            // console.log(id)
            // swal({
            //     title: " B???n c?? ch???c kh??ng? ",

            //     icon: "warning",
            //     buttons: true,
            //     dangerMode: true,
            // })
            //     .then(async (willDelete) => {
            //         if (willDelete) {
            setIsLoading(true)
            await apiInstance.delete(`/products/${id}`)
            setIsLoading(false)
            setCallBack(!callBack)
            setIsModal(false)
            // swal(" B???n ???? x??a s???n ph???m n??y ", {
            //     icon: "success",
            //     });
            // }

            // });



        } catch (err) {
            setIsLoading(false)
            console.log(err);
            // ShowAlert(true, 'danger', err.response.data.msg)
            // setIsLoading(false)
            swal(`${err.response.data.message}`, '', 'error')
        }

    }
    const handleCloseImgaeInput = () => {
        setIsImgInput(!IsImgInput)

    }
    // console.log(imgArr);

    const handleOnChangeCate = async (e) => {
        const id = e.target.value
        const res = await apiInstance.get(`/products/categories/${id}`)
        if (res && res.data) setProducts(res.data)
    }

    const handleOnChangeStatus = async (e) => {
        const id = e.target.value
        const res = await apiInstance.get(`/products/status/${id}`)
        if (res && res.data) setProducts(res.data)
    }

    const handleFilterProducts = async (e) => {
        const id = e.target.value
        if (id === '0') {

            const res = await apiInstance.get('/products/sellfast')
            if (res && res.data) setProducts(res.data)
        }
        if (id === '1') {
            const res = await apiInstance.get('/products/reduced')
            if (res && res.data) setProducts(res.data)
        }
        if (id === '2') {
            const res = await apiInstance.get('/products/increase')
            if (res && res.data) setProducts(res.data)
        }
        if (id === '3') {
            const res = await apiInstance.get('/products')
            if (res && res.data) setProducts(res.data)
        }

    }
    const handleProductTrongKho = async (e) => {
        const id = e.target.value
        if (id === '0') {
            const res1 = await apiInstance.get(`/products/product-inventory/users/${res.id}`)

            if (res1 && res1.data) setProducts(res1.data)
        }
        if (id === '1') {
            const res1 = await apiInstance.get(`/products/product-sold/users/${res.id}`)

            if (res1 && res1.data) setProducts(res1.data)
        }
    }
    return (
        <>


            <div className='m-3'>

                <HeaderTitle title='s???n ph???m' onChaneShowMoDal={onChaneShowMoDal} />
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>
                            <div className='d-flex justify-content-around'>
                                <div className='my-3 w-100 mr-2'>
                                    <label>Lo???i s???n ph???m</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={handleOnChangeCate}
                                    >
                                        <option selected>Ch???n lo???i s???n ph???m</option>
                                        {
                                            categories.map(item => (

                                                <option value={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='my-3 w-100 mr-2'>
                                    <label>S???n ph???m trong kho</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={handleProductTrongKho}
                                    >
                                        <option selected>Ch???n</option>
                                        <option value={0}>S???n ph???m t???n kho</option>
                                        <option value={1}>???? b??n h???t</option>
                                    </select>
                                </div>
                                {/* <div className='my-3 w-100 mr-2'>
                                    <label>Lo???i s???n ph???m</label>
                                    <select className="form-select" aria-label="Default select example">


                                        <option value={0}>S???n ph???m t???n kho</option>
                                        <option value={1}>S???n ph???m ???? b??n h???t</option>
                                    </select>
                                </div> */}
                                <div className='my-3 w-100 mr-2'>
                                    <label>Tr???ng th??i s???n ph???m</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={handleOnChangeStatus}
                                    >
                                        <option selected>Ch???n tr???ng th??i s???n ph???m</option>

                                        <option value={1}>???? duy???t</option>
                                        <option value={0}>Ch??a duy???t</option>
                                    </select>
                                </div>
                                <div className='my-3 w-100 mr-2'>
                                    <label>L???c s???n ph???m</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={handleFilterProducts}
                                    >
                                        <option selected>Ch???n l???c s???n ph???m</option>
                                        {/* <option value={0}>M???i nh???t</option> */}
                                        <option value={'3'}>T???t c???</option>
                                        <option value={'0'}>B??n ch???y</option>

                                        <option value={'1'}>Gi?? t??? cao ?????n th???p</option>
                                        <option value={'2'}>Gi?? t??? th???p ?????n cao</option>
                                    </select>
                                </div>
                                <div className='my-3 w-100'>
                                    <label>T??m ki???m</label>
                                    <form className="d-flex align-items-center position-relative">
                                        <input className="form-control me-2" type="search" aria-label="Search" placeholder='T??m'
                                            onChange={handleOnChangeSearch}
                                        />
                                        {/* <button className="btn btn-outline-success" type="submit">T??m</button> */}

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading && <Loading />}
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
                    errLog={errLog}
                />
                {
                    isShowListPicture && <ImageModal
                        setisShowListPicture={setisShowListPicture}
                        listPicture={listPicture}
                        setListPicture={setListPicture}
                        value={productValue}
                    />
                }

                <div className='row'>
                    <table className='table-hover table'>

                        <thead >
                            <tr>

                                <th scope='col'>???nh</th>
                                <th scope='col'>Code</th>
                                <th scope='col' >M?? t???</th>
                                <th scope='col'>Chi ti???t</th>
                                <th scope='col'>???? b??n</th>
                                <th scope='col'>Gi??</th>
                                {/* <th scope='col'>Gi?? gi???m</th> */}
                                <th scope='col'>Ng??y nh???p</th>
                                <th scope='col'>S??? l?????ng</th>
                                <th scope='col'>Khuy???n m??i</th>
                                {
                                    (res.token && res.roles[0].authority === 'Admin') && <>
                                        <th scope='col'>N???i b???t</th>
                                        <th scope='col'>Trang th??i</th>
                                    </>
                                }
                                {
                                    !(res.token && res.roles[0].authority === 'Admin') &&
                                    <th scope='col'>Tr???ng th??i</th>
                                }

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
