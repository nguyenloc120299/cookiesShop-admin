//import apiInstance from 'apiInstance'
import React, { useContext, useState } from 'react'
import Spinner from '../../component/untill/Spinner'
import { GlobalContext } from '../../GlobalContext'
import ListImg from './ListImg'
import Loading from '../../valid/Loading'
import { apiInstance } from '../../baseApi'

const ModaliImage = ({ setisShowListPicture, listPicture, setListPicture, value }) => {
    //   console.log(listPicture);
    const [isLoading, setIsLoading] = useState(false)
    //  const [img, setImg] = useState(false)
    const [id_img, setId_img] = useState('')
    const context = useContext(GlobalContext)
    const [isImg, setIsImg] = useState(false)
    const [categories] = context.categoriesApi.categories
    const [supliers] = context.suppliersApi.suppliers
    const [callBack, setCallBack] = context.productsApi.callBack
    const res_a = JSON.parse(localStorage.getItem('login_admin'))

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

            const res = await apiInstance.post('https://polar-woodland-25756.herokuapp.com/upload', formData, { headers: { 'content-type': 'multipart/form-data' } })

            const newImage = listPicture.filter(item => {
                return item.id !== id_img
            })
            setListPicture([...newImage, {
                id: id_img,
                file: res.data.url
            }
            ])
            await apiInstance.put(`/products`, {
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
                status: value.status,
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
            //  setIsImg(false)
        } catch (error) {
            console.log(error);
        }
    }
    //  console.log(listPicture);
    return (
        <div className='img_modal'>
            {
                isLoading && <Loading />
            }
            <div className='form_modal'>
                <div className='modal_header'>
                    <h3>Danh sách ảnh</h3>
                    {/* <div style={{ margin: '20px' }}>
                        <Spinner isLoading={isLoading} />
                    </div> */}
                    <span onClick={() => setisShowListPicture(false)}>&times;</span>
                </div>
                <div className='modal_body'>
                    {
                        listPicture.length > 0 && listPicture.map((item, index) => (
                            <ListImg
                                item={item}
                                setListPicture={setListPicture}
                                setId_img={setId_img}
                                index={index}
                                setIsLoading={setIsLoading}
                                listPicture={listPicture}
                                id_img={id_img}
                                setListPicture={setListPicture}
                                value={value}
                            // handleImages={handleImages}
                            />
                        ))

                    }
                </div>

                {
                    listPicture.length < 4 &&

                    <div className='modal_footer'>
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
                    </div>
                }
            </div>
        </div>
    )
}

export default ModaliImage
