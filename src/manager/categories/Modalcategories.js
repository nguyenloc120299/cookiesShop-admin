import React from 'react'
import Spinner from '../../component/untill/Spinner'
import ModalFooter from '../../component/view/ModalFooter'
import { AiOutlineUpload } from 'react-icons/ai'
import { BiCamera } from 'react-icons/bi'
const Modalcategories = ({ isModal, onChangeInput, value, onSubmit, isEdit,
    isSave, onCloseModal, isLoading, onDelete, handleDestroy, handleUpLoad, img, closeImage, IsImgInput }) => {
    return (
        <div className='modal' tabIndex='-1' style={isModal ? { display: 'block' } : { display: 'none' }}>

            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        {isEdit && <h5>Cập nhật loại sản phẩm</h5>}
                        {isSave && <h5>Thêm loại sản phẩm mới</h5>}

                        <p className="btn-close text-danger" disabled aria-label="Close" style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                            onClick={() => onCloseModal()}>X</p>

                    </div>
                    <div className='modal-body p-3'>
                        <div className='mb-3'>

                            <input type='text' className='form-control' placeholder='Tên loại sản phẩm'
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
                        {isSave &&
                            <div div className='d-flex'>
                                <div className='mb-3'>
                                    <label htmlFor="fileInput">
                                        <BiCamera style={{
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
                                {

                                    img &&
                                    <div className='mb-3 img__input' >
                                        <img src={URL.createObjectURL(img)} alt='' style={{
                                            width: '100px',
                                            height: '80px',

                                        }} />
                                    </div>
                                }

                            </div>
                        }
                        {
                            isEdit &&
                            <div className='mb-3 img__input' style={{
                                position: 'relative',
                                display: 'flex'
                            }}
                            >
                                <img src={img ? URL.createObjectURL(img) : value.avartar} alt='' style={{
                                    width: '100px',
                                    height: '80px',

                                }} />
                                <div className='mb-3'>
                                    <label htmlFor="fileInput">
                                        <BiCamera style={{
                                            fontWeight: "bold"
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

export default Modalcategories
