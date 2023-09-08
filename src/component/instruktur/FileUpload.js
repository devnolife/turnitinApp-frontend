import { Fragment, useState } from 'react'
import { Label, Input, Button, Spinner } from 'reactstrap'
import { ToastSuccees, ToastError } from '../auth/toast'

import axios from 'axios'
import { baseUrl } from '../../@core/auth/jwt/jwtDefaultConfig'
import { toast, Slide } from 'react-toastify'

const FileUpload = ({ label, params, dataUser }) => {
    const { id, username } = dataUser
    const [selectFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleRemoveAllFiles = () => {
        setLoading(true)
        setSelectedFile(null)

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const uploadFile = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fileTurnitin', selectFile)
        setLoading(false)
        axios.post(`${baseUrl}/api/files/upload-file-turnitin/${id}/${username}/${params}`, formData)
            .then(() => {
                setLoading(false)
                toast.success(
                    <ToastSuccees message='File berhasil diupload' />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
            .catch(() => {
                setLoading(false)
                toast.error(
                    <ToastError message='File gagal diupload' />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
            })
    }
    return (
        <Fragment>
            <h5>{label}</h5>
            <div className='my-1'>
                {
                    loading === true ? (
                        <Spinner
                            className="d-flex justify-content-center"
                            color="primary" />
                    ) : (
                        <div>
                            <Input
                                onChange={
                                    (e) => setSelectedFile(e.target.files[0])
                                }
                                accept='.pdf'
                                type='file' id='inputFile' name='fileInput' />
                            {
                                selectFile !== null ? (
                                    <div className='d-flex justify-content-end mt-1'>
                                        <Button className='me-1' color='danger'
                                            onClick={handleRemoveAllFiles}
                                            outline >
                                            Hapus
                                        </Button>
                                        {
                                            loading === false ? (
                                                <Button
                                                    onClick={(e) => uploadFile(e)}
                                                    color='primary'>Upload File</Button>
                                            ) : (
                                                <Button
                                                    color='primary'>
                                                    <Spinner color='white' size='sm' />
                                                    <span className='ms-50'>Loading...</span>
                                                </Button>
                                            )
                                        }
                                    </div>
                                ) : null
                            }
                        </div>
                    )
                }
            </div>

        </Fragment>
    )
}

export default FileUpload