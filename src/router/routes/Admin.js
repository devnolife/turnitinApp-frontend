import { lazy } from 'react'

const RootRoutes = [
    {
        path: '/admin/dashboard',
        component: lazy(() => import('../../views/admin/Dashboard')),
        meta: {
            action: 'manage',
            resource: 'admin'
        }

    },
    {
        path: '/admin/instruktur',
        component: lazy(() => import('../../views/admin/ListInstruktur')),
        exact: true,
        meta: {
            action: 'manage',
            resource: 'admin'
        }
    },
    {
        path: '/admin/instruktur/detail/:id',
        component: lazy(() => import('../../views/admin/InstrukturDetail.js')),
        meta: {
            navLink: '/admin/instruktur',
            action: 'manage',
            resource: 'admin'
        }
    },
    {
        path: '/admin/users',
        component: lazy(() => import('../../views/admin/ListUsers')),
        exact: true,
        meta: {
            action: 'manage',
            resource: 'admin'
        }
    },
    {
        path: '/admin/users/detail/:id',
        component: lazy(() => import('../../views/admin/ListUsersDetail')),
        exact: true,
        meta: {
            navLink: '/admin/users',
            action: 'manage',
            resource: 'admin'
        }
    }

]

export default RootRoutes