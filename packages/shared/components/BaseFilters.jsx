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
  setQuery,
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
      query: { filter: filterSlug },
      shallow: true,
    })
  }, [router])

  // SET ACTIVE OPTION BASED ON QUERY STRING
  React.useEffect(() => {
    // If not using query string, don't do anything
    if (!setQuery) return
    // Set current filter using query string
    const { filter: currentFilterQuery } = router.query
    // If no filter query, use default
    if (!currentFilterQuery) {
      const queryName = useSlug ? getSlugFromId(options, defaultOptionId) : defaultOptionId
      setQueryString(queryName)
      setActiveOptionId(defaultOptionId)
      return
    }
    // If there is a filter query, set this as active option ID
    const activeId = useSlug ? getIdFromSlug(options, currentFilterQuery) : currentFilterQuery
    setActiveOptionId(activeId)
  // eslint-disable-next-line
  }, [])

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
        {options.map(({ id, title, slug, subtitle, color, activeTextColor, icon }, i) => {
          const active = id === activeOptionId
          const activeClass = active ? styles._active : ''
          const backgroundColor = active ? color : ''
          const textColor = active ? activeTextColor : ''
          const slugName = useSlug ? slug : id
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
                // Set query
                if (setQuery) {
                  setQueryString(slugName)
                }
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
  setQuery: PropTypes.bool,
  useSlug: PropTypes.bool,
  className: PropTypes.string,
}

BaseFilters.defaultProps = {
  activeOptionId: '',
  defaultOptionId: '',
  buttonType: 'pill',
  tooltipSlides: null,
  tooltipDirection: 'right',
  setQuery: false,
  useSlug: true,
  className: '',
}


export default BaseFilters
