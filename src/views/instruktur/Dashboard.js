import { Fragment, useState } from 'react'
import { NavMobile, UserTimeline, CardInfo } from '../../component/instruktur'
import { Row, Col, Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { List } from 'react-feather'
import UserTabs from '../../component/instruktur/UserTabs'
import BreadCrumbs from '../../component/common/BreadCrumbs'
// import ProfileHeader from '../../component/instruktur/ProfileHeader'
const Dashboard = () => {
    const [active, setActive] = useState('1')

    const toggleTab = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }
    return (
        <Fragment>
            {/* <NavMobile /> */}

            <BreadCrumbs
                breadCrumbTitle='Dashboard'
                breadCrumbParent='Instruktur'
                breadCrumbActive='Users'
                link={'/instruktur/dashboard'}
                name={'Instruktur'}
            />
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

export default Dashboard