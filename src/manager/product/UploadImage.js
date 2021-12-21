import React from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import { BiCameraHome } from 'react-icons/bi'
import { FaCamera } from 'react-icons/fa'

const UploadImage = ({ imgArr, isSave, isEdit, handleDestroy, handleUpLoad, img, IsImgInput, value, closeImage, deleteImages }) => {
    return (
        <>
            {
                isSave && <>
                    <div className='mb-3' style={img ? { display: 'none' } : { display: 'block' }} >
                        <label htmlFor="fileInput">
                            <FaCamera style={{
                                fontSize: '50px'
                            }} />
                            <h6 style={{
                                marginLeft: '10px',
                                color: '#777',
                                fontWeight: 'bold'
                            }}>Hình ảnh (Thêm ít nhất 2 ảnh )</h6>
                        </label>

                        <input id="fileInput" type="file" style={{ display: "none" }} className='form-control' placeholder='Địa chỉ'
                            multiple accept='image/*'
                            onChange={handleUpLoad} />


                    </div>
                    <div className='mb-3 img__input'>

                        {
                            img && img.map((item, index) => (
                                <div className='position-relative d-flex' key={index}>

                                    <img src={URL.createObjectURL(item)} alt='' style={{
                                        width: '100px',
                                        height: '100px',
                                        marginBottom: '1rem'

                                    }} />
                                    {/* <p style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        color: 'crimson'
                                    }} onClick={() => deleteImages(index)}>X</p> */}

                                </div>
                            ))
                        }

                    </div>

                </>
            }
            {
                isEdit &&
                <>
                    {/* {
                                    value && value.listpictureProductDTOs && value.listpictureProductDTOs.map(item => (

                                        <div className='mb-3 img__input' style={{
                                            position: 'relative',
                                            display: 'block'
                                        }}
                                        >
                                            <img src={item.file} alt='' style={{
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
                                            }} onClick={() => closeImage()}>X</p>
                                        </div>
                                    ))
                                } */}
                    <div div className='mb-3 img__input' style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-around'

                    }}
                    >

                        <img src={img ? URL.createObjectURL(img) : value.avartar} alt='' style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover'

                        }} />
                        <div>
                            <label htmlFor="fileInput">
                                <FaCamera style={{
                                    marginLeft: '10px',
                                    fontSize: '3rem'
                                }}></FaCamera>
                            </label>

                            <input id="fileInput" type="file" style={{ display: "none" }} className='form-control' placeholder='Địa chỉ'

                                onChange={handleUpLoad} />
                        </div>

                    </div>
                </>
            }
        </>
    )
}

export default UploadImage
