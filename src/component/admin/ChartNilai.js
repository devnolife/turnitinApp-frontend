import { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardText, CardTitle, Row, Col } from 'reactstrap'
import Chart from 'react-apexcharts'
import { nilaiTurnitinUser } from '../api'
import ilustrator from '@src/assets/images/illustration/wait.gif'
import { capatalize } from '@utils'
const ChartNilai = ({ id }) => {
    const [nilai, setNilai] = useState([])
    const [data, setData] = useState({})
    const [persen, setPersen] = useState([])

    useEffect(() => {
        nilaiTurnitinUser(id)
            .then((res) => {
                setNilai(res.nilai)
                setData(res)
                setPersen([res.persen])
            })
    }, [])
    const options = {
        chart: {
            sparkline: {
                enabled: true
            },
            dropShadow: {
                enabled: true,
                blur: 3,
                left: 1,
                top: 1,
                opacity: 0.1
            }
        },
        colors: ['#0074FF'],
        plotOptions: {
            radialBar: {
                offsetY: 10,
                startAngle: -150,
                endAngle: 150,
                hollow: {
                    size: '77%'
                },
                track: {
                    background: '#ebe9f1',
                    strokeWidth: '50%'
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        color: '#5e5873',
                        fontFamily: 'Montserrat',
                        fontSize: '2.86rem',
                        fontWeight: '600'
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#3CADDE', '#51e5a8', '#51e5a8'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: 'round'
        },
        grid: {
            padding: {
                bottom: 30
            }
        }
    }

    return (
        <Fragment>
            {
                data.length > 1 ? (
                    <Card>
                        <CardBody className='d-flex justify-content-center'>
                            <img src={ilustrator} height={300} />
                        </CardBody>
                    </Card >
                ) : (
                    <Card>

                        <CardBody className='p-0'>
                            <Chart options={options} series={persen} type='radialBar' height={245} />
                        </CardBody>
                        <Row className='border-top text-center mx-0'>
                            {
                                Object.keys(nilai).map((key, index) => {
                                    return (
                                        <Col xs={`${data.div}`} className='border-end py-1' key={index}>
                                            <CardText className='text-muted mb-0'>{capatalize(key)}</CardText>
                                            <h2 className='fw-bolder mb-0'>{
                                                nilai[key].nilai === null ? 0 : nilai[key].nilai
                                            }</h2>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Card>

                )
            }
        </Fragment >
    )
}

export default ChartNilai