import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'react-datocms'

import * as styles from '@/landing/Testimonies.module.css'

const TestimonyItem = ({ testimony, isSwiperActive, className }) => {
  const {
    bio,
    quote,
    copy,
    handle,
    image,
  } = testimony
  const link = `https://instagram.com/${handle}`
  const text = copy || quote
  return (
    isSwiperActive ? (
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
            <p className="mb-0 pb-3"><em>{text}</em></p>
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
    ) : (
      <li
        className={[
          'col-span-6 sm:col-span-4',
          'flex',
          'text-grey-3 text-xs',
        ].join(' ')}
      >
        <div>
          <figure>
            <Image
              data={{
                ...image.responsiveImage,
                alt: `${handle}, ${bio}`,
              }}
              className="mr-4 mb-2 h-16 w-16 rounded-full"
            />
          </figure>
        </div>
        <div className="text-black text-xs">
          <p className="text-sm mb-0 pb-2"><em>{text}</em></p>
          <p className="mb-0">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <strong>@{handle}</strong>
            </a>
          </p>
          <p className="mb-0">{bio}</p>
        </div>
      </li>
    )
  )
}

TestimonyItem.propTypes = {
  testimony: PropTypes.object.isRequired,
  isSwiperActive: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TestimonyItem.defaultProps = {
  className: null,
}

export default TestimonyItem
