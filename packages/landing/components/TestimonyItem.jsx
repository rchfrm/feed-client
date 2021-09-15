import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'react-datocms'

import * as styles from '@/Testimonies.module.css'

const TestimonyItem = ({ testimony, className }) => {
  const {
    bio,
    copy,
    handle,
    image,
  } = testimony
  const link = `https://instagram.com/${handle}`
  return (
    <li className={className}>
      <div className={styles.singleTestimony}>
        <figure className={styles.testimonyImage}>
          <div className={styles.testimonyImageInner}>
            <div className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden">
              <Image
                data={{
                  ...image.responsiveImage,
                  alt: `${handle}, ${bio}`,
                }}
              />
            </div>
          </div>
        </figure>
        <div className={styles.testimonyText}>
          {/* QUOTE */}
          <p className="mb-0 pb-3"><em>{copy}</em></p>
          {/* HANDLE */}
          <p className="mb-2">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <strong>@{handle}</strong>
            </a>
          </p>
          {/* BIO */}
          <p className="text-xs">{bio}</p>
        </div>
      </div>
    </li>
  )
}

TestimonyItem.propTypes = {
  testimony: PropTypes.object.isRequired,
  className: PropTypes.string,
}

TestimonyItem.defaultProps = {
  className: null,
}

export default TestimonyItem
