import { Fragment } from 'react'
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap'
import moment from 'moment'
const CardPembayaran = ({ dataUser }) => {
    moment.locale('id')
    dataUser.tanggalPembayaran = moment(dataUser.tanggalPembayaran).format('LL')
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <h4 className='card-title'>Bukti Pembayaran</h4>
                </CardHeader>
                <CardBody>
                    <h6 className='fw-bolder border-bottom pb-50 mt-2'>Foto Bukti Pembayaran</h6>
                    {
                        dataUser === null ? (
                            <div className='d-flex justify-content-center'>
                                <Spinner
                                    style={{
                                        width: '3rem',
                                        height: '3rem'
                                    }}
                                    color='primary' />
                            </div>
                        ) : (
                            <div className='d-flex justify-content-center'>
                                <img
                                    width='60%'
                                    src={dataUser.imagePembayaran}
                                    alt='bukti pembayaran' />
                            </div>

                        )
                    }
                    <h6 className='fw-bolder border-bottom pb-50 mt-2'>Detail Pembayaran</h6>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column'>
                            <span className='fw-bolder'>Nama Bank : {dataUser.namaBank}</span>
                            <span className='fw-bolder'>Tanggal Pembayaran :{dataUser.tanggalPembayaran}</span>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default CardPembayaran