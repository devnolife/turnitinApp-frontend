import { Fragment, useState } from 'react'
import { List } from 'react-feather'
import UserTimeline from '../../component/admin/UserTimeline'
import UserTabs from '../../component/admin/UserTabs'
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from 'reactstrap'


const ListUsers = () => {
    const [active, setActive] = useState('1')

    const toggleTab = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <Fragment>
            <Row className='match-height'>
                <Col lg='4' xs='12'>
                    <Card className='card-user-timeline'>
                        <CardHeader>
                            <div className='d-flex align-items-center'>
                                <List className='user-timeline-title-icon' />
                                <CardTitle tag='h4'>Pendaftaran User Terakhir</CardTitle>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <UserTimeline />
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
                    <UserTabs active={active} toggleTab={toggleTab} />
                </Col>
            </Row>
        </Fragment>
    )
}

export default ListUsers