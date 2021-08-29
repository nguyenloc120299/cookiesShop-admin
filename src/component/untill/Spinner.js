
import React from 'react'

const Spinner = ({ isLoading }) => {
    return (
        <div>
            <button class="btn btn-primary mt-3" type="button" disabled style={isLoading ? { display: 'flex' } : { display: 'none' }}>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
        </div>

    )
}

export default Spinner