import axios from 'axios'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'

const ListImg = ({ item, setId_img, setIsLoading, listPicture, id_img, setListPicture, value }) => {
    const context = useContext(GlobalContext)
    const [isImg, setIsImg] = useState(false)
    const [categories] = context.categoriesApi.categories
    const [supliers] = context.suppliersApi.suppliers
    const [callBack, setCallBack] = context.productsApi.callBack
    const res_a = JSON.parse(localStorage.getItem('login_admin'))
    //  console.log(value);
    const onchangShow = (id) => {
        setIsImg(true)
        setId_img(id)
    }
    const handleImages = async e => {
        e.preventDefault()
        try {

            let id_category, id_supplier;
            categories.forEach(i => {

                i.products.forEach(element => {
                    if (element.id === value.id) id_category = i.id
                });

            });
            supliers.forEach(i => {

                i.products.forEach(element => {
                    if (element.id === value.id) id_supplier = i.id
                });

            });
            const file = e.target.files[0]
            if (!file) return alert("file không tồn tại")
            if (file.type !== 'image/jpge' && file.type !== 'image/png') return alert('file không đúng định dạng')

            let formData = new FormData()
            formData.append('file', file)
            setIsLoading(true)

            const res = await axios.post('https://polar-woodland-25756.herokuapp.com/upload', formData, { headers: { 'content-type': 'multipart/form-data' } })

            const newImage = listPicture.filter(item => {
                return item.id !== id_img
            })
            setListPicture([...newImage, {
                id: id_img,
                file: res.data.url
            }
            ])
            await axios.put(`/products`, {
                id: value.id,
                name: value.name,
                code: value.name,
                sort_description: value.sort_description,
                detail_description: value.detail_description,
                price: value.price,
                avartar: value.avartar,
                date_sale: value.date_sale,
                quantity: value.quantity,
                promotion: value.promotion,

                listpictureProductDTOs: [{
                    id: id_img,
                    file: res.data.url
                }],
                userId: res_a.id,
                categoriesId: id_category,
                suppliersId: id_supplier,
            })
            setCallBack(!callBack)
            setIsLoading(false)
            setIsImg(false)
        } catch (error) {
            console.log(error);
        }
    }
    const deleImage = async (id) => {
        const newImage = listPicture.filter(item => {
            return item.id !== id
        })
        await axios.delete(`/pictureProduct/${id}`)
        setCallBack(!callBack)
        setListPicture(newImage)
    }
    return (
        <>
            {

            }
            <div className='position-relative d-flex mb-3' key={item.id}>
                {
                    isImg ? <>
                        <label htmlFor="fileInput">
                            <i className="fas fa-upload" />
                            <span style={{
                                marginLeft: '10px',
                                color: '#777'
                            }}>Hình ảnh</span>
                        </label>

                        <input id="fileInput" type="file" style={{ display: "none" }} className='form-control' placeholder='Địa chỉ'
                            onChange={handleImages}
                        />

                    </>
                        :
                        <>

                            <img src={item.file} alt='' style={{
                                width: '100px',
                                height: '130px',

                            }} />
                            <label >
                                <p
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        color: 'crimson'
                                    }} onClick={() => deleImage(item.id)}><i className="far fa-trash-alt"></i></p>
                            </label>
                            <div onClick={() => onchangShow(item.id)}>
                                <i className="fas fa-pencil-alt" />
                            </div>

                        </>
                }
                {/* <input id="fileInput" type="file" style={{ display: "none" }} className='form-control' placeholder='Địa chỉ'

                                    onClick={handleImages} /> */}
            </div>

        </>
    )
}

export default ListImg
