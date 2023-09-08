import { Fragment, useState, useEffect } from 'react'
import { getUserData } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from 'reactstrap'
import FileUpload from '../users/FileUpload'
import InfoFile from '../users/InfoFile'

import { infoFileTurn } from '../api'
const DownloadHasil = () => {
    const { status_akun, id } = getUserData()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        setLoading(true)
        infoFileTurn(id)
            .then(res => {
                setData(res)
                setLoading(false)
            })
    }, [refresh])

    const CardInfo = ({ relodData }) => {
        return data.map((item, index) => {
            if (item.status === true) {
                return (
                    <div key={index}>
                        <InfoFile label={item.label} fieldName={item.fieldName} />
                    </div>
                )
            } else {
                return (
                    <div key={index}>
                        <FileUpload
                            setLoadingPage={relodData}
                            label={item.label}
                            params={item.params} />
                    </div>
                )
            }
        })
    }

    const relodData = () => setRefresh(!refresh)
    return (
        <Fragment>
            {
                status_akun === 'lulus' ? (
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Selamat!</h4>
                        <p>Anda telah lulus seleksi tahap 1. Silahkan upload hasil seleksi tahap 2.</p>
                        <hr />
                        <p className="mb-0">Silahkan upload hasil seleksi tahap 2.</p>
                    </div>
                ) : (
                    <div>
                        {
                            loading === true ? (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h4 className='text-center mb-2 mt-3'>Silahkan Upload File Hasil Akhir Anda (.pdf)</h4>
                                    <Card>
                                        <CardBody>
                                            <CardInfo
                                                relodData={relodData}
                                            />
                                        </CardBody>
                                    </Card>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </Fragment>
    )
}

export default DownloadHasil