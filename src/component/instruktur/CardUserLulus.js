// ** Icons Imports
import { Award } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Row, Col, Button } from 'reactstrap'

// ** Images
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'

const CardCongratulations = ({ dataUser }) => {
    const { status_akun, nama, username, nim } = dataUser
    const dataBab = {
        bab1: {
            id: 1,
            nama: 'BAB I',
            status: 'lulus'
        },
        bab2: {
            id: 2,
            nama: 'BAB II',
            status: 'lulus'
        },
        bab3: {
            id: 3,
            nama: 'BAB III',
            status: 'lulus'
        },
        bab4: {
            id: 4,
            nama: 'BAB IV',
            status: 'lulus'
        },
        bab5: {
            id: 5,
            nama: 'BAB IV',
            status: 'lulus'
        }
    }
    return (
        <div>
            {
                status_akun === 'lulus' ? (
                    <div>
                        <Card className='card-congratulations' >
                            <CardBody className='text-center'>
                                <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
                                <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
                                <Avatar icon={<Award size={28} />} className='shadow' color='primary' size='xl' />
                                <div className='text-center'>
                                    <h1 className='mb-1 text-white'>Congratulations {
                                        nama !== null ? nama : username
                                    }</h1>
                                    <CardText className='m-auto w-75'>
                                        Hasil plagiasi BAB I-V  telah dinyatakan LULUS
                                    </CardText>
                                    <p>
                                        Silahkan ke Perpustakaan lantai 2 untuk memperoleh <strong>Hasil Print Plagiat</strong> dan
                                        Stempel serta <strong>TTD SURAT KETERANGAN BEBAS PLAGIASI</strong>  di lantai 1 bagian pelayanan
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                {
                                    Object.keys(dataBab).map((key, index) => {
                                        return (
                                            <Row key={index}>
                                                <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing'>
                                                    <div>
                                                        <div className='logo-wrapper'>
                                                            <h4 className='text-primary fw-bold'>{dataBab[key].nama}</h4>
                                                        </div>
                                                        <h6>{
                                                            nama !== null ? nama : username
                                                        },{
                                                                nim !== null ? nim : username
                                                            }
                                                        </h6>
                                                    </div>
                                                    <div >
                                                        <Button.Ripple color='primary' className='mr-1'>
                                                            <span className='align-middle ml-50'>Download File</span>
                                                        </Button.Ripple>
                                                    </div>
                                                </div>
                                                <hr className='invoice-spacing' />
                                            </Row>
                                        )
                                    })
                                }

                            </CardBody>
                        </Card>
                    </div>
                ) : (
                    <Card>
                        <Row>
                            <Col md='8' sm='12'>
                                <CardBody>
                                    <CardTitle tag='h4'>Hasil Akhir</CardTitle>
                                    <CardText>
                                        User belum melakukan prosess penguploadan hasil akhir turnitin
                                    </CardText>
                                </CardBody>
                                <CardBody>
                                    <h4 className='fw-bolder border-bottom pb-200 mb-1'>Data Detail</h4>
                                </CardBody>
                            </Col>
                            <Col md='4' sm='12'>
                                <div className='d-flex align-items-center h-100'>
                                    <div className='w-100 text-center'>
                                        <h1 className='mb-1 text-primary'>0%</h1>
                                        <CardText className='m-auto w-75'>
                                            Hasil Akhir
                                        </CardText>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                )
            }
        </div>
    )
}

export default CardCongratulations
