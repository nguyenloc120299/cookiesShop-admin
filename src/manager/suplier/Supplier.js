import axios from 'axios'
import React, { useContext, useState } from 'react'
import Search from '../../component/search/Search'
import ButtonTable from '../../component/view/ButtonTable'
import HeaderTitle from '../../component/view/HeaderTitle'
import Pagination from '../../component/view/Pagination'
import { GlobalContext } from '../../GlobalContext'
import ModalSupplier from './ModalSupplier'

const Supplier = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const context = useContext(GlobalContext)
    const totalItem = 6;
    const [supliers, setSuppliers] = context.suppliersApi.suppliers
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

                //  console.log({ ...supplierValue, logo: img.url });
                await axios.post('/suppliers', { ...supplierValue, logo: img.url })
                setIsLoading(false)
                setCallBack(!callBack)
                setIsModal(false)
                ShowAlert(true, 'success', 'Thành công')
            }
            if (isEdit) {
                setIsLoading(true)
                if (IsImgInput) await axios.put('/suppliers', { ...supplierValue })
                else
                    await axios.put('/suppliers', { ...supplierValue, logo: img.url })
                //   console.log(teacherValue)
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
            await axios.delete(`/suppliers/${id}`)
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
            <div className='container'>
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
                <Search />
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
