import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'react-datocms'

const PartnerItem = ({ partner, isSwiperActive, className }) => {
  const { logo, website } = partner

  return (
    <li className={[
      className,
      'flex justify-center',
      isSwiperActive ? 'items-center' : 'col-span-6 sm:col-span-3',
    ].join(' ')}
    >
      <a href={website} target="_blank" rel="noopener noreferrer">
        <figure>
          <Image
            data={{
              ...logo.responsiveImage,
              alt: `${website}`,
            }}
            className={[
              isSwiperActive ? 'w-40 h-auto' : 'w-32 h-auto',
            ].join(' ')}
          />
        </figure>
      </a>
    </li>
  )
}

PartnerItem.propTypes = {
  partner: PropTypes.object.isRequired,
  isSwiperActive: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PartnerItem.defaultProps = {
  className: null,
}

export default PartnerItem
