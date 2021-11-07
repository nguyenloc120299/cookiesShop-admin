import axios from 'axios'
import React, { useContext, useState } from 'react'
import Search from '../../component/search/Search'
import Alert from '../../component/untill/Alert'
import ButtonTable from '../../component/view/ButtonTable'
import HeaderTitle from '../../component/view/HeaderTitle'
import Pagination from '../../component/view/Pagination'
import { GlobalContext } from '../../GlobalContext'
import './categories.css'
import Modalcategories from './Modalcategories'
const Categories = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const context = useContext(GlobalContext)
    const totalItem = 10;

    const [categories, setCategories] = context.categoriesApi.categories
    const pageCount = Math.ceil(categories.length / totalItem);
    const [isModal, setIsModal] = useState(false)

    const [callBack, setCallBack] = context.categoriesApi.callBack
    const [isSave, SetIsSave] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const PageVisited = pageNumber * totalItem
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const [img, setImg] = useState(false)
    const [IsImgInput, setIsImgInput] = useState(false)
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
    const [categoriesValue, setCategoriesValue] = useState({
        name: '',
        code: '',
        totalproduct: ''
    })
    const onChangeInput = e => {
        const { name, value } = e.target
        setCategoriesValue({ ...categoriesValue, [name]: value })
    }
    const onChaneShowMoDal = (type, id) => {
        if (type === 'add') {
            setCategoriesValue({
                name: '',
                code: '',
                totalproduct: ''
            })
            SetIsSave(true)
            setIsModal(!isModal)
            setIsEdit(false)
        } else if (type === 'edit') {
            setCategoriesValue({
                name: '',
                code: '',
                totalproduct: ''
            })
            setIsEdit(true)
            setIsModal(!isModal)
            SetIsSave(false)
            categories.forEach(category => {
                if (category.id === id) setCategoriesValue({ ...category })
            });

        }

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

    const dislayTable = categories.slice(PageVisited, totalItem + PageVisited).map(item => (

        <tr key={item.id}>
            <td >{item.id}</td>
            <td >
                <img src={item.avartar} alt='' style={{

                    width: '50px',
                    height: '50px'
                }} /></td>
            <td >{item.name}</td>
            <td>{item.code}</td>
            <td>{item.totalproduct}</td>
            {/* <td><button className='btn-detail-1' onClick={() => onChaneShowMoDal('edit', item.id)}>Chỉnh sửa</button></td>
            <td><button className='btn-detail-2'>Xem sản phẩm</button></td> */}
            <ButtonTable onChaneShowMoDal={onChaneShowMoDal} item={item} />
        </tr>

    ))

    const onCloseModal = () => {
        setIsModal(false)
    }
    const onSubmit = async () => {
        try {
            //console.log(teacherValue)
            if (isSave) {
                setIsLoading(true)
                await axios.post('/categories', { ...categoriesValue, avartar: img.url })
                setIsLoading(false)
                setCallBack(!callBack)
                setIsModal(false)
                ShowAlert(true, 'success', 'Thành công')
            }
            if (isEdit) {
                setIsLoading(true)
                if (IsImgInput) await axios.put('/suppliers', { ...categoriesValue })
                else
                    await axios.put('/suppliers', { ...categoriesValue, avartar: img.url })
                //   console.log(teacherValue)
                setIsLoading(false)
                setCallBack(!callBack)
                setIsModal(false)
                ShowAlert(true, 'success', 'Thành công')
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
            await axios.delete(`/categories/${id}`)
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
    const onSubmitSearch = (input) => {
        let arr = []
        //  setCallBack(!callBack)
        if (input) {
            //   setCallBack(!callBack)
            categories.forEach(category => {
                //  console.log(category.name.toLowerCase().search(input.toLowerCase()))
                if (category.code.toLowerCase() === input.toLowerCase() || removeAccents(category.name.toLowerCase()).search(input.toLowerCase()) !== -1) {
                    arr.push(category)
                }

                // console.log(category.name)
            });
        }
        if (input === '') {
            ShowAlert(true, 'danger', 'Không có loại sản phẩm cần tìm')
            setCallBack(!callBack)
        }
        setCategories(arr)
    }

    return (
        <>

            <div className='m-3'>
                {alert.isShow && <Alert {...alert} showAlert={ShowAlert} />}
                <HeaderTitle title='loại sản phẩm' onChaneShowMoDal={onChaneShowMoDal} />
                <Modalcategories
                    isModal={isModal}
                    isEdit={isEdit}
                    isSave={isSave}

                    onCloseModal={onCloseModal}
                    onChangeInput={onChangeInput}
                    onSubmit={onSubmit}
                    value={categoriesValue}
                    isLoading={isLoading}
                    onDelete={onDelete}
                    IsImgInput={IsImgInput}
                    closeImage={handleCloseImgaeInput}
                    img={img}
                    handleDestroy={handleDestroy}
                    handleUpLoad={handleUploadImg}
                />
                <Search onSubmitSearch={onSubmitSearch} />
                <div className='row'>
                    <table className='table-hover table'>

                        <thead >
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col' >Logo</th>
                                <th scope='col'>Tên loại</th>
                                <th scope='col'>Code</th>
                                <th scope='col' >Số lượng sản phẩm</th>
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

export default Categories
