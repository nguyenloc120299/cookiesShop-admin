import { apiInstance } from '../../baseApi'
import React, { useContext, useState } from 'react'
import Search from '../../component/search/Search'
// import ButtonTable from '../../component/view/ButtonTable'
import HeaderTitle from '../../component/view/HeaderTitle'
import Pagination from '../../component/view/Pagination'
import { GlobalContext } from '../../GlobalContext'
import swal from 'sweetalert'
import { BsPersonFill } from 'react-icons/bs'
import ModalUser from './ModalUser'
import Loading from '../../valid/Loading'
import './auth.css'
const User = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const context = useContext(GlobalContext)
    const [users] = context.usersApi.users
    const totalItem = 10;
    const pageCount = Math.ceil(users.length / totalItem);
    const [isModal, setIsModal] = useState(false)
    const [IsImgInput, setIsImgInput] = useState(false)
    const [callBack, setCallBack] = context.usersApi.callBack
    const [isSave, SetIsSave] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const PageVisited = pageNumber * totalItem
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const res = JSON.parse(localStorage.getItem('login_admin'))
    const [img, setImg] = useState(false)
    //upload img
    const handleUploadImg = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0];
            if (!file) return alert("file không tồn tại")
            if (file.type !== 'image/jpge' && file.type !== 'image/png') return alert('file không đúng định dạng')
            let formData = new FormData()
            formData.append('file', file)
            setIsLoading(true)

            const res = await apiInstance.post('https://polar-woodland-25756.herokuapp.com/upload', formData, { headers: { 'content-type': 'multipart/form-data' } })
            setIsLoading(false)
            setImg(res.data)
        } catch (err) {

        }
    }
    const handleDestroy = async () => {

        try {
            setIsLoading(true)
            await apiInstance.post('https://polar-woodland-25756.herokuapp.com/destroy', { public_id: img.public_id })
            setIsLoading(false)
            setImg(false)
        } catch (err) {
            return err.response.data.msg
        }
    }
    ///show modal
    const [userValue, setUserValue] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
    })
    const onChangeInput = e => {
        const { name, value } = e.target
        setUserValue({ ...userValue, [name]: value })
    }
    const onChaneShowMoDal = (type, id) => {
        if (type === 'add') {
            setUserValue({
                name: '',

                address: '',
                phone: '',
                email: '',

            })
            SetIsSave(true)
            setIsModal(!isModal)
            setIsEdit(false)
            setImg(false)

        } else if (type === 'edit') {
            setUserValue({
                name: '',

                address: '',
                phone: '',
                email: '',

            })

            setIsEdit(true)
            setIsModal(!isModal)
            SetIsSave(false)
            setImg(false)

            users.forEach(user => {
                if (user.id === id) {

                    setUserValue({
                        id: user.id,
                        name: user.name,
                        address: user.address,
                        phone: user.phone,
                        email: user.email
                    })
                    setIsImgInput(user.avartar)
                }
            });

        }

    }
    const onCloseModal = () => {
        setIsModal(false)
    }
    const onChangeRoles = async (id_role, name, id_user) => {
        await apiInstance.put(`/roles/users/${id_user}`, {
            id: id_role,
            role: name
        })
        setCallBack(!callBack)
    }
    const confirmBuyer = async (userId) => {
        await apiInstance.get(`/users/${userId}/confirm`)
        swal("Tài khoản đã được duyệt", "", "success");
        setCallBack(!callBack)
    }
    const dislayTable = users.slice(PageVisited, totalItem + PageVisited).map(item => (


        <tr key={item.id}>
            <td >{item.id}</td>
            <td ><img src={item.avartar} alt='' style={{

                width: '50px',
                height: '50px'
            }} /></td>
            <td >{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.address}</td>
            <td>
                <div className="dropdown">
                    <span style={{ fontWeight: 'bold', cursor: 'pointer' }} > {item.listroles[0].role}</span>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li><button className="dropdown-item" type="button" onClick={() => onChangeRoles(item.listroles[0].id, 'Admin', item.id)}>Admin</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => onChangeRoles(item.listroles[0].id, 'Buyer', item.id)}>Buyer</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => onChangeRoles(item.listroles[0].id, 'user', item.id)}>user</button></li>
                    </ul>
                </div></td>

            <td>
                <button type='button' className='btn btn-danger' onClick={() => onDelete(item.id)}>Xóa </button>
            </td>

            {
                (item.listroles[0].role === 'Buyer' && item.status === 0)
                &&
                <td>
                    <button className='btn btn-success' onClick={() => confirmBuyer(item.id)}>Duyệt</button>
                </td>
            }

            {/* <ButtonTable item={item} onChaneShowMoDal={onChaneShowMoDal} /> */}
        </tr>

    ))
    const onSubmit = async (id) => {
        try {
            //console.log(teacherValue)
            if (isSave) {
                setIsLoading(true)

                //console.log({ ...userValue });
                await apiInstance.post('/sigup', { ...userValue })
                setIsLoading(false)
                setCallBack(!callBack)
                setIsModal(false)
                // ShowAlert(true, 'success', 'Thành công')
            }
            if (isEdit) {
                setIsLoading(true)
                console.log({
                    id: userValue.id,
                    name: userValue.name,
                    address: userValue.address,
                    phone: userValue.phone,
                    email: userValue.email,
                    avartar: IsImgInput
                });
                if (IsImgInput) await apiInstance.put('/users', {
                    id,
                    name: userValue.name,
                    address: userValue.address,
                    phone: userValue.phone,
                    email: userValue.email,
                    avartar: IsImgInput
                })
                else
                    await apiInstance.put('/users', { id, ...userValue, avartar: img.url })

                setCallBack(!callBack)
                setIsModal(false)
                setIsLoading(false)
                // ShowAlert(true, 'success', 'Thành công')
                setIsImgInput(false)
            }

        } catch (err) {
            // ShowAlert(true, 'danger', err.response.data.msg)
            setIsLoading(false)
        }


    }

    const onDelete = async (id) => {
        try {
            setIsLoading(true)
            // console.log(id)
            await apiInstance.delete(`/users/${id}`)
            setIsLoading(false)
            setCallBack(!callBack)
            setIsModal(false)
            setIsLoading(false)
            swal('Xóa thành công', '', 'success')
            //   ShowAlert(true, 'success', "Đã xóa thành công")
        } catch (err) {
            // ShowAlert(true, 'danger', err.response.data)
            swal(`${err.response.data.message}`, '', 'error')
            setIsLoading(false)
        }

    }
    const handleCloseImgaeInput = () => {
        setIsImgInput(!IsImgInput)

    }
    return (
        <>
            <div className='m-3 mt-5'>
                {
                    isLoading && <Loading />
                }
                {/* <HeaderTitle title='người dùng' onChaneShowMoDal={onChaneShowMoDal} /> */}
                {/* <Search /> */}
                {/* <ModalUser
                    isModal={isModal}
                    isEdit={isEdit}
                    isSave={isSave}

                    onCloseModal={onCloseModal}
                    onChangeInput={onChangeInput}
                    onSubmit={onSubmit}
                    value={userValue}
                    isLoading={isLoading}
                    img={img}
                    handleUpLoad={handleUploadImg}
                    handleDestroy={handleDestroy}
                    onDelete={onDelete}
                    IsImgInput={IsImgInput}
                    closeImage={handleCloseImgaeInput}
                /> */}
                <div className='row m-3'>
                    <table className='table-hover table'>

                        <thead >
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col' >Hình ảnh</th>
                                <th scope='col'>Tên</th>
                                <th scope='col'>Số ĐT</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Địa chỉ</th>
                                <th scope='col' >Vai trò</th>

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

export default User
