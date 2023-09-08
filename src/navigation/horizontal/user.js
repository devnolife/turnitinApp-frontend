import { Home } from 'react-feather'

export default [
    {
        id: 'home',
        title: 'Dashboard',
        icon: <Home size={20} />,
        navLink: '/user/dashboard',
        action: 'manage',
        resource: 'user'
    }
]