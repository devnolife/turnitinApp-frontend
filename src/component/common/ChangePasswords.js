import { Fragment, useState } from 'react'
import { Row, Col, Card, Form, Button, CardBody, CardTitle, CardHeader, FormFeedback, Spinner } from 'reactstrap'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputPasswordToggle from '@components/input-password-toggle'
import { toast, Slide } from "react-toastify"
import { ToastError, ToastSuccees } from '../auth/toast'
import { changePassword } from '../api'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} tidak boleh kosong`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} setidaknya harus ${min} karakter`
  } else {
    return ''
  }
}

const defaultValues = {
  newPassword: '',
  currentPassword: '',
  retypeNewPassword: ''
}


const ChangePasswords = () => {
  const [loading, setLoading] = useState(false)
  const SignupSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Kata sandi harus mengandung huruf besar, huruf kecil, dan angka tanpa spasi')
      .min(8, obj => showErrors('Kata sandi saat ini', obj.value.length, obj.min))
      .required(),
    newPassword: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Kata sandi harus mengandung huruf besar, huruf kecil, dan angka tanpa spasi')
      .min(8, obj => showErrors('Kata sandi baru', obj.value.length, obj.min))
      .required(),
    retypeNewPassword: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Kata sandi harus mengandung huruf besar, huruf kecil, dan angka tanpa spasi')
      .min(8, obj => showErrors('Ketik ulang kata sandi baru', obj.value.length, obj.min))
      .required()
      .oneOf([yup.ref(`newPassword`), null], 'Kata Sandi harus sama')
  })
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = data => {
    setLoading(true)
    if (Object.values(data).every(field => field.length > 0)) {
      delete data.retypeNewPassword
      changePassword(data)
        .then((res) => {
          setLoading(false)
          toast.success(
            <ToastSuccees message={res.message} />,
            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        })
        .catch((err) => {

          setLoading(false)
          toast.error(
            <ToastError message={err.response.data.fullError} />,
            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        })
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Ganti Kata Sandi</CardTitle>
        </CardHeader>
        <CardBody className='pt-1'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='currentPassword'
                  name='currentPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Kata Sandi Saat Ini'
                      htmlFor='currentPassword'
                      className='input-group-merge'
                      invalid={errors.currentPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.currentPassword && (
                  <FormFeedback className='d-block'>{errors.currentPassword.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='newPassword'
                  name='newPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Kata Sandi Baru'
                      htmlFor='newPassword'
                      className='input-group-merge'

                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.newPassword && <FormFeedback className='d-block'>{errors.newPassword.message}</FormFeedback>}
              </Col>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='retypeNewPassword'
                  name='retypeNewPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Ulangi Kata Sandi Baru'
                      htmlFor='retypeNewPassword'
                      className='input-group-merge'
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.retypeNewPassword && (
                  <FormFeedback className='d-block'>{errors.retypeNewPassword.message}</FormFeedback>
                )}
              </Col>
              <Col xs={12}>
                <p className='fw-bolder'>Persyaratan Kata Sandi:</p>
                <ul className='ps-1 ms-25'>
                  <li className='mb-50'>Panjang minimum 8 karakter - semakin banyak, semakin baik</li>
                  <li className='mb-50'>Setidaknya satu karakter huruf kecil</li>
                  <li>Setidaknya satu karakter huruf besar dan angka tanpa spasi</li>
                </ul>
              </Col>

            </Row>
            <div className='mt-1 d-flex justify-content-end'>
              {
                loading ? (
                  <Button.Ripple className='me-1' color='primary' disabled>
                    <Spinner color='white' size='sm' />
                    <span className='ms-50'>Loading...</span>
                  </Button.Ripple>
                ) : (
                  <Button type='submit' className='me-1' color='primary'>
                    Simpan Perubahan
                  </Button>
                )
              }
            </div>
          </Form>
        </CardBody>
      </Card>
    </Fragment >
  )
}

export default ChangePasswords
