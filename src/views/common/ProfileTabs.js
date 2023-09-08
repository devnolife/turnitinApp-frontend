import { Fragment, useState, useEffect } from 'react'
import { Spinner, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import Profile from '../../component/common/Profile'
import ChangePasswords from '../../component/common/ChangePasswords'
import { profile } from '../../component/api'
import BreadCrumbs from '../../component/common/BreadCrumbs'
const ProfileTabs = () => {

    const [data, setData] = useState(null)
    useEffect(() => {
        profile()
            .then((res) => {
                console.log("masuk disini ? ")
                setData(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <Fragment>
            {data !== null ? (
                <div>
                    <BreadCrumbs breadCrumbTitle='Profile' breadCrumbActive='Profile' user={data.role} />
                    <Profile data={data} />
                    <ChangePasswords />
                </div>
            ) : (
                <div className='text-center'>
                    <Spinner
                        style={{
                            width: '5rem',
                            height: '5rem'
                        }}
                        color='primary' />
                </div>
            )}
        </Fragment>
    )
}

export default ProfileTabs
