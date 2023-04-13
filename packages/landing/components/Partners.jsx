import React from 'react'
import PropTypes from 'prop-types'
import PartnerItem from '@/landing/PartnerItem'
import Section from '@/landing/Section'

const Partners = ({ partners }) => {
  return (
    <Section>
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
    </Section>
  )
}

Partners.propTypes = {
  partners: PropTypes.array.isRequired,
}

export default Partners
