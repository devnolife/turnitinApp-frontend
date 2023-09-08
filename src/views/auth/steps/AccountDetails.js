// ** React Imports
import { Fragment, useState } from 'react'
import axios from 'axios'
import { isObjEmpty, tomorrow } from '@utils'
import { useForm, Controller } from 'react-hook-form'
import { Power, ArrowRight } from 'react-feather'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr'
import { baseUrl } from "../../../@core/auth/jwt/jwtDefaultConfig"
import ToastError from "./ToastError"
import { toast, Slide } from "react-toastify"
import { Form, Label, Input, Row, Col, Button, FormFeedback, Spinner } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

const defaultValues = {
  nama: '',
  tgl_pendaftaran: '',
  judul: ''
}

const AccountDetails = ({ stepper }) => {
  const [loadin, setLoading] = useState(false)
  const [picker, setPicker] = useState(new Date())
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  setValue('tgl_pendaftaran', picker)

  const onSubmit = async (data) => {
    if (tomorrow(picker)) {
      toast.error(<ToastError message="Kesalahan Tanggal Pendaftaran" />, {
        icon: false,
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      })
    } else {
      if (isObjEmpty(errors)) {
        setLoading(true)
        await axios.post(`${baseUrl}/api/user/create-turnitin`, data)
          .then(res => {
            setLoading(false)
            if (res) stepper.next()
          })
          .catch(err => {
            setLoading(false)
            toast.error(<ToastError message={err.message} />, {
              icon: false,
              transition: Slide,
              hideProgressBar: true,
              autoClose: 2000
            })
          })
      } else {
        toast.error(<ToastError message="Lengkapi Data Anda !!" />, {
          icon: false,
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
      }
    }
  }
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Akun Detail</h5>
        <small className='text-muted'>Masukkan Informasi Detail Akun Anda.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='name'>
              Nama Lengkap
            </Label>
            <Controller
              id='nama'
              name='nama'
              control={control}
              rules={{
                required: 'Nama Lengkap Harus Diisi',
                minLength: {
                  value: 3,
                  message: 'Nama Lengkap Minimal 3 Karakter'
                }
              }}
              render={({ field }) => <Input
                invalid={errors.nama && true} {...field}
              />}
            />
            {errors.nama && <FormFeedback>{errors.nama.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='default-picker'>
              Tanggal Pendaftaran
            </Label>
            <Flatpickr className='form-control' value={picker} onChange={([date]) => { setPicker(date) }} id='default-picker' />
          </Col>
        </Row>
        <Row>
          <div className='form-judul-toggle  mb-1'>
            <Label className='form-label' for='judul'>
              Judul Skripsi
            </Label>
            <Controller
              id='judul'
              name='judul'
              control={control}
              rules={{
                required: 'Judul Skripsi Harus Diisi',
                minLength: {
                  value: 15,
                  message: 'Judul Skripsi Minimal 15 Karakter'
                }
              }}
              render={({ field }) => <Input type='textarea' invalid={errors.judul && true} {...field} />}
            />
            {errors.judul && <FormFeedback>{errors.judul.message}</FormFeedback>}
          </div>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button
            tag={Link}
            to='/login'
            onClick={() => dispatch(handleLogout())}
            color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none mr-1'>Keluar</span>
            <Power
              size={14} className='align-middle ms-sm-25 ms-2'></Power>
          </Button>
          {
            loadin ? (
              <Button
                className='btn-next' type='submit' color='primary'>
                <Spinner color='white' size='sm' className='mr-1' />
                <span lassName='align-middle d-sm-inline-block d-none'>Loading...</span>
              </Button>
            ) : (
              <Button type='submit' color='primary' className='btn-next'>
                <span className='align-middle d-sm-inline-block d-none'>Selanjutnya</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
              </Button>
            )
          }
        </div>
      </Form>
    </Fragment>
  )
}

export default AccountDetails
