import React from 'react'
import PropTypes from 'prop-types'

import { detect } from 'detect-browser'
import { Image } from 'react-datocms'

import useOnResize from '@/landing/hooks/useOnResize'

import * as styles from '@/landing/Hero.module.css'

export default function HeroImage({
  imageMobile,
  imageDesktop,
  className,
}) {
  const [isChrome, setIsChrome] = React.useState(false)
  React.useEffect(() => {
    const browser = detect()
    if (browser && browser.name === 'chrome') {
      setIsChrome(true)
    }
  }, [])

  // Get srcs based on device
  const { width } = useOnResize()

  const image = React.useMemo(() => {
    const isMobile = width < 600
    return isMobile ? imageMobile : imageDesktop
  }, [width, imageDesktop, imageMobile])

  return (
    <figure
      className={[
        className,
        styles.heroFigure,
        isChrome ? styles._isChrome : null,
      ].join(' ')}
    >
      <Image
        data={image.responsiveImage}
        style={{
          imageRendering: isChrome ? '-webkit-optimize-contrast' : '',
        }}
      />
    </figure>
  )
}

HeroImage.propTypes = {
  imageMobile: PropTypes.object.isRequired,
  imageDesktop: PropTypes.object.isRequired,
  className: PropTypes.string,
}

HeroImage.defaultProps = {
  className: '',
}
