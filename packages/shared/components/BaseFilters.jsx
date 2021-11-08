import React from 'react'
import PropTypes from 'prop-types'

import { useRouter } from 'next/router'
import * as ROUTES from '@/app/constants/routes'

// Components
import TooltipButton from '@/elements/TooltipButton'
import BaseFiltersButton from '@/BaseFiltersButton'
// Hooks
import useScrollToButton from '@/hooks/useScrollToButton'
// Styles
import styles from '@/BaseFilters.module.css'
// Utils
import * as utils from '@/helpers/utils'
import { track } from '@/helpers/trackingHelpers'

// * ******
// * README
// * ******
/*
`options` must be an array of objects formatted like this:

  {
    id: [string: option id] *required,
    title: [string: option title, used as button text] *required,
    subtitle: [string: option subtitle] optional (default: ''),
    color: [string: the color of the active state] optional (default: 'green'),
    activeTextColor: [string: the text color in the active state] optional (default: 'black'),
    icon: [node: the icon to include inside the button] optional (default: null),
  }

*/

const getSlugFromId = (options, id) => {
  const { slug } = options.find(({ id: optionId }) => id === optionId) || {}
  return slug
}

const getIdFromSlug = (options, slug) => {
  const { id } = options.find(({ slug: optionSlug }) => slug === optionSlug) || {}
  return id
}

const BaseFilters = ({
  options,
  activeOptionId,
  defaultOptionId,
  setActiveOptionId,
  labelText,
  buttonType,
  tooltipSlides,
  tooltipDirection,
  useSetQuery,
  useSetLocalStorage,
  querySlug,
  useSlug,
  trackProps,
  disabled,
  className,
  children,
}) => {
  // GET ROUTER
  const router = useRouter()
  // SETUP SCROLL TO BUTTON
  const [buttonRefs, containerRef] = useScrollToButton(options, activeOptionId)
  // CHANGE ACTIVE COLOR
  React.useEffect(() => {
    if (!activeOptionId || !options.length) return
    // Find active option color
    const { color: activeColor } = options.find(({ id }) => id === activeOptionId) || {}
    // Set hover color
    if (!containerRef.current) return
    containerRef.current.style.setProperty('--active-color', activeColor)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOptionId, options])

  const setQueryString = React.useCallback((filterSlug) => {
    const { query: currentQueries } = utils.parseUrl(window.location.href)
    const newQueries = {
      ...currentQueries,
      [querySlug]: filterSlug,
    }
    router.replace({
      pathname: router.pathname,
      query: newQueries,
    })
  }, [router, querySlug])

  // * ON MOUNT
  // SET ACTIVE OPTION BASED ON QUERY STRING and LOCAL STORAGE
  React.useEffect(() => {
    // If not using query string, don't do anything
    if (!useSetQuery && !useSetLocalStorage) return
    // Set current filter using query string
    const currentFilterQuery = router.query[querySlug]
    const currentFilterStorage = utils.getLocalStorage(querySlug)
    // If no filter query or storage query, use default
    if (!currentFilterQuery && !currentFilterStorage) {
      setActiveOptionId(defaultOptionId)
      return
    }
    // If there is a filter query, set this as active option ID
    const storedFilter = currentFilterQuery || currentFilterStorage
    const activeId = useSlug ? getIdFromSlug(options, storedFilter) : storedFilter
    // Test if active ID is valid
    const isIdValid = !!options.find(({ id }) => id === activeId)
    // If stored ID is not valid, use default option
    if (!isIdValid) {
      setActiveOptionId(defaultOptionId)
      return
    }
    setActiveOptionId(activeId)
  // eslint-disable-next-line
  }, [])

  // * ON OPTION CHANGE
  // UPDATE QUERY AND LOCAL STORAGE when active option changes
  React.useEffect(() => {
    const paths = [ROUTES.POSTS, ROUTES.INSIGHTS]
    if (!paths.includes(router.pathname) || disabled) return

    if (!activeOptionId) return
    const filterName = useSlug ? getSlugFromId(options, activeOptionId) : activeOptionId
    const currentFilterQuery = router.query[querySlug]
    if (currentFilterQuery === filterName) return
    if (useSetQuery) {
      setQueryString(filterName)
    }
    if (useSetLocalStorage) {
      utils.setLocalStorage(querySlug, filterName)
    }
  // eslint-disable-next-line
  }, [activeOptionId, router])

  const trackFilter = React.useCallback((activeOptionId) => {
    if (!trackProps) return
    const filterName = useSlug ? getSlugFromId(options, activeOptionId) : activeOptionId
    const { action, ...props } = trackProps
    track(action, {
      ...props,
      selection: filterName,
    })
  }, [trackProps, options, useSlug])

  if (!options.length) return null

  return (
    <div className={[
      'breakout--width',
      disabled ? 'opacity-50 pointer-events-none' : null,
      className,
    ].join(' ')}
    >
      <div className={['inputLabel__text', styles.label].join(' ')}>
        <span className="flex items-center h-8">
          {labelText}
          {/* LABEL TOOLTIP */}
          {tooltipSlides && (
            <TooltipButton slides={tooltipSlides} direction={tooltipDirection} trackLabel={`Filters: ${labelText}`} />
          )}
        </span>
      </div>
      <div
        ref={containerRef}
        className={[
          styles.container,
          className,
        ].join(' ')}
      >
        {options.map(({ id, title, subtitle, color, activeTextColor, icon }, i) => {
          const active = id === activeOptionId
          const activeClass = active ? styles._active : ''
          const backgroundColor = active ? color : ''
          const textColor = active ? activeTextColor : ''
          return (
            <BaseFiltersButton
              key={id}
              id={id}
              buttonRef={buttonRefs[i]}
              title={title}
              subtitle={subtitle}
              setActiveOptionId={setActiveOptionId}
              buttonType={buttonType}
              backgroundColor={backgroundColor}
              icon={icon}
              textColor={textColor}
              active={active}
              onClick={() => {
                setActiveOptionId(id)
                trackFilter(id)
              }}
              className={activeClass}
            />
          )
        })}
        {children}
      </div>
    </div>
  )
}

BaseFilters.propTypes = {
  options: PropTypes.array.isRequired,
  activeOptionId: PropTypes.string,
  defaultOptionId: PropTypes.string,
  setActiveOptionId: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  tooltipSlides: PropTypes.array,
  tooltipDirection: PropTypes.string,
  useSetQuery: PropTypes.bool,
  useSetLocalStorage: PropTypes.bool,
  querySlug: (props, propName, componentName) => {
    if ((props.useSetQuery || props.useSetLocalStorage) && !props[propName]) {
      return new Error(`Please provide a value for the ${propName}! in ${componentName}`)
    }
  },
  useSlug: PropTypes.bool,
  trackProps: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
}

BaseFilters.defaultProps = {
  activeOptionId: '',
  defaultOptionId: '',
  buttonType: 'pill',
  tooltipSlides: null,
  tooltipDirection: 'right',
  useSetQuery: false,
  useSetLocalStorage: false,
  querySlug: '',
  useSlug: false,
  trackProps: null,
  disabled: false,
  className: '',
  children: null,
}


export default BaseFilters
