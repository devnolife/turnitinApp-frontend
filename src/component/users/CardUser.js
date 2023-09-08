import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardBody, Button, Badge, Spinner } from 'reactstrap'
import { Check } from 'react-feather'
import ilustrator from '@src/assets/images/illustration/spinner.gif'
import Avatar from '@components/avatar'
import { userDetail } from '../api/index'

const CardUsers = () => {
    const [dataUser, setData] = useState([])
    const [relod, setRelodData] = useState(false)

    useEffect(async () => {
        await userDetail()
            .then((res) => {
                setData(res)
                setRelodData(true)
            })
    }, [relod])


    const renderUserImg = (item) => {
        if (item.imageProfile !== null) {
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
                        src={item.imageProfile}
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
                    content={item.nama !== null ? item.nama : item.username}
                    contentStyles={{
                        borderRadius: 0,
                        fontSize: 'calc(40px)',
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
                relod === false ? (
                    <div
                        style={{
                            height: '65vh'
                        }}
                        className='d-flex align-items-center justify-content-center'>
                        <img src={ilustrator} height={60} />
                    </div>
                ) : (
                    <Card >
                        <CardBody style={{ padding: '3' }} className='align-items-center justify-content-center'
                        >
                            <div className='user-avatar-section'>
                                <div className='d-flex align-items-center flex-column'>
                                    {renderUserImg(dataUser)}
                                    <div className='d-flex flex-column align-items-center text-center'>
                                        <div className='user-info'>
                                            <h4>{dataUser.nama}</h4>
                                            {dataUser.status !== '"mahasiswa-unismuh' ? (
                                                <Badge color='info' className='mt-1' >
                                                    Mahasiswa Unismuh
                                                </Badge>
                                            ) : <Badge color='success' className='text-capitalize'>
                                                Non Unismuh
                                            </Badge>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h4 className='fw-bolder border-bottom pb-50 mt-2'>Detail Data</h4>
                            <div className='info-container'>
                                {dataUser !== null ? (
                                    <ul className='list-unstyled'>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>ID :</span>
                                            <span>{dataUser.id}</span>
                                        </li>

                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Username:</span>
                                            <span>{dataUser.username}</span>
                                        </li>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Nama:</span>
                                            <span>{dataUser.nama}</span>
                                        </li>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Email:</span>
                                            <span>{dataUser.email}</span>
                                        </li>
                                        <li className='mb-75'>
                                            <span className='fw-bolder me-25'>Status:</span>
                                            {
                                                dataUser.status_akun === 'aktif' ? (
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
                                        <li>
                                            <span className='fw-bolder me-25'>No Hp(WhatsApp):</span>
                                            <Badge color='light-success' className='text-capitalize'>
                                                {dataUser.no_hp}
                                            </Badge>
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

export default CardUsers