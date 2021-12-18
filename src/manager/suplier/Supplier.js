
import React, { useContext, useState } from 'react'
import Search from '../../component/search/Search'
import ButtonTable from '../../component/view/ButtonTable'
import HeaderTitle from '../../component/view/HeaderTitle'
import Pagination from '../../component/view/Pagination'
import { GlobalContext } from '../../GlobalContext'
import ModalSupplier from './ModalSupplier'
import { apiInstance } from '../../baseApi'
import swal from 'sweetalert'
import Loading from '../../valid/Loading'
import { imageUpload } from '../../valid/uploadImage'
const Supplier = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const context = useContext(GlobalContext)
    const totalItem = 6;
    const [supliers] = context.suppliersApi.suppliers
    const pageCount = Math.ceil(supliers.length / totalItem);
    const [isModal, setIsModal] = useState(false)
    const [IsImgInput, setIsImgInput] = useState(false)
    const [callBack, setCallBack] = context.suppliersApi.callBack
    const [isSave, SetIsSave] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const PageVisited = pageNumber * totalItem
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const [img, setImg] = useState(false)

    // const handleUploadImg = async e => {
    //     e.preventDefault()
    //     try {
    //         const file = e.target.files[0];
    //         if (!file) return alert("file không tồn tại")
    //         if (file.type !== 'image/jpge' && file.type !== 'image/png') return alert('file không đúng định dạng')
    //         let formData = new FormData()
    //         formData.append('file', file)
    //         setIsLoading(true)

    //         const res = await apiInstance.post('https://polar-woodland-25756.herokuapp.com/upload', formData, { headers: { 'content-type': 'multipart/form-data' } })
    //         setIsLoading(false)
    //         setImg(res.data)
    //     } catch (err) {

    //     }
    // }

    const handleUploadImg = async e => {
        const file = e.target.files[0];
        if (!file) return swal('File không đúng định dạng', '', 'warning')
        if (file.type !== 'image/jpg' && file.type !== 'image/png') return swal('file không đúng định dạng', '', 'warning')
        setImg(file)
    }
    const handleDestroy = async () => {

        try {
            setIsLoading(true)
            await apiInstance.post('https://polar-woodland-25756.herokuapp.com/destroy', { public_id: img.public_id })
            setIsLoading(false)
            setImg(false)
        } catch (err) {
            console.log(err);
        }
    }
    const [supplierValue, setSuppplierValue] = useState({
        name: '',
        code: '',

        address: '',
        phone: '',
        email: ''
    })
    const onChangeInput = e => {
        const { name, value } = e.target
        setSuppplierValue({ ...supplierValue, [name]: value })
    }
    const onChaneShowMoDal = (type, id) => {
        if (type === 'add') {
            setSuppplierValue({
                name: '',
                code: '',

                address: '',
                phone: '',
                email: ''
            })
            SetIsSave(true)
            setIsModal(!isModal)
            setIsEdit(false)
            setImg(false)

        } else if (type === 'edit') {
            setSuppplierValue({
                name: '',
                code: '',

                address: '',
                phone: '',
                email: ''
            })

            setIsEdit(true)
            setIsModal(!isModal)
            SetIsSave(false)
            setImg(false)
            supliers.forEach(suplier => {
                if (suplier.id === id) {

                    setSuppplierValue({ ...suplier })
                    setIsImgInput(suplier.logo)
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
    const dislayTable = supliers.slice(PageVisited, totalItem + PageVisited).map(item => (

        <tr key={item.id}>
            <td >{item.id}</td>
            <td ><img src={item.logo} alt='' style={{

                width: '50px',
                height: '50px'
            }} /></td>
            <td >{item.name}</td>
            <td>{item.code}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.address}</td>

            <ButtonTable item={item} onChaneShowMoDal={onChaneShowMoDal} />
        </tr>

    ))
    const onSubmit = async () => {

        try {
            //console.log(teacherValue)
            if (isSave) {
                setIsLoading(true)
                let media
                media = await imageUpload([img])
                await apiInstance.post('/suppliers', { ...supplierValue, logo: media[0].url })
                setIsLoading(false)
                setCallBack(!callBack)
                setIsModal(false)
                ShowAlert(true, 'success', 'Thành công')
            }
            if (isEdit) {
                setIsLoading(true)

                if (!img) await apiInstance.put('/suppliers', { ...supplierValue })
                else {
                    let media
                    media = await imageUpload([img])

                    await apiInstance.put('/suppliers', {
                        ...supplierValue,
                        logo: media[0].url
                    })
                }
                //   console.log(teacherValue)
                setIsLoading(false)
                setCallBack(!callBack)
                setIsModal(false)

                setIsImgInput(false)
            }
            swal('Thành công !!!', '', 'success')
        } catch (err) {
            swal('Có lỗi xảy ra', 'Thử lại sau', 'error')
            setIsLoading(false)
        }


    }
    const onDelete = async (id) => {
        try {
            setIsLoading(true)
            // console.log(id)
            await apiInstance.delete(`/suppliers/${id}`)
            setIsLoading(false)
            setCallBack(!callBack)
            setIsModal(false)
            ShowAlert(true, 'success', "Đã xóa thành công")
        } catch (err) {
            swal('Có lỗi xảy ra', '', 'error')
            setIsLoading(false)
        }

    }
    const handleCloseImgaeInput = () => {
        setIsImgInput(!IsImgInput)

    }
    return (
        <>
            <div className='m-3'>
                {
                    isLoading && <Loading />
                }
                <ModalSupplier
                    isModal={isModal}
                    isEdit={isEdit}
                    isSave={isSave}

                    onCloseModal={onCloseModal}
                    onChangeInput={onChangeInput}
                    onSubmit={onSubmit}
                    value={supplierValue}
                    isLoading={isLoading}
                    img={img}
                    handleUpLoad={handleUploadImg}
                    handleDestroy={handleDestroy}
                    onDelete={onDelete}
                    IsImgInput={IsImgInput}
                    closeImage={handleCloseImgaeInput}
                />
                <HeaderTitle title='nhà cung cấp' onChaneShowMoDal={onChaneShowMoDal} />

                <div className='row m-3'>
                    <table className='table-hover table'>

                        <thead >
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col' >Logo</th>
                                <th scope='col'>Tên nhà cung cấp</th>
                                <th scope='col'>Code</th>

                                <th scope='col'>Email</th>
                                <th scope='col'>Số điện thoại</th>
                                <th scope='col' >Địa chỉ</th>
                                <th scope='col'></th>
                                <th scope='col' ></th>

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

export default Supplier
