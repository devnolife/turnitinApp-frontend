import { lazy } from 'react'

const CommonRoutes = [
    {
        path: '/pages/profile',
        component: lazy(() => import('../../views/common/ProfileTabs')),
        meta: {
            commonRoute: true
        }
    }
]

export default CommonRoutes 