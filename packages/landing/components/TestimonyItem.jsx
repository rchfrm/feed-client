import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'react-datocms'

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
    <li
      className={[
        className,
        'col-span-6 sm:col-span-4 flex',
        'text-grey-dark text-xs',
        isSwiperActive ? 'flex-column justify-center' : null,
      ].join(' ')}
    >
      <div className={isSwiperActive ? 'px-8' : 'flex'}>
        <figure className="flex justify-center mb-1">
          <Image
            data={{
              ...image.responsiveImage,
              alt: `${handle}, ${bio}`,
            }}
            className={[
              'mb-2 rounded-full',
              isSwiperActive ? 'w-32 h-32' : 'w-16 h-16 mr-4',
            ].join(' ')}
          />
        </figure>
        <div className={[
          isSwiperActive ? 'text-center text-base' : 'text-xs',
          'text-black',
        ].join(' ')}
        >
          <p className={[
            isSwiperActive ? 'mb-2' : 'mb-0 text-sm',
            'pb-2',
          ].join(' ')}
          >
            <em>{text}</em>
          </p>
          <p className={isSwiperActive ? 'mb-2' : 'mb-0'}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <strong>@{handle}</strong>
            </a>
          </p>
          <p className="mb-0 text-xs">{bio}</p>
        </div>
      </div>
    </li>
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
