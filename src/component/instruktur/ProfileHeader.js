import { Card } from 'reactstrap'
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const ProfileHeader = ({ }) => {
    const data = {}
    data.username = 'Rizky'
    data.designation = 'Instruktur'
    return (
        <Card className='profile-header mb-2'>
            <div className='profile-img-container d-flex align-items-center'>
                <div className='profile-img'>
                    <img className='rounded img-fluid' src={defaultAvatar} alt='Card image' />
                </div>
                <div className='profile-title ms-3'>
                    <h2 className='text-white'>{data.username}</h2>
                    <p className='text-white'>{data.designation}</p>
                </div>
            </div>
        </Card>
    )
}

export default ProfileHeader
