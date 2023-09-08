import { useState, useEffect } from 'react'
import classnames from 'classnames'
import { Users, User, UserX, UserPlus, UserCheck } from 'react-feather'
import Avatar from '@components/avatar'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { dataDashboard } from '../api/index'
import moment from 'moment'
import 'moment/locale/id'
moment.locale('id')
const StatsCard = ({ cols }) => {

  const [countUser, setCount] = useState({})
  const [lastUpdate, setTime] = useState('')
  useEffect(async () => {
    await dataDashboard()
      .then((res) => {
        setCount(res.countUsers)
        setTime(moment(res.timeLastUpdate).fromNow())
      })
  }, [])

  const data = [
    {
      title: countUser.aktif,
      subtitle: 'User Aktif',
      color: 'light-primary',
      icon: <Users size={24} />
    },
    {
      title: countUser.non_aktif,
      subtitle: 'User Non Aktif',
      color: 'light-danger',
      icon: <UserX size={24} />
    },
    {
      title: countUser.pendaftar,
      subtitle: 'Pendaftar',
      color: 'light-success',
      icon: <UserPlus size={24} />
    },
    {
      title: countUser.lulus,
      subtitle: 'User Lulus',
      color: 'light-success',
      icon: <UserCheck size={24} />
    }
  ]
  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Statik Data User</CardTitle>
        <CardText className='card-text font-small-2 me-25'>Update {lastUpdate}</CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
