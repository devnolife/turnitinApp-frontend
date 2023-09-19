import { Fragment, useState, useEffect } from 'react'
import { CardBody, Card, Badge, Button, Input, Label } from 'reactstrap'
import { infoNilai, updateNilai, checkProdiHasResult, updateHasilBab } from '../api'
import { useParams } from 'react-router-dom'
import { capatalize } from '@utils'
import { ToastError, ToastSuccees } from '../auth/toast'
import { toast, Slide } from "react-toastify"

const TitleAndButtons = ({ title, lock, onClick }) => {
    return (
        <div className='d-flex justify-content-between'>
            <h4 className='fw-bolder'>{title}</h4>
            <div>
                {lock === false ? (
                    <Button onClick={onClick} color='danger'>
                        Batal
                    </Button>
                ) : (
                    <Button onClick={onClick} color='success'>
                        Input
                    </Button>
                )}
            </div>
        </div>
    )
}

const CardTurnitin = ({ dataUser, dataTurnitin }) => {
    const [lock, setLock] = useState(true)
    const [lock2, setLock2] = useState(true)
    const { id } = useParams()
    const [data, setData] = useState([])
    const [update, setUpdate] = useState(null)
    const [update2, setUpdate2] = useState(null)
    const [turnitinID, setID] = useState(null)
    const [relod, setRelod] = useState(false)
    const [loading, setLoading] = useState(true)
    const [prodi, setProdi] = useState(null)
    const [dataHasilBab, setHasilBab] = useState(null)

    useEffect(() => {
        infoNilai(id)
            .then((res) => {
                setData(res)
                setID(res.id)
                setLoading(false)
            })

        checkProdiHasResult(dataUser.prodi_id, id)
            .then((data) => {
                setProdi(data.has_bab_results)
                setHasilBab(data.turnitin)
            })
    }, [relod])

    const unclockButton = (e) => {
        e.preventDefault()
        setLock(!lock)
    }

    const unclockButton2 = (e) => {
        e.preventDefault()
        setLock2(!lock2)
    }

    const convertKeyToOriginal = (key) => {
        return `${key.replace(/-/g, '').toLowerCase()}_hasil`
    }

    const sendNilai = (e, data) => {
        e.preventDefault()
        setLoading(true)
        updateNilai(turnitinID, data)
            .then(() => {
                setRelod(!relod)
                toast.success(
                    <ToastSuccees message="Berhasil mengupdate nilai" />,
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

    const sendHasilBab = (e, data) => {
        e.preventDefault()
        setLoading(true)
        updateHasilBab(id, data)
            .then(() => {
                setRelod(!relod)
                toast.success(
                    <ToastSuccees message="Berhasil mengupdate nilai" />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
                setLock2(!lock2)
                setUpdate(null)
            })
            .catch((err) => {
                console.log("🚀 ~ file: CardTurnitin.js:108 ~ sendHasilBab ~ err:", err.response)
                setRelod(!relod)
                toast.error(
                    <ToastError message={err.message} />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
                setLock2(!lock2)
                setUpdate(null)
            })
    }

    const stateNum = Math.floor(Math.random() * 6)
    const states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary']
    const color = states[stateNum]

    return (
        <Fragment>
            <Card>
                <CardBody>
                    <h4 className='fw-bolder border-bottom pb-50 mb-1'>Detail User</h4>
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
                                    {dataTurnitin.map((item, index) => {
                                        return (
                                            <Badge key={index} color={states[stateNum + index]} className='badge-glow ms-1'>
                                                {item}
                                            </Badge>
                                        )
                                    })}
                                </li>
                            </ul>
                        ) : null}
                    </div>
                    <h4 className='fw-bolder border-bottom pb-50 mb-1'></h4>
                    <TitleAndButtons title="Nilai Turnitin" lock={lock} onClick={(e) => unclockButton(e)} />
                    {loading === false && data !== null ? (
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
                                            min="0"
                                            max="99"
                                            maxLength="2"
                                            onChange={(e) => {
                                                const inputValue = e.target.value.replace(/\D/g, '')
                                                if (inputValue <= 99) {
                                                    setUpdate({ ...update, [item]: inputValue })
                                                } else {
                                                    toast.error(
                                                        <ToastError message="Nilai maksimal 99" />,
                                                        { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                                                    )
                                                }
                                            }}
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
                    )}
                    <div className='d-flex justify-content-end'>
                        {lock === false ? (
                            <Button onClick={(e) => sendNilai(e, update)} color='primary' className='mt-2'>
                                Kirim
                            </Button>
                        ) : null}
                    </div>
                    {prodi === "true" ? (
                        <div>
                            <h4 className='fw-bolder border-bottom pb-50 mb-1'></h4>
                            <TitleAndButtons title="Nilai Hasil Setiap Bab" lock={lock2} onClick={(e) => unclockButton2(e)} />
                            {loading === false && dataHasilBab !== null ? (
                                Object.keys(dataHasilBab).map((key) => {
                                    const originalKey = key.replace('_', '-') // Ganti '_' dengan '-' jika diperlukan
                                    return (
                                        <div key={key}>
                                            <Label className='fw-bold'>
                                                {originalKey}
                                            </Label>
                                            <Input
                                                disabled={lock2}
                                                type='number'
                                                maxLength="2"
                                                defaultValue={dataHasilBab[key] !== null ? dataHasilBab[key].toString() : ''}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value.replace(/\D/g, '')
                                                    const originalKey = convertKeyToOriginal(key)
                                                    if (inputValue <= 99) {
                                                        setUpdate2({ ...update2, [originalKey]: Number(inputValue) })
                                                    } else {
                                                        toast.error(
                                                            <ToastError message="Nilai maksimal 99" />,
                                                            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                                                        )
                                                    }
                                                }}
                                            />
                                        </div>
                                    )
                                })
                            ) : null}

                        </div>

                    ) : null}
                    <div className='d-flex justify-content-end'>
                        {lock2 === false ? (
                            <Button onClick={(e) => sendHasilBab(e, update2)} color='primary' className='mt-2'>
                                Kirim
                            </Button>
                        ) : null}
                    </div>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default CardTurnitin
