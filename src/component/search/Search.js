import React, { useState } from 'react'

const Search = ({ onSubmitSearch }) => {
    const [valueSearch, setValueSearch] = useState('')
    const onChangeInput = e => {
        setValueSearch(e.target.value)
    }
    const removeAccents = (str) => {
        let AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ];
        for (let i = 0; i < AccentsMap.length; i++) {
            let re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            let char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    }
    return (
        <div className='row mb-3 justify-content-end' >
            <div className="d-flex w-50">
                <input className="form-control me-2" type="search" placeholder="Tìm kiếm..."
                    value={valueSearch}
                    onChange={onChangeInput}
                />
                <button className="btn btn-outline button-search" onClick={() => onSubmitSearch(removeAccents(valueSearch))} style={{
                    border: '1px solid black'
                }}>Tìm</button>
            </div>
        </div>
    )
}

export default Search
