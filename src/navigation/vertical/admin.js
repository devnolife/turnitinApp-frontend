import { User, Users, Settings, Home } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/admin/dashboard',
    action: 'manage',
    resource: 'admin'
  },
  {
    id: 'instruktur',
    title: 'Instruktur',
    icon: <User size={20} />,
    navLink: '/admin/instruktur',
    action: 'manage',
    resource: 'admin'
  },
  {
    id: 'users',
    title: 'Users',
    icon: <Users size={20} />,
    navLink: '/admin/users',
    action: 'manage',
    resource: 'admin'
  },
  {
    id: 'setting',
    title: 'Setting',
    icon: <Settings size={20} />,
    navLink: '/admin/setting',
    action: 'manage',
    resource: 'admin'
  }
]
