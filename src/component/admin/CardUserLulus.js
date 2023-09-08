import { Fragment } from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'
import Chart from 'react-apexcharts'
const CardUserLulus = () => {
    const options = {
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 20,
                    size: "60%"
                },
                dataLabels: {
                    showOn: "always",
                    name: {
                        offsetY: -10,
                        show: true,
                        color: "#888",
                        fontSize: "13px"
                    },
                    value: {
                        color: "#111",
                        fontSize: "20px",
                        show: true
                    }
                }
            }
        },
        stroke: {
            lineCap: "round"
        },
        labels: ["Progres"]
    }, series = [67]
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <h4 className='card-title'>User Lulus</h4>
                </CardHeader>
                <CardBody className='p-0'>
                    <Chart
                        options={options}
                        series={series}
                        type='radialBar'
                        height={100}
                    />
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default CardUserLulus