import React from 'react'
import PropTypes from 'prop-types'
// Components
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

const BaseFilters = ({
  options,
  activeOptionId,
  setActiveOptionId,
  labelText,
  buttonType,
  className,
}) => {
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

  if (!options.length) return null

  return (
    <div className={['breakout--width'].join(' ')}>
      <p className={['inputLabel__text', styles.label].join(' ')}>{labelText}</p>
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
              className={activeClass}
              textColor={textColor}
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
  setActiveOptionId: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  className: PropTypes.string,
}

BaseFilters.defaultProps = {
  activeOptionId: '',
  buttonType: 'pill',
  className: '',
}


export default BaseFilters
