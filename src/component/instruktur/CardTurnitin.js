import { Fragment, useState, useEffect } from 'react'
import { CardBody, Card, CardHeader, Badge, Row, Col, Button, Input, Label } from 'reactstrap'
import { infoNilai, updateNilai } from '../api'
import { useParams } from 'react-router-dom'
import { capatalize } from '@utils'
import { ToastSuccees, ToastError } from '../auth/toast'
import { toast, Slide } from "react-toastify"
const CardTurnitin = ({ dataUser, dataTurnitin }) => {

    const [lock, setLock] = useState(true)
    const { id } = useParams()
    const [data, setData] = useState([]), [update, setUpdate] = useState(null)
    const [turnitinID, setID] = useState(null)
    const [relod, setRelod] = useState(false)
    const [loading, setLoading] = useState(true)

    const unclockButton = (e) => {
        e.preventDefault()
        setLock(!lock)
    }
    useEffect(() => {
        infoNilai(id)
            .then((res) => {
                setData(res)
                setID(res.id)
                setLoading(false)

            })
    }, [relod])

    const sendNilai = (e, data) => {
        e.preventDefault()
        setLoading(true)
        updateNilai(turnitinID, data)
            .then((res) => {
                setRelod(!relod)
                toast.success(
                    <ToastSuccees message={res.message} />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
                setLock(!lock)
                setUpdate(null)
            })
            .catch((err) => {
                setRelod(!relod)
                toast.error(
                    <ToastError message={err.message} />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
                setLock(!lock)
                setUpdate(null)
            })
    }

    const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]

    return (
        <Fragment>
            <Card>
                <CardBody>
                    <h4 className='fw-bolder border-bottom pb-50 mb-1'>Detail</h4>
                    <div className='info-container'>
                        {dataUser !== null ? (
                            <ul className='list-unstyled'>
                                <li className='mb-75'>
                                    <span className='fw-bolder me-25'>Fakultas:</span>
                                    <Badge color={color} className='text-capitalize'>
                                        {dataUser.fakultas}
                                    </Badge>
                                </li>
                                <li className='mb-75'>
                                    <span className='fw-bolder me-25'>Prodi:</span>
                                    <Badge color={states[stateNum + 2]} className='text-capitalize'>
                                        {dataUser.prodi}
                                    </Badge>

                                </li>
                                <li className='mb-75'>
                                    <span className='fw-bolder me-25'>Judul:</span>
                                    <span className='fw-bolder'>{dataUser.judul}</span>
                                </li>
                                <li className='mb-75'>
                                    <span className='fw-bolder me-25'>Tahapan Ujian:</span>
                                    {
                                        dataTurnitin.map((item, index) => {
                                            return (
                                                <Badge
                                                    key={index}
                                                    color={states[stateNum + index]} className='badge-glow ms-1'>
                                                    {item}
                                                </Badge>
                                            )
                                        })
                                    }
                                </li>
                            </ul>
                        ) : null}
                    </div>
                    <h4 className='fw-bolder border-bottom pb-50 mb-1'></h4>
                    <div className='d-flex justify-content-between'>
                        <h4 className='fw-bolder' >Nilai Turnitin</h4>
                        <div>
                            {
                                lock === false ? (
                                    <Button
                                        onClick={(e) => unclockButton(e)}
                                        color='danger'>
                                        Batal
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={(e) => unclockButton(e)}
                                        color='success'>
                                        Input
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                    {
                        loading === false && data !== null ? (
                            Object.keys(data).map((item, index) => {
                                if (data[item].status === true) {
                                    return (
                                        <div key={index}>
                                            <Label className='fw-bold'>
                                                {capatalize(item)}
                                            </Label>
                                            <Input
                                                disabled={lock}
                                                defaultValue={data[item].nilai}
                                                type='number'
                                                maxLength="2"
                                                onChange={(e) => { setUpdate({ ...update, [item]: e.target.value }) }}
                                            />
                                        </div>
                                    )
                                }
                            })
                        ) : (
                            <div className='d-flex justify-content-center'>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )
                    }
                    <div className='d-flex justify-content-end'>
                        {
                            lock === false ? (
                                <Button
                                    onClick={(e) => sendNilai(e, update)}
                                    color='primary' className='mt-2'>Kirim</Button>
                            ) : null
                        }
                    </div>
                </CardBody>
            </Card >
        </Fragment >
    )
}

export default CardTurnitin