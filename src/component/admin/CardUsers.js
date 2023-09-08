import React, { Fragment, useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    Button,
    Badge,
    Spinner,
    Modal,
    ModalBody,
    ModalHeader,
    Label,
    Input
} from 'reactstrap'
import { Check, UserCheck, X } from 'react-feather'
import Avatar from '@components/avatar'
import { listUsersDetail, handleActivationUser, handleDeleteUser, sendMessageByAdmin } from '../api/index'
import { useHistory } from 'react-router-dom'
import { getUserData } from '@utils'
// import wa from '@src/assets/images/illustration/wa.svg'

const CardUsers = ({ userID }) => {
    const { role } = getUserData(), history = useHistory(), [dataUser, setData] = useState([])
    const [show, setShow] = useState(false), [relod, setRelodData] = useState(false), [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(''), [respon, setRespon] = useState({
        status: false,
        message: '',
        color: ''
    })
    useEffect(async () => {
        await listUsersDetail(userID)
            .then((res) => {
                setData(res)
                setRelodData(true)
            })
    }, [relod])

    const sendMessage = async (e, username, message) => {
        e.preventDefault()
        setLoading(true)

        await sendMessageByAdmin(username, message)
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

    const relodData = () => setRelodData(false)
    const renderUserImg = (item) => {
        if (item.imageProfile !== null) {
            return (
                <div className="mt-3 mb-2" style={{
                    width: '130px',
                    height: '140px',
                    overflow: 'hidden',
                    borderRadius: '3px'
                }}>
                    <img
                        style={{
                            width: '100%'
                        }}
                        alt='user-avatar'
                        src={item.imageProfile}
                    />
                </div>
            )
        } else {
            const stateNum = Math.floor(Math.random() * 6),
                states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
                color = states[stateNum]
            return (
                <Avatar
                    initials
                    color={color}
                    className='rounded mt-3 mb-2'
                    content={item.nama !== null ? item.nama : item.username}
                    contentStyles={{
                        borderRadius: 0,
                        fontSize: 'calc(40px)',
                        width: '100%',
                        height: '100%'
                    }}
                    style={{
                        height: '110px',
                        width: '110px'
                    }}
                />
            )
        }
    }
    return (
        <Fragment>
            {
                relod === false ? (
                    <Spinner />
                ) : (
                    <Card >
                        <CardBody style={{ padding: '0' }}>
                            <div className='user-avatar-section'>
                                <div className='d-flex align-items-center flex-column'>
                                    {renderUserImg(dataUser)}
                                    <div className='d-flex flex-column align-items-center text-center'>
                                        <div className='user-info'>
                                            <h4>{dataUser.nama}</h4>
                                            {dataUser.status !== '"mahasiswa-unismuh' ? (
                                                <Badge color='info' className='badge-glow mt-1' >
                                                    Mahasiswa Unismuh
                                                </Badge>
                                            ) : <Badge color='success' className='text-capitalize'>
                                                Non Unismuh
                                            </Badge>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h4 className='fw-bolder border-bottom pb-50 mt-2'>Detail Data:</h4>
                            <div className='info-container'>
                                {dataUser !== null ? (
                                    <ul className='list-unstyled'>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>ID :</span>
                                            <span>{dataUser.id}</span>
                                        </li>

                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Username:</span>
                                            <span>{dataUser.username}</span>
                                        </li>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Nama:</span>
                                            <span>{dataUser.nama}</span>
                                        </li>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Email:</span>
                                            <span>{dataUser.email}</span>
                                        </li>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Status:</span>
                                            {
                                                dataUser.status_akun === 'aktif' ? (
                                                    <Badge color='light-success' className='text-capitalize'>
                                                        Aktif
                                                    </Badge>
                                                ) : (
                                                    <Badge color='light-danger' className='text-capitalize'>
                                                        Non Aktif
                                                    </Badge>
                                                )
                                            }
                                        </li>
                                        <li>
                                            <span className='fw-bolder me-25'>No Hp(WhatsApp):</span>
                                            <Badge color='light-success' className='text-capitalize'>
                                                {dataUser.no_hp}
                                            </Badge>
                                        </li>
                                    </ul>
                                ) : null}
                            </div>
                            <div className='d-flex justify-content-center pt-1'>
                                {
                                    dataUser.status_akun === 'aktif' || dataUser.status_akun === 'lulus' ? (
                                        null
                                    ) : (
                                        <Button
                                            onClick={
                                                () => {
                                                    handleActivationUser(dataUser, relodData, 'mengaktifkan')
                                                }
                                            }
                                            color='success' outline>
                                            <Check size={14} />
                                            <span className='align-middle ml-25'>Aktifkan</span>
                                        </Button>
                                    )
                                }
                                {
                                    dataUser.status_akun === 'lulus' ? (
                                        null
                                    ) : (
                                        <Button
                                            onClick={
                                                () => {
                                                    handleDeleteUser(dataUser)
                                                        .then(() => {
                                                            history.push('/admin/users')
                                                        })
                                                }
                                            }
                                            className='ms-1' color='danger' outline >
                                            Hapus
                                        </Button>
                                    )
                                }
                                {
                                    role === 'admin' ? (
                                        <Button
                                            onClick={() => setShow(!show)}
                                            className='ms-1' color='success'>
                                            Pesan
                                        </Button>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                        </CardBody>
                    </Card>
                )
            }
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
                    <p className='text-center mb-2'>Kirimkan pesan kepada user melalui WhatsApp</p>
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
                            onClick={(e) => sendMessage(e, dataUser.username, message)}
                            className='ms-1' color='success'>
                            Kirim
                        </Button>
                    </div>

                </ModalBody>
            </Modal>

        </Fragment >
    )
}

export default CardUsers