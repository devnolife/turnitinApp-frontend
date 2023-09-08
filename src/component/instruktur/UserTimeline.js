import Timeline from '@components/timeline'
import { useEffect, useState, Fragment } from 'react'

import { timeline } from '../api'
import moment from 'moment'
import 'moment/locale/id'
import ilustrator from '@src/assets/images/illustration/spinner.gif'
moment.locale('id')

const data = []

const UserTimeline = () => {
    const [loading, setLoading] = useState(false)
    const randomColor = () => {
        const color = ['success', 'danger', 'warning', 'info', 'primary', 'secondary']
        return color[Math.floor(Math.random() * color.length)]
    }
    const [timelineData, setTimelineData] = useState([])

    useEffect(() => {
        setLoading(true)
        timeline()
            .then((res) => {
                setTimelineData(res)
                setLoading(false)
            })
    }, [])

    if (data.length === 0) {
        timelineData.map((item) => {
            data.push({
                id: item.id,
                title: item.username,
                content: item.content,
                meta: moment(item.created_at).startOf('day').fromNow(),
                color: randomColor()
            })
        })
    }

    return (
        <Fragment>
            {
                loading ? (
                    <div
                        style={{
                            height: '65vh'
                        }}
                        className='d-flex align-items-center justify-content-center'>
                        <img src={ilustrator} height={50} />
                    </div>
                ) : (
                    <Timeline data={data} />
                )
            }
        </Fragment>
    )
}

export default UserTimeline
