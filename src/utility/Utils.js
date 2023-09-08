import axios from 'axios'

import moment from "moment"
import Avatar from '@components/avatar'
import { baseUrl } from '../@core/auth/jwt/jwtDefaultConfig'
export const checkUsername = (username) => {
  //lengh min 8
  if (username.length < 8) return false
  const regex = /^[a-zA-Z0-9]+$/
  return regex.test(username)
}
// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
export const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

export const renderUserImgTable = (item) => {
  if (item.imageProfile !== null) {
    return (
      <div style={{
        width: '35px',
        height: '35px',
        overflow: 'hidden',
        borderRadius: '3px'
      }}>
        <img
          style={{
            width: '100%'
          }}
          alt='user-avatar'
          src={item.imageProfile}
        />
      </div>
    )
  } else {
    const stateNum = Math.floor(Math.random() * 6),
      states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
      color = states[stateNum]
    return (
      <div className='avatar-wrapper'>
        <Avatar
          initials
          color={color}
          className='rounded'

          content={item.nama !== null ? item.nama : item.username}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(10px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '35px',
            width: '35px'
          }}
        />
      </div>
    )
  }
}

export const tomorrow = date => {
  const today = new Date()
  return (
    date.getDate() > today.getDate() ||
    date.getMonth() > today.getMonth() ||
    date.getFullYear() > today.getFullYear()
  )
}

export const formatDateCalendar = (date) => {
  moment.locale('id')
  return moment(date).format('DD-MM-YYYY')
}

export const monthYearsNow = () => {
  const date = new Date()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return { month, year }
}
/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}
/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => JSON.parse(localStorage.getItem('userData'))
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole, userStatus) => {
  if (userRole === 'user' && userStatus === 'non_aktif') return '/validation-user'
  if (userRole === 'admin') return '/admin/dashboard'
  if (userRole === 'instruktur') return '/instruktur/dashboard'
  if (userRole === 'user' && userStatus === 'aktif') return '/user/dashboard'
  return '/login'
}

export const capatalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#30469C1a', // for option hover bg-color
    primary: '#30469C', // for selected option bg-color
    neutral10: '#30469C', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})


export const getUserToken = () => {
  //remove ""
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (userData) {
    return userData.accessToken
  } else {
    return null
  }
}


export const isUserTokenExpired = async () => {
  try {
    const userToken = await getUserToken()
    if (!userToken) {
      return true
    } else {
      const response = await axios.post(`${baseUrl}/api/check-token`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      if (response.data?.status === true) {
        return false
      } else {
        return true
      }
    }
  } catch (error) {
    console.log(error)
    return true
  }
}
