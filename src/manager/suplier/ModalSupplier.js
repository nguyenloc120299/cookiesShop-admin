import React from 'react'
import Spinner from '../../component/untill/Spinner'
import ModalFooter from '../../component/view/ModalFooter'
import { AiOutlineUpload } from 'react-icons/ai'
const ModalSupplier = ({ isModal, onChangeInput, value, onSubmit, isEdit, isSave, onCloseModal, isLoading, onDelete, img, handleUpLoad, handleDestroy, IsImgInput, closeImage }) => {
    console.log(img)


    return (
        <div className='modal' tabIndex='-1' style={isModal ? { display: 'block' } : { display: 'none' }}>

            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        {isEdit && <h5>Cập nhật nhà cung cấp</h5>}
                        {isSave && <h5>Thêm nhà cung cấp mới</h5>}
                        <div style={{ margin: '20px' }}>
                            <Spinner isLoading={isLoading} />
                        </div>

                        <p className="btn-close text-danger" disabled aria-label="Close" style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                            onClick={() => onCloseModal()}></p>

                    </div>
                    <div className='modal-body p-3'>
                        <div className='mb-3'>

                            <input type='text' className='form-control' placeholder='Tên nhà cung cấp'
                                name='name'
                                value={value.name}
                                onChange={onChangeInput}
                            />

                        </div>
                        <div className='mb-3'>
                            <input type='text' className='form-control' placeholder='Mã Code'
                                name='code'
                                value={value.code}
                                onChange={onChangeInput} />


                        </div>
                        <div className='mb-3'>
                            <input type='text' className='form-control' placeholder='Email'
                                name='email'
                                value={value.email}
                                onChange={onChangeInput} />

                        </div>
                        <div className='mb-3'>
                            <input type='text' className='form-control' placeholder='Số điện thoại'
                                name='phone'
                                value={value.phone}
                                onChange={onChangeInput} />

                        </div>
                        <div className='mb-3'>
                            <input type='text' className='form-control' placeholder='Địa chỉ'
                                name='address'
                                value={value.address}
                                onChange={onChangeInput} />

                        </div>
                        {isSave && <>
                            <div className='mb-3' style={img ? { display: 'none' } : { display: 'block' }}>
                                <label htmlFor="fileInput">
                                    <AiOutlineUpload style={{
                                        fontSize: '50px'
                                    }} />
                                    <h6 style={{
                                        marginLeft: '10px',
                                        color: '#777',
                                        fontWeight: 'bold'
                                    }}>Logo</h6>
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
                        {
                            isEdit &&
                            <>
                                {
                                    IsImgInput ?
                                        <div className='mb-3 img__input' style={{
                                            position: 'relative',
                                            display: 'block'
                                        }}
                                        >
                                            <img src={value.logo} alt='' style={{
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
                                            }} onClick={() => closeImage()}>X</p>
                                        </div>
                                        :
                                        <>
                                            <div className='mb-3' style={img ? { display: 'none' } : { display: 'block' }}>
                                                <label htmlFor="fileInput">
                                                    <i className="fas fa-upload" />
                                                    <span style={{
                                                        marginLeft: '10px',
                                                        color: '#777'
                                                    }}>Logo</span>
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
                    </div>

                    <ModalFooter
                        onSubmit={onSubmit}
                        onDelete={onDelete}
                        onCloseModal={onCloseModal}
                        id={value.id} isEdit={isEdit}
                        isSave={isSave}
                    />

                </div>
            </div>

        </div >

    )
}

export default ModalSupplier
