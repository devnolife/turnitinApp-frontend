// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import Proptypes from 'prop-types'

// ** Reactstrap Imports
import {
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap'

const BreadCrumbs = ({ breadCrumbTitle, breadCrumbActive, link, name }) => {
  return (
    <div className='content-header row'>
      <div className='content-header-left col-md-9 col-12 mb-2'>
        <div className='row breadcrumbs-top'>
          <div className='col-12'>
            {breadCrumbTitle ? <h2 className='content-header-title float-start mb-0'>{breadCrumbTitle}</h2> : ''}
            <div className='col-12'>
              <Breadcrumb>
                <BreadcrumbItem tag='li'>
                  <Link to={link}>{name}</Link>
                </BreadcrumbItem>
                <BreadcrumbItem tag='li' active>
                  {breadCrumbActive}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>
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
