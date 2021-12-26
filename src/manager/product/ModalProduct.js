import React, { useContext } from 'react'
import Spinner from '../../component/untill/Spinner'
import ModalFooter from '../../component/view/ModalFooter'
import { AiOutlineUpload } from 'react-icons/ai'
import { GlobalContext } from '../../GlobalContext'
import UploadImage from './UploadImage'
const ModalProduct = ({ isModal, onChangeInput, value, onSubmit, isEdit, isSave,
    onCloseModal, isLoading, onDelete, img, handleUpLoad, handleDestroy,
    IsImgInput, closeImage, imgArr, deleteImages, errLog }) => {
    const context = useContext(GlobalContext)
    const [categories] = context.categoriesApi.categories
    const [supliers] = context.suppliersApi.suppliers
    console.log(errLog);
    return (
        <div className='modal' tabIndex='-1' style={isModal ? { display: 'block' } : { display: 'none' }}>

            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        {isEdit && <h5>Cập nhật sản phẩm</h5>}
                        {isSave && <h5>Thêm nhà sản phẩm mới</h5>}
                        {/* <div style={{ margin: '20px' }}>
                            <Spinner isLoading={isLoading} />
                        </div> */}

                        <p className="btn-close text-danger" disabled aria-label="Close" style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                            onClick={() => onCloseModal()}></p>

                    </div>
                    <div className='modal-body p-3'>
                        <div className='mb-3'>
                            <label>Tên sản phẩm</label>
                            <input type='text' className='form-control' placeholder='Tên sản phẩm'
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
                            {errLog.code && <small className='text-danger'>{errLog.code}</small>}


                        </div>
                        <div className='mb-3'>
                            <label>Mô tả ngắn</label>
                            <input type='text' className='form-control' placeholder='Mô tả ngắn'
                                name='sort_description'
                                value={value.sort_description}
                                onChange={onChangeInput} />

                        </div>
                        <div className='mb-3'>
                            <label>Mô tả chi tiết</label>
                            <textarea type='text' className='form-control' placeholder='Mô tả chi tiết'
                                name='detail_description' rows={5}
                                value={value.detail_description}
                                onChange={onChangeInput} />

                        </div>
                        {isEdit &&
                            <div className='mb-3'>
                                <label>Giảm giá (%)</label>
                                <input type='text' className='form-control' placeholder='Khuyến mãi'
                                    name='promotion'
                                    value={value.promotion}
                                    onChange={onChangeInput} />

                            </div>

                        }
                        <div className='mb-3'>
                            <label>Giá</label>
                            <input type='text' className='form-control' placeholder='Giá'

                                name='price'
                                value={value.price}
                                onChange={onChangeInput} />
                            {errLog.price && <small className='text-danger'>{errLog.price}</small>}

                        </div>
                        <div className='mb-3'>
                            <label>Số lượng</label>
                            <input type='text' className='form-control' placeholder='Số lượng'
                                name='quantity'
                                value={value.quantity}
                                onChange={onChangeInput} />
                            {errLog.quantity && <small className='text-danger'>{errLog.quantity}</small>}

                        </div>
                        {isSave && <>
                            <div className='mb-3'>
                                <label>Loại sản phẩm</label>
                                <select className='form-control' placeholder=''
                                    name='category'
                                    value={value.categories}
                                    onChange={onChangeInput} >
                                    <option>Chọn loại sản phẩm</option>
                                    {
                                        categories.map((item) => (
                                            <option value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>

                            </div>
                            <div className='mb-3'>
                                <label>Nhà cung cấp</label>
                                <select className='form-control'
                                    name='supplier'
                                    value={value.suppliers}
                                    onChange={onChangeInput} >
                                    <option>Chọn nhà cung cấp</option>
                                    {
                                        supliers.map((item) => (
                                            <option value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>

                            </div>
                        </>
                        }

                        <UploadImage
                            isSave={isSave}
                            isEdit={isEdit}
                            handleDestroy={handleDestroy}
                            handleUpLoad={handleUpLoad}
                            img={img}
                            value={value}
                            closeImage={closeImage}
                            IsImgInput={IsImgInput}
                            imgArr={imgArr}
                            deleteImages={deleteImages}

                        />

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

export default ModalProduct
