import React from 'react'
import PropTypes from 'prop-types'
import PartnerItem from '@/landing/PartnerItem'

const Partners = ({ partners }) => {
  return (
    <div className="flex flex-col md:self-center">
      <p className="text-center text-xs minContent:text-sm">Trusted by</p>
      <ul
        className={[
          'flex',
          'flex-wrap',
          'gap-8',
          'justify-center',
          'align-center',
        ].join(' ')}
      >
        {partners.map((partner) => {
          const { website } = partner
          return (
            <PartnerItem
              key={website}
              partner={partner}
            />
          )
        })}
      </ul>
    </div>
  )
}

Partners.propTypes = {
  partners: PropTypes.array.isRequired,
}

export default Partners
