import React from 'react'
import PaginationReact from 'react-paginate'
import './view.css'
const Pagination = ({ pageCount, changePage }) => {



    return (
        <> <PaginationReact
            previousLabel={"Trở lại"}
            nextLabel={"Tiếp theo"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"} />

        </>
    )
}

export default Pagination