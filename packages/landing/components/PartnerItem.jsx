import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'react-datocms'

const PartnerItem = ({ partner }) => {
  const { logo, website } = partner

  return (
    <li className={[
      'flex justify-center',
      'col-span-6 sm:col-span-3',
    ].join(' ')}
    >
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          'flex items-center',
          'w-32 h-auto',
        ].join(' ')}
      >
        <figure>
          <Image
            data={{
              ...logo.responsiveImage,
              alt: `${website}`,
            }}
          />
        </figure>
      </a>
    </li>
  )
}

PartnerItem.propTypes = {
  partner: PropTypes.object.isRequired,
  className: PropTypes.string,
}

PartnerItem.defaultProps = {
  className: null,
}

export default PartnerItem
