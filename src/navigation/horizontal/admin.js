import { User, Users, Database, Home } from 'react-feather'

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
    id: 'data',
    title: 'Data',
    icon: <Database size={20} />,
    navLink: '/admin/data',
    action: 'manage',
    resource: 'admin'
  }
]
