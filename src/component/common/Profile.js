import { Fragment, useState } from 'react'
import 'cleave.js/dist/addons/cleave-phone.us'
import {
    Row, Col, Form, Card,
    Input,
    Label, Button, CardBody, CardTitle, CardHeader, FormFeedback,
    Badge
} from 'reactstrap'
import axios from 'axios'
import { baseUrl } from '../../@core/auth/jwt/jwtDefaultConfig'
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { toast, Slide } from "react-toastify"
import { ToastError, ToastSuccees } from '../auth/toast'
import { checkNumberRegister } from '../api'
import SpinnerCostum from './Spinner'
import UILoader from '@components/ui-loader'

const AccountTabs = ({ data }) => {

    const role = data.role.toUpperCase()
    const [dataUser, setData] = useState([])
    const [selected, setSelected] = useState(false)
    const [block, setBlock] = useState(true)
    const [file, setFile] = useState('')
    const [avatar, setAvatar] = useState(data.imageProfile ? data.imageProfile : defaultAvatar)

    const uploadProfile = async (file, e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('photoProfile', file)
        await axios.post(`${baseUrl}/api/images/upload-profile`, data)
            .then(() => {
                toast.success(
                    <ToastSuccees message='File berhasil diupload' />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000)
            })
            .catch(() => {
                toast.error(
                    <ToastError message='File gagal diupload' />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
            })

    }
    const onSubmit = (e, data) => {
        e.preventDefault()
        if (Object.values(data).every(field => field.length > 0)) {
            console.log("data", data)
        } else {
            console.log("hore")
        }
    }
    const handleImgReset = () => {
        setAvatar(require('@src/assets/images/avatars/avatar-blank.png').default)
    }

    const checkWhatsappNumbers = async (e, data) => {
        e.preventDefault()
        setBlock(true)
        await checkNumberRegister(data.no_hp)
            .catch(() => {
                toast.error(
                    <ToastError message='No WhatsApp tidak terdaftar' />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
                setBlock(false)
            })

    }
    const onSelectedFile = (e) => {
        setSelected(true)
        const reader = new FileReader(), files = e.target.files
        reader.onload = function () {
            setAvatar(reader.result)
        }
        reader.readAsDataURL(files[0])
        setFile(files[0])
    }

    return (
        <Fragment>
            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Profile Detail</CardTitle>
                    <div className="d-flex align-items-center">
                        {/* <CardTitle tag="h5" className="me-1 mt-0">Edit Profile</CardTitle>
                        <div className="form-switch form-check-primary">
                            <Input type="switch" id="switch-primary" name="primary" />
                        </div> */}
                    </div>

                </CardHeader>
                <CardBody className='py-2 my-25'>
                    <div className='d-flex'>
                        <div className='me-25'>
                            <img className='rounded me-50' src={avatar} alt='Generic placeholder image' height='135' width='135' />
                        </div>
                        <div className='d-flex flex-column align-items-start mt-75 ms-1 gap-1'>
                            <Badge color='success' className='badge-glow'>
                                {role}
                            </Badge>
                            <Badge color='primary' className='badge-glow'>
                                {data.status}
                            </Badge>
                            <div>
                                <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                                    Pilih File
                                    <Input type='file' onChange={onSelectedFile} hidden accept='image/*' />
                                </Button>
                                <Button className='mb-75 me-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                                    Reset
                                </Button>
                                {
                                    selected ? (
                                        <Button tag={Label}
                                            onClick={(e) => uploadProfile(file, e)}
                                            className='mb-75 me-75' size='sm' color='primary'>
                                            Upload
                                        </Button>
                                    ) : null
                                }
                                <p className='mb-0'>Diizinkan JPG, GIF, atau PNG. Ukuran maksimal 800kB</p>
                            </div>
                        </div>
                    </div>
                    <Form className='mt-2 pt-50' onSubmit={(e) => onSubmit(e, dataUser)}>
                        <Row>
                            <Col sm='6' className='mb-1'>
                                <Label className='form-label' for='uername'>
                                    username
                                </Label>
                                <Input id='uername' type='username' name='username' placeholder='username' defaultValue={data.username} disabled />
                            </Col>
                            <Col sm='6' className='mb-1'>
                                <Label className='form-label' for='nama'>
                                    Nama
                                </Label>
                                <Input
                                    disabled={true}
                                    onChange={(e) => setData({ ...dataUser, nama: e.target.value })}
                                    id='nama' type='text' name='nama' placeholder='Nama' defaultValue={data.nama} />
                            </Col>
                            <Col sm='6' className='mb-1'>
                                <Label className='form-label' for='no_hp'>
                                    E-mail
                                </Label>
                                <Input
                                    disabled={true}
                                    onChange={(e) => setData({ ...dataUser, email: e.target.value })}
                                    id='no_hp' type='email' name='email' placeholder='Email' defaultValue={data.email} />
                            </Col>
                            <Col sm='6' className='mb-1'>
                                <Label className='form-label' for='no_hp'>
                                    No WhatsApp
                                </Label>
                                <UILoader blocking={false} overlayColor='rgba(115, 103, 240, .1)'>
                                    <Input
                                        disabled={block}
                                        onBlur={(e) => checkWhatsappNumbers(e, dataUser)}
                                        onChange={(e) => { setData({ ...dataUser, no_hp: e.target.value }) }}
                                        id='no_hp' type='number' name='no_hp' placeholder='no_hp' defaultValue={data.no_hp}
                                    />
                                </UILoader>
                            </Col>
                            {
                                data.role !== 'user' ? (
                                    null
                                ) : (
                                    <>
                                        <Col sm='6' className='mb-1'>
                                            <Label className='form-label' for='prodi'>
                                                Prodi
                                            </Label>
                                            <Input
                                                disabled={true}
                                                id='prodi' name='prodi' placeholder='Prodi' defaultValue={data.prodi} />
                                        </Col>
                                        <Col sm='6' className='mb-1'>
                                            <Label className='form-label' for='fakultas'>

                                                Fakultas
                                            </Label>
                                            <Input
                                                disabled={true}
                                                id='fakultas' name='fakultas' placeholder='user' defaultValue={data.fakultas} />
                                        </Col>
                                        <Col sm='6' className='mb-1'>
                                            <Label className='form-label' for='nim'>
                                                Nim
                                            </Label>
                                            <Input
                                                disabled={true}
                                                onChange={(e) => setData({ ...dataUser, nim: e.target.value })}
                                                id='nim' type='number' placeholder='nim' defaultValue={data.nim} />
                                        </Col>
                                        <Col sm='6' className='mb-1'>
                                            <Label className='form-label' for='status'>
                                                Status
                                            </Label>
                                            <Input
                                                disabled={true}
                                                id='status' name='status' placeholder='user' defaultValue={data.role} />
                                        </Col>
                                    </>
                                )
                            }
                            {
                                dataUser.length > 0 && (
                                    <Col className='mt-2' sm='12'>
                                        <Button type='submit' className='me-1' color='primary'>
                                            Simpan Perubahan
                                        </Button>
                                    </Col>
                                )}
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default AccountTabs
