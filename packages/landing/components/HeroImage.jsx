import React from 'react'
import PropTypes from 'prop-types'

import { detect } from 'detect-browser'
import { Image } from 'react-datocms'

import * as styles from '@/landing/Hero.module.css'

export default function HeroImage({
  image,
}) {
  const [isChrome, setIsChrome] = React.useState(false)
  const [responsiveImage, setResponsiveImage] = React.useState(null)
  React.useEffect(() => {
    const browser = detect()
    if (browser && browser.name === 'chrome') {
      setIsChrome(true)
    }
  }, [])

  React.useEffect(() => {
    if (image) {
      setResponsiveImage(image.responsiveImage)
    }
  }, [image])

  return (
    responsiveImage && (
      <figure
        className={[
          'col-span-12',
          'xs:block',
          'md:col-start-7',
          'md:col-end-13',
          'md:row-start-2',
          'md:row-end-5',
          'lg:row-start-2',
          'lg:row-end-5',
          styles.heroFigure,
          isChrome ? 'styles._isChrome' : '',
        ].join(' ')}
      >
        <Image
          data={responsiveImage}
          style={{
            imageRendering: isChrome ? '-webkit-optimize-contrast' : 'auto',
          }}
        />
      </figure>
    )
  )
}

HeroImage.propTypes = {
  image: PropTypes.object.isRequired,
}
