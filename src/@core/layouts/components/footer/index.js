// ** Icons Import
import { Heart, ArrowUp } from 'react-feather'
const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='' target='_blank' rel='noopener noreferrer'>
          Univeritas Muhammadiyah Makassar
        </a>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
      </span>
      <span className='float-md-end d-none d-md-block'>
        devnolife
        <Heart size={14} />
      </span>
    </p>
  )
}

export default Footer
