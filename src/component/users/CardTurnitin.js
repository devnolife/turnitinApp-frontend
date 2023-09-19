import React, { Fragment, useState, useEffect } from 'react'
import Avatar from '@components/avatar'
import { CardBody, Card, CardHeader, Badge, Row, Col, Button, CardTitle, CardText } from 'reactstrap'
import { MessageCircle } from 'react-feather'
import { sendMessageInstuktur } from '../api'
import { getUserData } from '@utils'
import Chart from 'react-apexcharts'
import ChartNilai from './ChartNilai'
const CardTurnitin = ({ dataUser, dataTurnitin, dataInstruktur }) => {
    const { id, role } = getUserData()
    const renderUserImgTable = (item) => {
        if (item.imageProfile !== null) {
            return (
                <div style={{
                    width: '143px',
                    height: '143px',
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
                <div>
                    <Avatar
                        initials
                        color={color}
                        className='rounded'

                        content={item.nama !== null ? item.nama : item.username}
                        contentStyles={{
                            borderRadius: 0,
                            fontSize: 'calc(40px)',
                            width: '100%',
                            height: '100%'
                        }}
                        style={{
                            height: '143px',
                            width: '143px'
                        }}
                    />
                </div>
            )
        }
    }
    const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]

    const [link, setLink] = useState('')
    useEffect(() => {
        sendMessageInstuktur()
            .then(res => {
                setLink(res)
            })
    }, [])

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <Fragment>
            <Card>
                <CardHeader className='d-flex justify-content-between' >
                    <h4 className='card-title'>Data Instruktur</h4>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <div className='d-flex flex-column align-items-center text-center'>
                                <div className='user-info'>
                                    <div className='d-flex justity-content-center'>
                                        {renderUserImgTable(dataInstruktur)}
                                    </div>
                                    <h4 className='text-center mt-2 fw-bold'>{dataInstruktur.nama}</h4>
                                    <Badge color='primary' className='badge-glow me-1' >
                                        Instruktur
                                    </Badge>
                                    {
                                        dataInstruktur.status_akun === 'aktif' ? (
                                            <Badge color='success' className='badge-glow' >
                                                Aktif
                                            </Badge>
                                        ) : (
                                            <Badge color='danger' className='badge-glow' >
                                                Non Aktif
                                            </Badge>
                                        )
                                    }

                                </div>
                                {
                                    role !== 'admin' ? (
                                        <Button
                                            onClick={() => openInNewTab(link)}
                                            className='mt-1' color='success'>
                                            <MessageCircle size={14} />
                                            <span className='align-middle ms-25'>+{dataInstruktur.no_hp}</span>
                                        </Button>
                                    ) : <h5 className='mt-1 w-bolder'>+{dataInstruktur.no_hp}</h5>
                                }
                            </div>
                        </Col>
                    </Row>
                </CardBody>
                <CardBody>
                    <h4 className='fw-bolder border-bottom pb-50 mb-1'>Data Detail</h4>
                    <div className='info-container'>
                        {dataUser !== null ? (
                            <ul className='list-unstyled'>
                                <li className='mb-75'>
                                    <span className='fw-bolder me-25'>Fakultas:</span>
                                    <Badge color={color} className='text-capitalize'>
                                        {dataUser.fakultas}
                                    </Badge>
                                </li>
                                <li className='mb-75'>
                                    <span className='fw-bolder me-25'>Prodi:</span>
                                    <Badge color={states[stateNum + 2]} className='text-capitalize'>
                                        {dataUser.prodi}
                                    </Badge>

                                </li>
                                <li className='mb-75'>
                                    <span className='fw-bolder me-25'>Judul:</span>
                                    <span className='fw-bolder'>{dataUser.judul}</span>
                                </li>
                                <li className='mb-75'>
                                    <span className='fw-bolder me-25'>Tahapan Ujian:</span>
                                    {
                                        dataTurnitin.map((item, index) => {
                                            return (
                                                <Badge
                                                    key={index}
                                                    color={states[stateNum + index]} className='badge-glow ms-1'>
                                                    {item}
                                                </Badge>
                                            )
                                        })
                                    }
                                </li>
                            </ul>
                        ) : null}
                    </div>
                    <div>
                        <h4 className='fw-bolder border-bottom pb-50 mb-1'></h4>
                        <CardHeader>
                            <CardTitle tag='h4'>Nilai Turnitin</CardTitle>
                        </CardHeader>
                        <ChartNilai idUser={id} idProdi={dataUser.prodi_id} />
                    </div>
                </CardBody>
            </Card >
        </Fragment >
    )
}

export default CardTurnitin