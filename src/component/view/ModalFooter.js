import React from 'react'

const ModalFooter = ({ onSubmit, onDelete, id, onCloseModal, isEdit, isSave }) => {
    return (
        <div className='modal-footer'>
            {isEdit && <>
                <button type='button' className='btn btn-success' onClick={() => onSubmit()}>Lưu thay đổi</button>
                <button type='button' className='btn btn-danger' onClick={() => onDelete(id)}>Xóa </button>

            </>}
            {
                isSave &&
                <>
                    <button type='button' className='btn btn-success' onClick={() => onSubmit()}>Thêm </button>
                    <button type='button' className='btn btn-danger' onClick={() => onCloseModal()}>Đóng</button>
                </>
            }
        </div>
    )
}

export default ModalFooter
