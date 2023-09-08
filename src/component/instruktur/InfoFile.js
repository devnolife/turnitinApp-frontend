import {
    Fragment
    // , useState 
} from 'react'
import { ListGroupItem, ListGroup, Button } from 'reactstrap'
import { FileText, CheckSquare } from 'react-feather'
import Avatar from '@components/avatar'
import { deleteFileTurnitin } from '../api'
import { toast, Slide } from 'react-toastify'
import { ToastSuccees, ToastError } from '../auth/toast'

const InfoFile = ({ fieldName, label, id, params }) => {

    const handleDelete = (e, id, params) => {
        e.preventDefault()
        deleteFileTurnitin(id, params)
            .then((res) => {
                toast.success(
                    <ToastSuccees message={res.message} />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
                window.location.reload()
            })
            .catch((err) => {
                toast.error(
                    <ToastError message={err.response.data.message} />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
                window.location.reload()
            })
    }
    return (
        <Fragment>
            <h5>{label}</h5>
            <ListGroup className='my-1'>
                <ListGroupItem className='d-flex align-items-center justify-content-between'>
                    <div className='file-details d-flex align-items-center'>
                        <div className='file-preview me-1'>
                            <FileText size='28' />
                        </div>
                        <div>
                            <p className='file-name mb-0'>{
                                fieldName
                            }</p>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-end'>
                        <Button
                            onClick={(e) => handleDelete(e, id, params)}
                            className='me-1'
                            color='danger'>
                            Hapus
                        </Button>
                        <Avatar className='rounded' color='light-success' icon={<CheckSquare size='28' />} />
                    </div>
                </ListGroupItem>
            </ListGroup>
        </Fragment>
    )
}

export default InfoFile