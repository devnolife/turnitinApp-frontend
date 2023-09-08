import { Link, useHistory } from 'react-router-dom'
import { Fragment, useState } from 'react'
import logo from '@src/assets/images/logo/unismuh-logo.svg'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { X, Check } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Label, Button, Form, Input, FormFeedback, Spinner } from 'reactstrap'
import { toast, Slide } from 'react-toastify'
import '@styles/react/pages/page-authentication.scss'
import axios from 'axios'
import { baseUrl } from '../../@core/auth/jwt/jwtDefaultConfig'

const defaultValues = {
  email: '',
  terms: false,
  username: '',
  password: '',
  no_hp: ''
}

const ToastContentError = ({ message }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='danger' icon={<X size={12} />} />
        <h6 className='toast-title'>Request Error!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        👋 {message}.
      </span>
    </div>
  </Fragment>
)


const ToastContent = ({ username }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title'>Registrasi Berhasil!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        👋 Halo {username} Silahkan Login Kembali, Terima Kasih Telah Bergabung.
      </span>
    </div>
  </Fragment>
)

const Register = () => {
  const [loading, setLoading] = useState(false)
  const { skin } = useSkin()
  const history = useHistory()
  const [blocked, setBlocked] = useState(true)
  const {
    control,
    setError,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v3.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = async (data) => {
    const tempData = { ...data }
    delete tempData.terms
    setLoading(true)
    await axios.post(`${baseUrl}/api/whatsapp/check-number`, { no_hp: tempData.no_hp })
      .then(() => {
        setLoading(true)
        if (Object.values(tempData).every(field => field.length > 0)) {
          setLoading(true)
          const { username, email, password, no_hp } = data
          useJwt
            .register({ username, email, password, no_hp })
            .then(() => {
              setLoading(false)
              toast.success(
                <ToastContent name={data.username} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
              )
              history.push('/login')
            })
            .catch((err) => {
              setLoading(false)
              toast.error(
                <ToastContentError message={err.response?.data?.message || 'Registrasi Bermasalah'} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
              )
            })
        } else {
          for (const key in data) {
            if (data[key].length === 0) {
              setError(key, {
                type: 'manual',
                message: `Please enter a valid ${key}`
              })
            }
            if (key === 'terms' && data.terms === false) {
              setError('terms', {
                type: 'manual'
              })
            }
          }
        }
      })
      .catch(() => {
        setLoading(false)
        toast.error(
          <ToastContentError message="Nomor WhatsApp Tidak Daftar !" />,
          { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
  }


  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img className='' src={logo} alt='logo' height={50} />
          <h2 className='brand-text text-primary ms-1 mt-1'>LIBRARY-UNISMUH</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} clear alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Petualangan dimulai di sini
            </CardTitle>
            <CardText className='mb-2'>Jadikan manajemen turnitin Anda mudah dan menyenangkan!</CardText>

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='register-username'>
                  Username
                </Label>
                <Controller
                  id='username'
                  name='username'
                  control={control}
                  rules={{
                    minLength: 8,
                    validate: value => !/\s/.test(value)
                  }}
                  render={({ field }) => (
                    <Input placeholder='username'
                      invalid={errors.username && true} {...field} />
                  )}
                />
                {errors.username ? <FormFeedback>username minimal berjumlah 8 karakter dan tidak mengandung spasi</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Controller
                  id='email'
                  name='email'
                  control={control}
                  rules={{
                    required: 'Email harus diisi',
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: 'Email tidak valid'
                    }
                  }}
                  render={({ field }) => (
                    <Input type='email' placeholder='email' invalid={errors.email && true} {...field} />
                  )}
                />
                {errors.email ? <FormFeedback>{errors.email.message}</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  rules={{
                    minLength: {
                      value: 8,
                      message: 'Password harus memiliki minimal 8 karakter'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      message: 'Password harus mengandung huruf besar, huruf kecil, dan angka'
                    },
                    required: 'Password harus diisi'
                  }}
                  render={({ field }) => (
                    <>
                      <InputPasswordToggle
                        autoFocus
                        className='input-group-merge'
                        invalid={!!errors.password}
                        {...field}
                      />
                      {errors.password && (
                        <FormFeedback>{errors.password.message}</FormFeedback>
                      )}
                    </>
                  )}
                  onChange={() => clearErrors('password')}
                />

              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-user'>
                  No WhatsApp
                </Label>
                <Controller
                  id='no_hp'
                  name='no_hp'
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <>
                      <Input
                        type='number'
                        invalid={errors.no_hp && true}
                        {...field}
                      />
                      {errors.no_hp && <FormFeedback>No WhatsApp harus diisi</FormFeedback>}

                    </>
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Controller
                  name='terms'
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id='terms' type='checkbox' checked={field.value} invalid={errors.terms && true} />
                  )}
                />
                <Input
                  className='form-check-label' for='terms'
                  onChange={() => setBlocked(!blocked)}
                  type="checkbox" />
                <Label>
                  Saya setuju dengan
                  <a className='ms-25' href='/'>
                    kebijakan & persyaratan privasi
                  </a>
                </Label>
              </div>
              {
                loading ? (
                  <Button
                    type='submit' block color='primary'>
                    <Spinner color='white' size='sm' />
                    <span className='ms-50'>Loading...</span>
                  </Button>
                ) : (
                  <Button
                    disabled={blocked || Object.values(errors).some((error) => error)}
                    type='submit'
                    block
                    color='primary'
                  >
                    Daftar
                  </Button>
                )
              }
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Sudah Punya Akun ?</span>
              <Link to='/login'>
                <span>Silahkan Login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )

}
export default Register
