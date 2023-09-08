// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import Proptypes from 'prop-types'

// ** Reactstrap Imports
import {
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap'

const BreadCrumbs = ({ breadCrumbTitle, breadCrumbActive, user }) => {
  return (
    <div>
      {breadCrumbTitle ? <h4 className='content-header-title float-start mb-0 '>{breadCrumbTitle}</h4> : ''}
      <div>
        <Breadcrumb >
          <BreadcrumbItem tag='li'>
            <Link to={`/${user}/dashboard`}>Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbItem tag='li' active>
            {breadCrumbActive}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  )
}
export default BreadCrumbs

// ** PropTypes
BreadCrumbs.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired
}
