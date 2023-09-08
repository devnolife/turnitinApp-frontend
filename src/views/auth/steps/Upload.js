// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr'
// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback, Spinner } from 'reactstrap'
import axios from "axios"
import { baseUrl } from "../../../@core/auth/jwt/jwtDefaultConfig"

const defaultValues = {
  tanggal_pembayaran: new Date(),
  nama_bank: ''
}

import { tomorrow } from '@utils'
import ToastError from "./ToastError"
import { toast, Slide } from "react-toastify"

const Upload = ({ stepper }) => {
  const [loading, setLoading] = useState(false)
  const [picker, setPicker] = useState(new Date())
  const [selectFie, setSelectedFile] = useState()

  // ** Hooks
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues })

  setValue('tanggal_pembayaran', picker)
  setValue('buktiPembayaran', selectFie)
  const data_ = new FormData()
  data_.append('buktiPembayaran', selectFie)

  const onSubmit = async (data) => {
    if (tomorrow(picker)) {
      toast.error(<ToastError message="Kesalahan Tanggal Pendaftaran" />, {
        icon: false,
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      })
    } else {
      if (data.tanggal_pembayaran === null || data.nama_bank === '' || data.buktiPembayaran === undefined) {
        toast.error(<ToastError message="Mohon isi semua data" />, {
          transition: Slide,
          icon: false,
          hideProgressBar: true,
          autoClose: 2000
        })
      } else {
        setLoading(true)
        await axios.post(`${baseUrl}/api/images/upload-bukti-pembayaran`, data_)
          .then(async (res) => {
            delete data.buktiPembayaran
            if (res) await axios.post(`${baseUrl}/api/user/update-turnitin`, data)
              .then((res) => {
                setLoading(false)
                if (res) stepper.next()
              })
          })
      }
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Upload Bukti Pembayaran</h5>
        <small>Silahkan Upload Bukti Pembayaran.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='nama_bank'>
              Nama Bank
            </Label>
            <Controller
              id='nama_bank'
              name='nama_bank'
              control={control}
              render={({ field }) => (
                <Input invalid={errors.nama_bank && true} {...field} />
              )}
            />
            {errors.nama_bank && <FormFeedback>{errors.nama_bank.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='default-picker'>
              Tanggal Pembayaran
            </Label>
            <Flatpickr className='form-control' value={picker} onChange={([date]) => { setPicker(date) }} id='default-picker' />
          </Col>
        </Row>
        <Row>
          <Col md='12' className='mb-1'>
            <Label className='form-label' for='inputFile'>
              Upload Bukti Pembayaran
            </Label>
            <Input type='file' id='inputFile' name='fileInput' accept='.jpg,.png,.jpeg'
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
          </Button>
          {
            loading ? (
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

export default Upload
