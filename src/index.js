import React, { Suspense, lazy, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import ability from './configs/acl/ability'
import { ToastContainer } from 'react-toastify'
import { AbilityContext } from './utility/context/Can'
import { ThemeContext } from './utility/context/ThemeColors'
import Spinner from './@core/components/spinner/Fallback-spinner'

import './@core/components/ripple-button'

import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '@styles/react/libs/toastify/toastify.scss'
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'
import { isUserTokenExpired } from '@utils'

import * as serviceWorker from './serviceWorker'

const LazyApp = lazy(() => import('./App'))

const App = () => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const isToken = await isUserTokenExpired()
        if (!isToken) {
          localStorage.clear()
        }
      } catch (error) {
        console.log(error)
      }
    }
    checkToken()
  }, [])

  return (
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <AbilityContext.Provider value={ability}>
          <ThemeContext>
            <LazyApp />
            <ToastContainer newestOnTop />
          </ThemeContext>
        </AbilityContext.Provider>
      </Suspense>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
