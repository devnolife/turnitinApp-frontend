
import AuthRoutes from './Auth'
import AdminRoutes from './Admin'
import UserRoutes from './User'
import CommorRoutes from './Common'
import InstrukturRoutes from './Instruktur'
import MiscRoutes from './Misc'
// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/login'

// ** Merge Routes
const Routes = [
  ...AuthRoutes,
  ...AdminRoutes,
  ...UserRoutes,
  ...CommorRoutes,
  ...InstrukturRoutes,
  ...MiscRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
