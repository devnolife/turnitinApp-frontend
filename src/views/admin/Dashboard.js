import React, { useContext } from 'react'
import { Row, Col } from 'reactstrap'
import StatsCard from '../../component/admin/StaticCard'
import ApexLineChart from '../../component/admin/ApexLineChart'
import ChartjsRadarChart from '../../component/admin/ChartjsDoughnutChart'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/charts/recharts.scss'
// ** Styles

import { ThemeColors } from '@src/utility/context/ThemeColors'


const Dashboard = () => {
    const tooltipShadow = 'rgba(0, 0, 0, 0.25)', warningLightColor = '#FDAC34', successColorShade = '#28dac6'
    const { colors } = useContext(ThemeColors)
    return (
        <div id='dashboard-ecommerce'>
            <Row className='match-height'>
                <Col lg='12' md='12' sm='12'>
                    <StatsCard cols={{ xl: '3', sm: '6' }} />
                </Col>
                <Col lg='9' md='9' sm='9'>
                    <ApexLineChart warning={colors.primary.main} />
                </Col>
                <Col lg='3' sm='3'>
                    <ChartjsRadarChart
                        tooltipShadow={tooltipShadow}
                        successColorShade={successColorShade}
                        warningLightColor={warningLightColor}
                        primary={colors.primary.main}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard