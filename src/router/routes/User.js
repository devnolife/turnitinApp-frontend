import { lazy } from 'react'

const usersRouter = [
    {
        path: '/user/dashboard',
        component: lazy(() => import('../../views/users/Dashboard')),
        meta: {
            action: 'manage',
            resource: 'user'
        }
    }
]

export default usersRouter 