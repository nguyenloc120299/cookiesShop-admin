import React from 'react'
import Spinner from '../../component/untill/Spinner'
import ModalFooter from '../../component/view/ModalFooter'
import { FaCamera } from 'react-icons/all'
const ModalSupplier = ({ isModal, onChangeInput, value, onSubmit, isEdit, isSave, onCloseModal, isLoading, onDelete, img, handleUpLoad, handleDestroy, IsImgInput, closeImage }) => {
    console.log(img);


    return (
        <div className='modal' style={isModal ? { display: 'block' } : { display: 'none' }}>

            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        {isEdit && <h5>Cập nhật nhà cung cấp</h5>}
                        {isSave && <h5>Thêm nhà cung cấp mới</h5>}
                        {/* <div style={{ margin: '20px' }}>
                            <Spinner isLoading={isLoading} />
                        </div> */}

                        <p className="btn-close text-danger" disabled aria-label="Close" style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                            onClick={() => onCloseModal()}>X</p>

                    </div>
                    <div className='modal-body p-3'>
                        <div className='mb-3'>
                            <label>Name</label>
                            <input type='text' className='form-control' placeholder='Tên nhà cung cấp'
                                name='name'
                                value={value.name}
                                onChange={onChangeInput}
                            />

                        </div>
                        <div className='mb-3'>
                            <label>Code</label>
                            <input type='text' className='form-control' placeholder='Mã Code'
                                name='code'
                                value={value.code}
                                onChange={onChangeInput} />


                        </div>
                        <div className='mb-3'>
                            <label>Email</label>
                            <input type='text' className='form-control' placeholder='Email'
                                name='email'
                                value={value.email}
                                onChange={onChangeInput} />

                        </div>
                        <div className='mb-3'>
                            <label>Phone</label>
                            <input type='text' className='form-control' placeholder='Số điện thoại'
                                name='phone'
                                value={value.phone}
                                onChange={onChangeInput} />

                        </div>
                        <div className='mb-3'>
                            <label>Address</label>
                            <input type='text' className='form-control' placeholder='Địa chỉ'
                                name='address'
                                value={value.address}
                                onChange={onChangeInput} />

                        </div>
                        {
                            isSave && <div div className='d-flex'>
                                <div className='mb-3'>
                                    <label htmlFor="fileInput">
                                        <FaCamera style={{
                                            fontSize: '3rem'
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
                                {

                                    img &&
                                    <div className='mb-3 img__input' >
                                        <img src={URL.createObjectURL(img)} alt='' style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            marginLeft: '2rem'

                                        }} />
                                    </div>
                                }

                            </div>
                        }
                        {
                            isEdit &&
                            // <>
                            //     {

                            <div className='mb-3 img__input' style={{
                                position: 'relative',
                                display: 'flex'
                            }}
                            >
                                <img src={img ? URL.createObjectURL(img) : value.logo} alt='' style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover'

                                }} />
                                <div className='mb-3'>
                                    <label htmlFor="fileInput">
                                        <FaCamera style={{
                                            fontWeight: "bold",
                                            fontSize: "3rem",
                                            marginLeft: '2rem'
                                        }} />

                                    </label>

                                    <input id="fileInput" type="file" style={{ display: "none" }} className='form-control' placeholder='Địa chỉ'

                                        onChange={handleUpLoad} />


                                </div>
                            </div>

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
