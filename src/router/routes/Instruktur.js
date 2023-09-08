import { lazy } from 'react'

const InstrukturRoutes = [
    {
        path: '/instruktur/dashboard',
        component: lazy(() => import('../../views/instruktur/Dashboard')),
        meta: {
            action: 'manage',
            resource: 'instruktur'
        }
    },
    {
        path: '/instruktur/users-detail/:id',
        component: lazy(() => import('../../views/instruktur/ListUsersDetail')),
        exact: true,
        meta: {
            action: 'manage',
            resource: 'instruktur'
        }
    }

]

export default InstrukturRoutes