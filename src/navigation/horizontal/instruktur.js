import { Home, Users } from 'react-feather'

export default [
    {
        id: 'home',
        title: 'Dashboard',
        icon: <Home size={20} />,
        navLink: '/instruktur/dashboard',
        action: 'manage',
        resource: 'instruktur'
    },
    {
        id: 'users',
        title: 'Users',
        icon: <Users size={20} />,
        navLink: '/instruktur/users',
        action: 'manage',
        resource: 'instruktur'
    }
]