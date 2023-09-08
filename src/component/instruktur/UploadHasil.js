import { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Spinner } from 'reactstrap'
import FileUpload from './FileUpload'
import InfoFile from './InfoFile'
import { useParams } from 'react-router-dom'
import { infoFileTurn } from '../api'


const CardInfo = ({ data, dataUser }) => {
    return data.map((item, index) => {
        if (item.status === true) {
            return (
                <div key={index}>
                    <InfoFile
                        id={dataUser.id}
                        params={item.params}
                        label={item.label} fieldName={item.fieldName} />
                </div>
            )
        } else {
            return (
                <div key={index}>
                    <FileUpload
                        dataUser={dataUser}
                        label={item.label}
                        params={item.params} />
                </div>
            )
        }
    })
}

const UploadHasil = ({ dataUser }) => {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        infoFileTurn(id)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
    }, [])

    return (
        <Fragment>
            {
                loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner color="primary" />
                    </div>
                ) : (
                    <div>
                        <h4 className='text-center mb-2 mt-3'>Silahkan Upload File Hasil Akhir {dataUser.username} (.pdf)</h4>
                        <Card>
                            <CardBody>
                                <CardInfo
                                    data={data}
                                    dataUser={dataUser}
                                />
                            </CardBody>
                        </Card>
                    </div>
                )
            }
        </Fragment>
    )

}

export default UploadHasil