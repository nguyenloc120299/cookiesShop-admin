import React from 'react'
import Spinner from '../../component/untill/Spinner'

const Modalcategories = ({ isModal, onChangeInput, value, onSubmit, isEdit, isSave, onCloseModal, isLoading, onDelete }) => {
    return (
        <div className='modal' tabIndex='-1' style={isModal ? { display: 'block' } : { display: 'none' }}>

            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        {isEdit && <h5>Cập nhật giảng viên</h5>}
                        {isSave && <h5>Thêm giảng viên</h5>}
                        <Spinner isLoading={isLoading} />
                        <p class="btn-close text-danger" disabled aria-label="Close" style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                            onClick={() => onCloseModal()}></p>

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


                    </div>
                    <div className='modal-footer'>
                        {isEdit && <>
                            <button type='button' className='btn btn-success' onClick={() => onSubmit()}>Lưu thay đổi</button>
                            <button type='button' className='btn btn-danger' onClick={() => onDelete(value.id)}>Xóa giảng viên</button>

                        </>}
                        {
                            isSave &&
                            <>
                                <button type='button' className='btn btn-success' onClick={() => onSubmit()}>Thêm giảng viên</button>
                                <button type='button' className='btn btn-danger' onClick={() => onCloseModal()}>Đóng</button>
                            </>
                        }
                    </div>
                </div>
            </div>

        </div >

    )
}

export default Modalcategories
