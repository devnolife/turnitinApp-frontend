// ** React Imports
import { useEffect, useState } from 'react'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Third Party Components
import classnames from 'classnames'

const BlankLayout = ({ children }) => {
  // ** States
  const [isMounted, setIsMounted] = useState(false)

  // ** Hooks
  const { skin } = useSkin()

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={classnames('blank-page', {
        'dark-layout': skin === 'dark'
      })}
    >
      <div className='app-content content'>
        <div className='content-wrapper'>
          <div className='content-body'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default BlankLayout
