
import { Fragment } from 'react'
import { X, Check } from 'react-feather'
import Avatar from '@components/avatar'


export const ToastError = ({ message }) => {
    return (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='danger' icon={<X size={12} />} />
                    <h6 className='toast-title'>Request Error!</h6>
                </div>
            </div>
            <div className='toastify-body'>
                <span role='img' aria-label='toast-text'>
                    👋 {message}.
                </span>
            </div>
        </Fragment>
    )
}

export const ToastSuccees = ({ message }) => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <Avatar size='sm' color='success' icon={<Check size={12} />} />
                <h6 className='toast-title'>Permintaan Berhasil!</h6>
            </div>
        </div>
        <div className='toastify-body'>
            <span role='img' aria-label='toast-text'>
                👋 {message}.
            </span>
        </div>
    </Fragment>
)

