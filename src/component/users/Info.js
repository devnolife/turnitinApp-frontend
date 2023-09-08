import { Fragment, useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    Row,
    Col,
    Spinner,
    Modal,
    ModalBody,
    ModalHeader,
    Input,
    Button
} from 'reactstrap'
import { Mail, PhoneCall } from 'react-feather'
import { Link } from 'react-router-dom'
import whatsapp from '@src/assets/images/illustration/wa.svg'
import { numberAdmin, complainMessage } from '../api'

const DownloadHasil = () => {
    const [loading, setLoading] = useState(false)
    const [number, setNumber] = useState('')
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false)
    const [respon, setRespon] = useState({
        status: false,
        message: '',
        color: ''
    })

    useEffect(async () => {
        await numberAdmin()
            .then((res) => {
                setNumber(res.data)
            })
    }, [])

    const handleSend = async (e, message) => {
        e.preventDefault()
        setLoading(true)
        await complainMessage(message)
            .then((res) => {
                setLoading(false)
                setRespon({
                    status: true,
                    message: res.message,
                    color: 'success'
                })
                setTimeout(() => {
                    setShow(!show)
                    setMessage('')
                    setRespon({
                        status: false,
                        message: '',
                        color: ''
                    })
                }, 1000)

            })
            .catch(() => {

                setLoading(false)
                setRespon({
                    status: false,
                    message: 'Gagal mengirim pesan',
                    color: 'danger'
                })
            })
    }

    return (
        <Fragment>
            <div className='faq-contact'>
                <Row className='mt-5 pt-75'>
                    <Col className='text-center' sm='12'>
                        <h2>Anda Mengalami Masalah ?</h2>
                        <p className='mb-3'>
                            Jika anda mengalahai masalah, silahkan hubungi kami melalui kontak dibawah ini.
                        </p>
                    </Col>
                    <Col sm='6'>

                        <Card className='text-center faq-contact-card shadow-none py-1'>
                            <CardBody>
                                <h4 className='text-success fw-bolder mb-1'>ADMIN</h4>
                                <img src={whatsapp} alt='whatsapp' width={65} />
                                <h4 className='text-success fw-bolder mt-1'>+{number}</h4>
                                <span className='text-body '>Kami selalu siap membantu!</span>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm='6'>
                        <Card className='text-center faq-contact-card shadow-none py-1'>
                            <CardBody>
                                <h4 className='text-primary fw-bolder mb-2'>EMAIL</h4>
                                <div className='avatar avatar-tag bg-light-primary mb-2 mx-auto'>
                                    <Mail size={35} />
                                </div>
                                <h4 className='text-primary fw-bolder mt-2'>perpustakaan.unismuh.ac.id</h4>
                                <span className='text-body fw-'>Kami selalu siap membantu!</span>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className='text-center mt-2' sm='12'>
                        <Button
                            onClick={() => setShow(!show)}
                            color='success'
                        >
                            Kirim Pesan
                        </Button>
                    </Col>

                </Row>
            </div>
            <Modal
                isOpen={show}
                toggle={() => setShow(!show)}
                className='modal-dialog-centered'
                modalClassName='modal-black'
            >
                <ModalHeader className='bg-transparent'></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    {/* <img className='congratulation-medal mt-3' width='50' src={wa} alt='Medal Pic' /> */}
                    <h1 className='text-center'>Pesan WhatsApp</h1>
                    <p className='text-center mb-2'>Kirimkan pesan kepada Admin melalui WhatsApp Fitur</p>
                    {
                        loading ? (
                            <div className='d-flex justify-content-center align-items-center'>
                                <Spinner
                                    style={{
                                        width: '4rem',
                                        height: '4rem'
                                    }}
                                    color='success' />
                            </div>
                        ) : (
                            <Input
                                onChange={(e) => setMessage(e.target.value)}
                                id='message' type='textarea' placeholder='' />
                        )
                    }
                    {respon.status ? (<span className='text-success'>{respon.message}</span>) : (
                        <span className='text-danger'>{respon.message}</span>
                    )}
                    <div div className='d-flex justify-content-end mt-1'>
                        {
                            loading ? null : (
                                <Button
                                    onClick={() => setShow(!show)}
                                    color='danger'>
                                    Keluar
                                </Button>
                            )
                        }
                        <Button
                            onClick={(e) => handleSend(e, message)}
                            className='ms-1' color='success'>
                            Kirim
                        </Button>
                    </div>

                </ModalBody>
            </Modal>

        </Fragment >
    )
}

export default DownloadHasil