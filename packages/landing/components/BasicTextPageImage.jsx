import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'react-datocms'

import styles from '@/BasicTextPage.module.css'

const BasicTextPageCopy = ({ image, breakoutWidth, className }) => {
  return (
    <figure className={[
      'mb-10 xs:mb-12 sm:mb-16',
      className,
      styles.image,
      !breakoutWidth ? styles._breakoutWidth : null,
    ].join(' ')}
    >
      <Image data={image.responsiveImage} />
    </figure>
  )
}

BasicTextPageCopy.propTypes = {
  image: PropTypes.object.isRequired,
  breakoutWidth: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

BasicTextPageCopy.defaultProps = {
  className: null,
}

export default BasicTextPageCopy
