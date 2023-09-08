import React from 'react'
import { Spinner } from 'reactstrap'
const SpinnerCostum = () => {
    return (
        <div className=''>
            <Spinner
                key={{
                    width: '10rem',
                    height: '10rem'
                }}
                color='primary' />
        </div>
    )
}

export default SpinnerCostum