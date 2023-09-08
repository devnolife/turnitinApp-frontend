import { Doughnut } from 'react-chartjs-2'
import { Server } from 'react-feather'// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

import { useState, useEffect } from 'react'
import { dataDashboard } from '../api/index'
const ChartjsRadarChart = ({ tooltipShadow }) => {
  const [dataFakultas, setData] = useState({})

  useEffect(async () => {
    await dataDashboard()
      .then((res) => {
        setData(res.fakultas)
      })
  }, [])
  const options = {
    maintainAspectRatio: false,
    cutout: 60,
    animation: {
      resize: {
        duration: 500
      }
    },
    plugins: {
      legend: { display: false },
      tooltips: {
        callbacks: {
          label(context) {
            console.log(context)
            const label = context.label || ''
            if (label) {
              label += 'Ronak: '
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y)
            }
            return label
          }
        },
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: tooltipShadow,
        backgroundColor: '#fff',
        titleFontColor: '#000',
        bodyFontColor: '#000'
      }
    }
  }

  const randomColor = () => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgb(${r},${g},${b})`
  }

  //change value of data from dataFakultas


  const data = {
    datasets: [
      {
        labels: [],
        data: [],
        backgroundColor: [],
        borderWidth: 0,
        pointStyle: 'rectRounded'
      }
    ]
  }

  Object.keys(dataFakultas).map((key) => {
    data.datasets[0].labels.push(key)
    data.datasets[0].data.push(dataFakultas[key])
    data.datasets[0].backgroundColor.push(randomColor())
  })

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <CardTitle className='center' tag='h4'>User Aktif Fakultas</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ height: '200px' }}>
          <Doughnut data={data} options={options} height={275} />
        </div>
        {
          Object.keys(dataFakultas).map((key) => {
            return (
              <div key={key} className='d-flex align-items-center justify-content-between mt-1'>
                <div className='d-flex align-items-center'>
                  <span
                    className='fw-bolder'>{key}</span>
                </div>
                <div
                  className='fw-bolder'>{dataFakultas[key]}
                </div>
              </div>
            )
          })
        }
      </CardBody>
    </Card>
  )
}

export default ChartjsRadarChart
