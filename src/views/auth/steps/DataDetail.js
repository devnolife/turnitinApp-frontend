import { Fragment, useState, useEffect } from "react"
import Select from "react-select"
import { useForm, Controller } from "react-hook-form"
import { ArrowLeft, ArrowRight } from "react-feather"
import { selectThemeColors } from "@utils"
import axios from "axios"
import { baseUrl } from "../../../@core/auth/jwt/jwtDefaultConfig"
import { Label, Row, Col, Button, Form, Input, FormFeedback, Spinner } from "reactstrap"
import ToastError from "./ToastError"
import { toast, Slide } from "react-toastify"

const defaultValues = {
  nim: ""
}

const DataDetail = ({ stepper }) => {
  const [loading, setLoading] = useState(false)
  const [check, setCheck] = useState(false)
  const [tahapOption, setJenisUjian] = useState([])
  const [fakultasOption, setFakultas] = useState([])
  const [prodiOption, setProdi] = useState([])
  const [fakultasId, setFakultasID] = useState(0)
  const [jenisUjian, setUjian] = useState({
    proposal: null,
    hasil: null,
    tutup: null
  })
  const [prodiId, setProdiID] = useState(0)

  useEffect(async () => {
    await axios.get(`${baseUrl}/api/common/list-ujian`).then((res) => {
      setJenisUjian(res.data)
    })
  }, [])
  useEffect(async () => {
    await axios.get(`${baseUrl}/api/common/list-fakultas`).then((res) => {
      setFakultas(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get(`${baseUrl}/api/common/list-prodi/${fakultasId} `).then((res) => {
      setProdi(res.data)
    })
  }, [fakultasId])

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues })

  const handleValue = (option) => {
    option.map((value) => {
      if (value.value === 1) setUjian({ ...jenisUjian, proposal: 1 })
      if (value.value === 2) setUjian({ ...jenisUjian, hasil: 1 })
      if (value.value === 3) setUjian({ ...jenisUjian, tutup: 1 })
    })
  }

  setValue("prodi_id", prodiId)
  setValue("status_id", check ? 1 : 2)

  const onSubmit = async (data) => {
    if ((Object.keys(jenisUjian).map(key => jenisUjian[key]).filter(Boolean).length) < 1) {
      toast.error(<ToastError message="Silihakan Pilih Tahap Ujian" />, {
        icon: false,
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      })
    } else {
      if (check) {
        if (data.nim === "" || data.fakultas_id === "" || data.prodi_id === "") {
          toast.error(<ToastError message="Lengkapi Data Anda !!" />, {
            icon: false,
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
        } else {
          setLoading(true)
          await axios.post(`${baseUrl}/api/user/create-turnitin`, jenisUjian)
            .then(
              async (res) => {
                if (res) {
                  delete data.proposal
                  delete data.hasil
                  delete data.tutup
                  await axios.post(`${baseUrl}/api/user/update-user`, data)
                    .then((res) => {
                      if (res) {
                        setLoading(false)
                        stepper.next()
                      }
                    })
                    .catch((err) => {
                      setLoading(false)
                      toast.error(<ToastError
                        message={err?.response?.data?.message} />, {
                        icon: false,
                        transition: Slide,
                        hideProgressBar: true,
                        autoClose: 2000
                      })
                    })
                }
              }
            )
            .catch((err) => {
              console.log('errornya', err)
              setLoading(false)
              toast.error(<ToastError message="Gagal Menyimpan Data" />, {
                icon: false,
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000
              })
            })
        }
      } else {
        setLoading(true)
        await axios.post(`${baseUrl}/api/user/create-turnitin`, jenisUjian)
          .then(
            async (res) => {
              if (res) {
                await axios.post(`${baseUrl}/api/user/update-user`, { status_id: Number(data.status_id) })
                  .then((res) => {
                    if (res) {
                      setLoading(false)
                      stepper.next()
                    }
                  })
              }
            }
          )
          .catch(() => {
            setLoading(false)
            toast.error(<ToastError message="Gagal Menyimpan Data" />, {
              icon: false,
              transition: Slide,
              hideProgressBar: true,
              autoClose: 2000
            })
          })
      }
    }
  }

  return (
    <Fragment>
      <Row>
        <Col md="6" sm="12">
          <div className="content-header">
            <h5 className="mb-0">Informasi Data</h5>
            <small>Masukkan Informasi Data Anda.</small>
          </div>
        </Col>
        <Col md="6">
          <Row>
            <Col sm="9">
              <h6>Mahasiswa Unismuh Makassar</h6>
            </Col>
            <Col sm="3">
              <div className="form-switch form-check-primary">
                <Input
                  onClick={() => setCheck(!check)}
                  type="switch"
                  id="switch-primary"
                  name="primary"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="tahapan_id">
              Tahan Ujian
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              isMulti
              className="react-select"
              classNamePrefix="select"
              options={tahapOption}
              onChange={(options) => handleValue(options)}
            />
          </Col>
          {check ? (
            <Col md="6" className="mb-1">
              <Label className="form-label" for="nim">
                Nim
              </Label>
              <Controller
                id="nim"
                name="nim"
                control={control}
                rules={{
                  minLength: 12
                }}
                render={({ field }) => (
                  <Input
                    type="number"
                    invalid={errors.nim && true}
                    {...field}
                  />
                )}
              />
              {errors.nim && <FormFeedback>Nim Minimal 12 Karakter</FormFeedback>}
            </Col>
          ) : (
            <></>
          )}
        </Row>
        <Row>
          {check ? (
            <>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="fakultas_id">
                  Fakultas
                </Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  id={`fakultas_id`}
                  className="react-select"
                  classNamePrefix="select"
                  options={fakultasOption}
                  onChange={e => setFakultasID(e.value)}
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="prodi_id">
                  Prodi
                </Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  id={`prodi_id`}
                  className="react-select"
                  classNamePrefix="select"
                  options={prodiOption}
                  onChange={e => setProdiID(e.value)}
                />
              </Col>
            </>
          ) : (
            <></>
          )}
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Kembali
            </span>
          </Button>
          {
            loading ? (
              <Button
                className='btn-next' type='submit' color='primary'>
                <Spinner color='white' size='sm' className='mr-1' />
                <span lassName='align-middle d-sm-inline-block d-none'>Loading...</span>
              </Button>
            ) : (
              <Button type="submit" color="primary" className="btn-next">
                <span className="align-middle d-sm-inline-block d-none">Selanjutnya</span>
                <ArrowRight
                  size={14}
                  className="align-middle ms-sm-25 ms-0"
                ></ArrowRight>
              </Button>
            )
          }
        </div>
      </Form>
    </Fragment>
  )
}

export default DataDetail
