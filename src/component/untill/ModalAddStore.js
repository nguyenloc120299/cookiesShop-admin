import React, { useContext, useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import Spinner from '../untill/Spinner'
import { GlobalContext } from '../../GlobalContext'
import { apiInstance } from '../../baseApi'
import swal from 'sweetalert'
import { imageUpload } from '../../valid/uploadImage'
import Loading from '../../valid/Loading'
import { FaCamera } from 'react-icons/fa'
const ModalAddStore = () => {
    const context = useContext(GlobalContext)
    const [firstLogin, setFirstLogin] = context.isFirstLogin
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const res = JSON.parse(localStorage.getItem('login_admin'))
    const makeid = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    const [img, setImg] = useState(false)
    const handleUploadImg = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if (!file) return alert("file not exist")
            if (file.type !== 'image/jpg' && file.type !== 'image/png') return alert('file format is incorrect')
            // let fromData = new FormData()
            // fromData.append('file', file)
            // console.log(fromData)
            // setIsLoading(true)
            // const res = await apiInstance.post('https://polar-woodland-25756.herokuapp.com/upload', fromData, { headers: { 'content-type': 'multipart/form-data' } })
            // setIsLoading(false)
            setImg(file)

        } catch (err) {
            console.log(err);
        }
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
    const addStore = async () => {
        try {
            setIsLoading(true)
            let media = await imageUpload([img])
            const res1 = await apiInstance.post(`/store/user/${res.id}`, {
                name,
                code: makeid(5),
                logo: media.url
            })
            setIsLoading(false)
            setFirstLogin(!firstLogin)
            swal(res1.data, "", "success");
        } catch (err) {
            console.log(err);
        }


    }
    return (
        <div className='modal_store'>
            {
                isLoading && <Loading />
            }
            <div className='form_modal'>
                <div className='modal_header'>
                    <h5 style={{
                        textAlign: 'center',
                        width: '100%'
                    }}>Vui lòng thêm thông tin cửa hàng để tiếp tục</h5>
                    {/* <Spinner isLoading={isLoading} /> */}

                </div>
                <div className='modal_body'>
                    <div className="form-group">
                        <label >Tên cửa hàng</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />

                    </div>
                    <div className="form-group">
                        {
                            !img ? <>

                                <label htmlFor="fileInput">
                                    <FaCamera style={{
                                        fontSize: '50px'
                                    }} />
                                    <h5 style={{
                                        marginLeft: '10px',
                                        color: '#777',
                                        fontWeight: 'bold'
                                    }}>Logo cửa hàng</h5>
                                </label>

                                <input id="fileInput" type="file" style={{ display: "none" }} className='form-control'
                                    placeholder='Địa chỉ'
                                    onChange={handleUploadImg}
                                />
                            </> :

                                <div className='img_store position-relative' style={{
                                    width: "150px",
                                    height: "150px",

                                    objectFit: 'cover',
                                    overflow: 'hidden'
                                }} >
                                    <img src={URL.createObjectURL(img)} alt='' style={{
                                        width: '100%',
                                        height: '100%',

                                    }} />
                                    <span className='d-flex justify-content-center'>
                                        <label htmlFor="fileInputStore">
                                            <FaCamera style={{
                                                fontSize: '20px'
                                            }} />
                                            <input type='file' id='fileInputStore' onChange={handleUploadImg} style={{ display: 'none' }} />
                                        </label>
                                    </span>
                                </div>
                        }
                    </div>


                </div>

                <div className='modal_footer mt-3'>
                    <button type="submit" className="btn btn-primary" onClick={() => addStore()}>Tiếp tục</button>
                </div>

            </div>
        </div>
    )
}

export default ModalAddStore
