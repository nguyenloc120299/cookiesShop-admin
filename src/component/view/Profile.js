import { apiInstance } from '../../baseApi'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import Loading from '../../valid/Loading'
import { AiOutlineCamera } from 'react-icons/ai'
import { imageUpload } from '../../valid/uploadImage'

const Profile = () => {
    const { id } = JSON.parse(localStorage.getItem('login_admin'))
    const [isEdit, setIsEdit] = useState(false)
    const [store, setStore] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [img, setImg] = useState(false)
    const [dataSore, setDataStore] = useState({
        id: '',
        code: '',
        name: '',
        date: '',
        logo: ''
    })
    const [user, setUser] = useState('')
    const handleUploadImg = e => {

        try {
            const file = e.target.files[0];
            if (!file) return swal('File không đúng định dạng', '', 'warning')
            if (file.type !== 'image/jpge' && file.type !== 'image/png') return swal('file không đúng định dạng', '', 'warning')
            setImg(file)
        } catch (err) {

        }
    }
    const getStore = async () => {
        const res = await apiInstance.get(`/store/user/${id}`)
        if (res && res.data) setStore(res.data)
    }
    const getUser = async () => {
        const res = await apiInstance.get(`/users/${id}`)
        if (res && res.data) setUser(res.data)
    }
    useEffect(() => {
        getStore()
        getUser()
    }, [])
    const isEditStore = () => {
        setIsEdit(true)

        setDataStore({
            id: store.id,
            code: store.code,
            name: store.name,
            date: store.dateStore,
            logo: store.logo
        })
    }
    const updateStore = async () => {
        try {
            let media
            setIsLoading(true)
            if (img)
                media = await imageUpload([img])
            await apiInstance.put(`/stores/user/${id}`, {
                id: dataSore.id,
                code: dataSore.code,
                name: dataSore.name,
                date: dataSore.date,
                logo: media ? media.url : dataSore.logo
            })
            setIsLoading(false)
            setIsEdit(false)
            swal('Cập nhật thành công !!', '', 'success')
            setDataStore({
                id: '',
                code: '',
                name: '',
                date: '',
                logo: ''
            })
        } catch (error) {
            setIsLoading(false)
            swal(`${error.response.data.message}`, '', 'error')
        }
    }

    const onchangeInputStore = e => {
        const { name, value } = e.target
        setDataStore({ ...dataSore, [name]: value })
    }
    console.log(1111111111111111, img);
    return (
        <div className='profile'>
            {
                isLoading && <Loading />
            }
            <div className='info_store'>
                {
                    isEdit ?
                        <>
                            <div className='img_store position-relative' style={{
                                width: "150px",
                                height: "150px",

                                objectFit: 'cover',
                                overflow: 'hidden'
                            }} >
                                <img src={img ? URL.createObjectURL(img) : store.logo} alt='' style={{
                                    width: '100%',
                                    height: '100%',

                                }} />
                                <span className='d-flex justify-content-center'>
                                    <label htmlFor="fileInputStore">
                                        <AiOutlineCamera style={{
                                            fontSize: '20px'
                                        }} />
                                        <input type='file' id='fileInputStore' onChange={handleUploadImg} style={{ display: 'none' }} />
                                    </label>
                                </span>
                            </div>
                            <div className='mb-3'>
                                <labe>Id Store</labe>
                                <input type='text' className='form-control' placeholder='Địa chỉ'
                                    name='address'
                                    value={dataSore.id}

                                    disabled />

                            </div>
                            <div className='mb-3'>
                                <label>Tên Store</label>
                                <input type='text' className='form-control' placeholder='Địa chỉ'
                                    name='name'
                                    onChange={onchangeInputStore}
                                    value={dataSore.name}
                                />

                            </div>
                            <div className='mb-3'>
                                <labe>Ngày lập</labe>
                                <input type='text' className='form-control'
                                    value={new Date(dataSore.date).toLocaleDateString()}

                                    disabled />

                            </div>
                        </>
                        : <>
                            <div className='img_store'>
                                <img src={store && store.logo} alt='' style={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />

                            </div>
                            <div className='name_store'>{store && store.name}</div>
                            <div className='date_store'><span>Ngày thành lập:</span> {store && store.dateStore}</div>
                        </>
                }
                <div className='d-flex justify-content-center'>
                    {
                        isEdit ? <button className='btn btn-primary mt-3' onClick={() => updateStore()}>
                            Hoàn tất
                        </button>
                            :
                            <button className='btn btn-primary mt-3' onClick={() => isEditStore()}>
                                Chỉnh sửa thông tin
                            </button>
                    }
                </div>

            </div>

            <div className='info_user'>
                <h3 className='text-center'>Thông tin tài khoản</h3>
                <div className='name_user'><span>Tên tài khoản :</span> {user && user.name}</div>
                <div className='phone_user'><span>Số điện thoại :</span> {user && user.phone}</div>
                <div className='email_user'><span>Email :</span> {user && user.email}</div>
                <div className='address_user'><span>Địa chỉ :</span> {user && user.address}</div>
            </div>
        </div>
    )
}

export default Profile
