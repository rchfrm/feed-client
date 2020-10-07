import React from 'react'
import PropTypes from 'prop-types'

import { useRouter } from 'next/router'

// Components
import TooltipButton from '@/elements/TooltipButton'
import BaseFiltersButton from '@/BaseFiltersButton'
// Hooks
import useScrollToButton from '@/hooks/useScrollToButton'
// Styles
import styles from '@/BaseFilters.module.css'
// Utils
import * as utils from '@/helpers/utils'

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
  const { slug } = options.find(({ id: optionId }) => id === optionId)
  return slug
}

const getIdFromSlug = (options, slug) => {
  const { id } = options.find(({ slug: optionSlug }) => slug === optionSlug)
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
  queryTitle,
  useSlug,
  className,
}) => {
  // GET ROUTER
  const router = useRouter()
  // SETUP SCROLL TO BUTTON
  const [buttonRefs, containerRef] = useScrollToButton(options, activeOptionId)
  // CHANGE ACTIVE COLOR
  React.useEffect(() => {
    if (!activeOptionId || !options.length) return
    // Find active option color
    const { color: activeColor } = options.find(({ id }) => id === activeOptionId)
    // Set hover color
    if (!containerRef.current) return
    containerRef.current.style.setProperty('--active-color', activeColor)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOptionId])

  const setQueryString = React.useCallback((filterSlug) => {
    router.replace({
      pathname: router.pathname,
      query: { [queryTitle]: filterSlug },
    })
  }, [router, queryTitle])

  // SET ACTIVE OPTION BASED ON QUERY STRING and LOCAL STORAGE
  React.useEffect(() => {
    // If not using query string, don't do anything
    if (!useSetQuery || !useSetLocalStorage) return
    // Set current filter using query string
    const currentFilterQuery = router.query[queryTitle]
    const currentFilterStorage = utils.getLocalStorage(queryTitle)
    // If no filter query or storage query, use default
    if (!currentFilterQuery && !currentFilterStorage) {
      setActiveOptionId(defaultOptionId)
      return
    }
    // If there is a filter query, set this as active option ID
    const storedFilter = currentFilterQuery || currentFilterStorage
    const activeId = useSlug ? getIdFromSlug(options, storedFilter) : storedFilter
    setActiveOptionId(activeId)
  // eslint-disable-next-line
  }, [])

  // UPDATE QUERY AND LOCAL STORAATE when active option changes
  React.useEffect(() => {
    if (!activeOptionId) return
    const filterName = useSlug ? getSlugFromId(options, activeOptionId) : activeOptionId
    const { filter: currentFilterQuery } = router.query
    if (currentFilterQuery === filterName) return
    if (useSetQuery) {
      setQueryString(filterName)
    }
    if (useSetLocalStorage) {
      utils.setLocalStorage(queryTitle, filterName)
    }
  // eslint-disable-next-line
  }, [activeOptionId])

  if (!options.length) return null

  return (
    <div className={['breakout--width'].join(' ')}>
      <div className={['inputLabel__text', styles.label].join(' ')}>
        {labelText}
        {/* LABEL TOOLTIP */}
        {tooltipSlides && (
          <TooltipButton slides={tooltipSlides} direction={tooltipDirection} />
        )}
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
              }}
              className={activeClass}
            />
          )
        })}
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
  queryTitle: (props, propName, componentName) => {
    if ((props.useSetQuery || props.useSetLocalStorage) && !props[propName]) {
      return new Error(`Please provide a value for the ${propName}! in ${componentName}`)
    }
  },
  useSlug: PropTypes.bool,
  className: PropTypes.string,
}

BaseFilters.defaultProps = {
  activeOptionId: '',
  defaultOptionId: '',
  buttonType: 'pill',
  tooltipSlides: null,
  tooltipDirection: 'right',
  useSetQuery: false,
  useSetLocalStorage: false,
  queryTitle: '',
  useSlug: true,
  className: '',
}


export default BaseFilters
