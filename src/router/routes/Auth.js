import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AuthRoutes = [
    {
        path: '/login',
        component: lazy(() => import('../../views/auth/Login')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/register',
        component: lazy(() => import('../../views/auth/Register')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/forgot-password',
        component: lazy(() => import('../../views/auth/ForgotPassword')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/validation-user',
        component: lazy(() => import('../../views/auth/ValidationUser')),
        layout: 'BlankLayout',
        meta: {
            action: 'manage',
            resource: 'user'
        }
    }
]

export default AuthRoutes