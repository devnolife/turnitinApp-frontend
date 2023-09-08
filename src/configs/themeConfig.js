import { getUserData } from '@utils'

const theme = {}
if (getUserData() !== null) {
  const { role } = getUserData()
  role !== 'admin' ? theme.appName = 'LIBRARY UNISMUH' : theme.appName = 'LIBRARY'

}
const themeConfig = {
  app: {
    appName: getUserData() !== null ? theme.appName : 'LIBRARY',
    appLogoImage: require('@src/assets/images/logo/unismuh-logo.svg').default
  },
  layout: {
    isRTL: false,
    skin: 'Bordered', // light, dark, bordered, semi-dark
    routerTransition: 'fadeIn', // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: 'vertical', // vertical, horizontal
    contentWidth: 'boxed', // full, boxed
    menu: {
      isHidden: true,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: 'white' // BS color options [primary, success, etc]
    },
    footer: {
      type: 'static' // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true // Enable scroll to top button
  }
}

export default themeConfig
