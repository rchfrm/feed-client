import React from 'react'
import PropTypes from 'prop-types'

import { detect } from 'detect-browser'
import { Image } from 'react-datocms'

import useOnResize from '@/landing/hooks/useOnResize'

import * as styles from '@/landing/Hero.module.css'

export default function HeroImage({
  mobile,
  desktop,
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
    const isMobile = width < 992
    return isMobile ? mobile : desktop
  }, [width, desktop, mobile])

  return (
    <figure
      className={[
        styles.heroImage,
        'col-span-12',
        'hidden',

        'xs:block',

        'sm:col-span-10',
        'sm:col-start-3',

        'md:col-span-8',
        'md:col-start-5',
        'md:row-start-3',
        'md:row-span-2',

        'lg:row-start-2',
        'lg:row-end-5',

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
  mobile: PropTypes.object.isRequired,
  desktop: PropTypes.object.isRequired,
}
