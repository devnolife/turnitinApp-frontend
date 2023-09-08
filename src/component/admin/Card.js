import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'
import { Check, UserCheck, UserX } from 'react-feather'
import { useParams } from 'react-router-dom'
import Avatar from '@components/avatar'
import { instrukturDetail } from '../api'

const CardUser = () => {
    const { id } = useParams()
    const [data, setData] = useState([])
    useEffect(() => {
        instrukturDetail(id)
            .then(data => {
                setData(data)
            })
    }, [])
    const renderUserImg = (item) => {
        if (item.image !== null) {
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
                        src={item.image}
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
                    content={item.nama}
                    contentStyles={{
                        borderRadius: 0,
                        fontSize: 'calc(48px)',
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
                data.length > 0 ? (
                    <div>
                        <h1>Spinner dsini</h1>
                    </div>
                ) : (
                    <Card>
                        <CardBody>
                            <div className='user-avatar-section'>
                                <div className='d-flex align-items-center flex-column'>
                                    {renderUserImg(data)}
                                    <div className='d-flex flex-column align-items-center text-center'>
                                        <div className='user-info'>
                                            <h4>{data !== null ? data.nama : 'Eleanor Aguilar'}</h4>
                                            {data !== null ? (
                                                <Badge color='info' className='text-capitalize'>
                                                    {data.role}
                                                </Badge>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-around my-2 pt-75 '>
                                <div className='d-flex flex-column justify-content-center align-items-center '>
                                    <div className='d-flex justify-content-center align-items-center mb-1'>
                                        <Badge color='light-danger' className='rounded p-75'>
                                            <UserX className='font-medium-2' />
                                        </Badge>
                                        <div className='ms-75'>
                                            <h4 className='mb-0 fw-bold'>{data.non_aktif}</h4>
                                        </div>
                                    </div>
                                    <small>Users Non Aktif</small>
                                </div>
                                <div className='d-flex flex-column justify-content-center align-items-center '>
                                    <div className='d-flex justify-content-center align-items-center mb-1 '>
                                        <Badge color='light-primary' className='rounded p-75'>
                                            <Check className='font-medium-2' />
                                        </Badge>
                                        <div className='ms-75'>
                                            <h4 className='mb-0 fw-bold'>{data.aktif}</h4>
                                        </div>
                                    </div>
                                    <small>Users Aktif</small>
                                </div>
                                <div className='d-flex flex-column justify-content-center align-items-center  '>
                                    <div className='d-flex justify-content-center align-items-center mb-1'>
                                        <Badge color='light-success' className='rounded p-75'>
                                            <UserCheck className='font-medium-2' />
                                        </Badge>
                                        <div className='ms-75'>
                                            <h4 className='mb-0 fw-bold'>{data.lulus}</h4>
                                        </div>
                                    </div>
                                    <small>Users Lulus</small>
                                </div>
                            </div>
                            <h4 className='fw-bolder border-bottom pb-50 mb-1'>Detail Data:</h4>
                            <div className='info-container'>
                                {data !== null ? (
                                    <ul className='list-unstyled'>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>ID Instruktur:</span>
                                            <span>{data.id}</span>
                                        </li>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Username:</span>
                                            <span>{data.username}</span>
                                        </li>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Nama:</span>
                                            <span>{data.nama}</span>
                                        </li>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Email:</span>
                                            <span>{data.email}</span>
                                        </li>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Status:</span>
                                            {
                                                data.status_akun === 'aktif' ? (
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
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Role:</span>
                                            <span className='text-capitalize'>{data.role}</span>
                                        </li>

                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>No Hp(WhatsApp):</span>
                                            <span>{data.no_hp}</span>
                                        </li>

                                    </ul>
                                ) : null}
                            </div>
                        </CardBody>
                    </Card>

                )
            }
        </Fragment>
    )
}

export default CardUser