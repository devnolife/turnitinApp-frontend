
import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const MiscRoutes = [
  {
    path: '/misc/coming-soon',
    component: lazy(() => import('../../views/misc/ComingSoon')),
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/not-authorized',
    component: lazy(() => import('../../views/misc/NotAuthorized')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/maintenance',
    component: lazy(() => import('../../views/misc/Maintenance')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/error',
    component: lazy(() => import('../../views/misc/Error')),
    meta: {
      publicRoute: true
    }
  }
]

export default MiscRoutes