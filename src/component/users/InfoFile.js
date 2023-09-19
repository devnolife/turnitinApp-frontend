import {
    Fragment
    // , useState 
} from 'react'
import { ListGroupItem, ListGroup, Button } from 'reactstrap'
import { FileText, CheckSquare } from 'react-feather'
import Avatar from '@components/avatar'
import { downloadFile } from '../api'
const InfoFile = ({ fieldName, label, bab, status }) => {
    // const [error, setError] = useState([])

    const handleDownload = async (e, bab) => {
        e.preventDefault()
        downloadFile(bab)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log('error')
                console.log(err)
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
                                status ? fieldName : 'File Belum Tersedia,Silahkan Hubungi Instruktur Anda'
                            }</p>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-end'>
                        <Button
                            onClick={(e) => handleDownload(e, bab)}
                            className='me-1'
                            color='success'>
                            Download
                        </Button>
                        <Avatar className='rounded' color='light-success' icon={<CheckSquare size='28' />} />
                    </div>
                </ListGroupItem>
            </ListGroup>
        </Fragment>
    )
}

export default InfoFile