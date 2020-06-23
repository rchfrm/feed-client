import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import Icon from '@/elements/Icon'

import useScrollToButton from '@/hooks/useScrollToButton'

import brandColors from '~/constants/brandColors'

import styles from '@/InsightSelectors.module.css'

const InsightPlatformSelectors = ({
  availablePlatforms,
  currentPlatform,
  setCurrentPlatform,
  initialLoading,
}) => {
  // SETUP SCROLL TO BUTTON
  const [buttonRefs, containerRef] = useScrollToButton(availablePlatforms, currentPlatform)
  // CHANGE ACTIVE COLOR
  React.useEffect(() => {
    if (!currentPlatform || initialLoading) return
    // Set hover color
    const { bg: platformColor } = brandColors[currentPlatform]
    const dataSelectors = document.getElementById('platformSelectors')
    if (!dataSelectors) return
    dataSelectors.style.setProperty('--active-color', platformColor)
  }, [currentPlatform, availablePlatforms.length, initialLoading])

  if (!availablePlatforms.length) return null

  if (initialLoading) return null

  return (
    <div className={['breakout--width', styles.selectorsOuter].join(' ')}>
      <p className={['inputLabel__text', styles.selectorsLabel].join(' ')}>Select a platform</p>
      <div id="platformSelectors" className={styles.platformSelectors} ref={containerRef}>
        {availablePlatforms.map(({ title, id }, i) => {
          const { bg: platformColor } = brandColors[id]
          const active = id === currentPlatform
          const activeClass = active ? styles._active : ''
          const iconColor = platformColor
          const borderColor = active ? platformColor : 'transparent'
          const { textColor } = brandColors
          const buttonStyle = {
            backgroundColor: 'transparent',
            border: `2px solid ${borderColor}`,
            color: textColor,
          }
          return (
            <div
              key={id}
              ref={buttonRefs[i]}
              className={[styles.platformButtonContainer, activeClass].join(' ')}
            >
              <Button
                className={styles.platformButton}
                version="black small icon"
                style={buttonStyle}
                onClick={() => setCurrentPlatform(id)}
              >
                <Icon color={iconColor} version={id} />
                {title}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

InsightPlatformSelectors.propTypes = {
  availablePlatforms: PropTypes.array.isRequired,
  currentPlatform: PropTypes.string,
  setCurrentPlatform: PropTypes.func.isRequired,
  initialLoading: PropTypes.bool.isRequired,
}

InsightPlatformSelectors.defaultProps = {
  currentPlatform: '',
}


export default InsightPlatformSelectors
