// ** React Imports
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'

// ** Utils
import { hasActiveChild } from '@layouts/utils'

// ** Horizontal Menu Items Component
import HorizontalNavMenuItems from './HorizontalNavMenuItems'

const HorizontalNavMenuGroup = props => {
  // ** Props
  const {
    item,
    submenu,
    activeItem,
    routerProps,
    groupActive,
    onMouseEnter,
    onMouseLeave,
    openDropdown,
    setActiveItem,
    setGroupActive,
    setOpenDropdown,
    currentActiveItem
  } = props

  // ** Hooks
  const { t } = useTranslation()
  const location = useLocation()

  // ** URL Var
  const currentURL = useLocation().pathname

  useEffect(() => {
    if (hasActiveChild(item, currentURL)) {
      if (!groupActive.includes(item.id)) groupActive.push(item.id)
    } else {
      const index = groupActive.indexOf(item.id)
      if (index > -1) groupActive.splice(index, 1)
    }
    setGroupActive([...groupActive])
  }, [location])

  // ** Dropdown menu modifiers
  const menuModifiers = [
    {
      enabled: true,
      phase: 'write',
      name: 'setMaxHeight',
      fn: data => {
        const pageHeight = window.innerHeight,
          popperEl = data.state.elements.popper,
          ddTop = popperEl.getBoundingClientRect().top,
          ddHeight = popperEl.clientHeight

        let maxHeight, stylesObj

        // ** Calculate and set height
        if (pageHeight - ddTop - ddHeight - 28 < 1) {
          maxHeight = pageHeight - ddTop - 25
          stylesObj = {
            maxHeight,
            overflowY: 'auto'
          }
        }

        const ddRef = popperEl.getBoundingClientRect()

        // ** If there is not space left to open sub menu open it to the right
        if (ddRef.left + ddRef.width - (window.innerWidth - 16) >= 0) {
          popperEl.closest('.dropdown').classList.add('openLeft')
        }

        data.state.styles.popper = { ...data.state.styles.popper, ...stylesObj }
      }
    }
  ]
  return (
    <Dropdown
      tag='li'
      toggle={() => null}
      className={classnames({
        'nav-item': submenu === false,
        'dropdown-submenu': submenu === true,
        'sidebar-group-active active': groupActive.includes(item.id)
      })}
      isOpen={openDropdown.includes(item.id)}
      onMouseEnter={() => onMouseEnter(item.id)}
      onMouseLeave={() => onMouseLeave(item.id)}
    >
      <DropdownToggle
        to='/'
        tag={Link}
        onClick={e => e.preventDefault()}
        className={classnames('dropdown-toggle d-flex align-items-center', {
          'dropdown-item': submenu === true,
          'nav-link': submenu === false
        })}
      >
        {item.icon}
        <span>{t(item.title)}</span>
      </DropdownToggle>
      <DropdownMenu tag='ul' modifiers={menuModifiers} className={classnames({ 'first-level': submenu === false })}>
        <HorizontalNavMenuItems
          submenu={true}
          parentItem={item}
          items={item.children}
          activeItem={activeItem}
          groupActive={groupActive}
          routerProps={routerProps}
          openDropdown={openDropdown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          setActiveItem={setActiveItem}
          setGroupActive={setGroupActive}
          isChild={true}
          setOpenDropdown={setOpenDropdown}
          currentActiveItem={currentActiveItem}
        />
      </DropdownMenu>
    </Dropdown>
  )
}

export default HorizontalNavMenuGroup
