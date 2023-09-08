//** React Imports
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { handleLayout, handleLastLayout } from '@store/layout'
// import { getUserData } from '@utils'
export const useLayout = () => {
  // ** Hooks

  const dispatch = useDispatch()
  const store = useSelector(state => state.layout)

  const setLayout = value => {
    dispatch(handleLayout(value))
  }
  const setLastLayout = value => {
    dispatch(handleLastLayout(value))
  }


  // const handleLayoutUpdate = useCallback(() => {
  //   // ** If layout is horizontal & screen size is equals to or below 1200
  //   if (store.layout === 'horizontal' && window.innerWidth <= 1200) {
  //     setLayout('vertical')
  //     setLastLayout('horizontal')
  //   }
  //   // ** If lastLayout is horizontal & screen size is equals to or above 1200
  //   if (store.lastLayout === 'horizontal' && window.innerWidth >= 1200) {
  //     setLayout('horizontal')
  //   }
  // }, [])

  // // ** ComponentDidMount
  // useEffect(() => {
  //   handleLayoutUpdate()
  // }, [])

  // useEffect(() => {
  //   // ** Window Resize Event
  //   window.addEventListener('resize', handleLayoutUpdate)
  // }, [store.layout, store.lastLayout])

  if (window) {
    const breakpoint = 1200

    if (window.innerWidth < breakpoint) {
      setLayout('vertical')
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth <= breakpoint && store.lastLayout !== 'vertical' && store.layout !== 'vertical') {
        setLayout('vertical')
      }
      if (window.innerWidth >= breakpoint && store.lastLayout !== store.layout) {
        setLayout(store.lastLayout)
      }
    })
  }

  return { layout: store.layout, setLayout, lastLayout: store.lastLayout, setLastLayout }
}
