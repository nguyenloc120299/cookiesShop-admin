import React from 'react'
import { AiOutlineUpload } from 'react-icons/ai'

const UploadImage = ({ imgArr, isSave, isEdit, handleDestroy, handleUpLoad, img, IsImgInput, value, closeImage, deleteImages }) => {
    console.log(img);

    return (
        <>
            {
                isSave && <>
                    <div className='mb-3' style={img ? { display: 'none' } : { display: 'block' }} >
                        <label htmlFor="fileInput">
                            <AiOutlineUpload style={{
                                fontSize: '50px'
                            }} />
                            <h6 style={{
                                marginLeft: '10px',
                                color: '#777',
                                fontWeight: 'bold'
                            }}>Hình ảnh</h6>
                        </label>

                        <input id="fileInput" type="file" style={{ display: "none" }} className='form-control' placeholder='Địa chỉ'
                            multiple accept='image/*'
                            onChange={handleUpLoad} />


                    </div>
                    {img && <div className='mb-3 img__input'>

                        {
                            imgArr && imgArr.map((item, index) => (
                                <div className='position-relative d-flex' key={index}>

                                    <img src={URL.createObjectURL(item)} alt='' style={{
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
                                    }} onClick={() => deleteImages(index)}>X</p>

                                </div>
                            ))
                        }

                    </div>
                    }
                </>
            }
            {
                isEdit &&

                <>
                    {
                        IsImgInput ?
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
                                    display: 'block'
                                }}
                                >
                                    <img src={value.avartar} alt='' style={{
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

                            </>
                            :
                            <>
                                <div className='mb-3' style={img ? { display: 'none' } : { display: 'block' }}>
                                    <label htmlFor="fileInput">
                                        <i className="fas fa-upload" />
                                        <span style={{
                                            marginLeft: '10px',
                                            color: '#777'
                                        }}>Hình ảnh</span>
                                    </label>

                                    <input id="fileInput" type="file" style={{ display: "none" }} className='form-control' placeholder='Địa chỉ'

                                        onChange={handleUpLoad} />


                                </div>
                                <div className='mb-3 img__input' style={img ? {
                                    position: 'relative',
                                    display: 'block'
                                } : { display: 'none' }}>
                                    <img src={img.url} alt='' style={{
                                        width: '80px',
                                        height: '80px',

                                    }} />
                                    <p style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        color: 'crimson'
                                    }} onClick={() => handleDestroy()}>X</p>
                                </div>
                            </>



                    }

                </>
            }
        </>
    )
}

export default UploadImage
