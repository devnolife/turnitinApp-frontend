import { Fragment, useState, useEffect } from 'react'
// import { getUserData } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Row, Alert } from 'reactstrap'
import InfoFile from './InfoFile'
import { AlertCircle } from 'react-feather'
import { infoFileTurn } from '../api'
import ilustrator from '@src/assets/images/illustration/wait.gif'
import { getUserData } from '@utils'
const DownloadHasil = () => {
    const { id } = getUserData()
    const [data, setData] = useState([])
    const [status, setStatus] = useState(null)
    useEffect(() => {
        infoFileTurn(id)
            .then(res => {
                setData(res.data)
                setStatus(res.status)
            })
    }, [])

    const CardInfo = () => {
        return data.map((item, index) => {
            if (item.status === true) {
                return (
                    <div key={index}>
                        <InfoFile
                            label={item.label}
                            fieldName={item.fieldName}
                            bab={item.params}
                            status={item.status}
                        />
                    </div>
                )
            }
        })
    }
    return (
        <Fragment>
            {
                status ? (
                    <div>
                        <h4 className='text-center mb-2 mt-3'>Silahkan Download File Hasil Akhir</h4>
                        <Card>
                            <CardBody>
                                <CardInfo />
                                <Alert color='danger'>
                                    <div className='alert-body d-flex justify-content-end'>
                                        <AlertCircle size={15} />{' '}
                                        <span className='ms-1'>
                                            Jika file <strong>belum</strong> terupload, silahkan hubungi instuktur anda
                                        </span>
                                    </div>
                                </Alert>
                            </CardBody>
                        </Card>
                    </div>
                ) : (
                    <div>
                        <h4 className='text-center mb-2 mt-3'>File Hasil Akhir Belum Tersedia</h4>
                        <Card>
                            <CardBody className='d-flex justify-content-center'>
                                <img src={ilustrator} height={300} />
                            </CardBody>
                        </Card>
                        <Alert color='warning'>
                            <div className='alert-body d-flex justify-content-end'>
                                <AlertCircle size={15} />{' '}
                                <span className='ms-1'>
                                    File <strong>belum</strong> tersedia, silahkan tunggu instuktur anda mengupload file
                                </span>
                            </div>
                        </Alert>
                    </div>
                )
            }
        </Fragment >
    )
}

export default DownloadHasil