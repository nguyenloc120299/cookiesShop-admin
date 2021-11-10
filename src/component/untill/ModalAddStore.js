import React, { useContext, useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import swal from 'sweetalert'
import axios from 'axios'
import Spinner from '../untill/Spinner'
import { GlobalContext } from '../../GlobalContext'
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
            let fromData = new FormData()
            fromData.append('file', file)
            console.log(fromData)
            setIsLoading(true)
            const res = await axios.post('https://polar-woodland-25756.herokuapp.com/upload', fromData, { headers: { 'content-type': 'multipart/form-data' } })
            setIsLoading(false)
            setImg(res.data)

        } catch (err) {
            console.log(err);
        }
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
    const addStore = async () => {
        try {
            setIsLoading(true)
            const res1 = await axios.post(`/store/user/${res.id}`, {
                name,
                code: makeid(5),
                logo: img.url
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
            <div className='form_modal'>
                <div className='modal_header'>
                    <h5 style={{
                        textAlign: 'center',
                        width: '100%'
                    }}>Vui lòng thêm thông tin cửa hàng để tiếp tục</h5>
                    <Spinner isLoading={isLoading} />

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
                                    <AiOutlineUpload style={{
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

                                <div className='position-relative d-flex mt-3' >

                                    <img src={img.url} alt='' style={{
                                        width: '100px',
                                        height: '130px',

                                    }} />
                                    <p style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        color: 'crimson'
                                    }} onClick={() => handleDestroy(img)}>X</p>

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
