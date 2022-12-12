import React from 'react'
import PropTypes from 'prop-types'

import PartnerItem from '@/landing/PartnerItem'

import useSwiperWithBreakpoint from '@/landing/hooks/useSwiperWithBreakpoint'
import Section from '@/landing/Section'

const Partners = ({ partners }) => {
  const swiperContainer = React.useRef(null)
  const swiperPagination = React.useRef(null)
  const isSwiperActive = useSwiperWithBreakpoint({
    breakpoint: 992,
    items: partners,
    containerEl: swiperContainer.current,
    paginationEl: swiperPagination.current,
  })

  return (
    <Section
      className={[
        'relative',
        'bg-grey-1',
        isSwiperActive ? 'py-20' : 'py-10 sm:py-20',
      ].join(' ')}
      fullWidth
    >
      <div ref={swiperContainer} className="swiper-container">
        <ul className={[
          'swiper-wrapper',
          ! isSwiperActive ? 'grid grid-cols-12 col-span-12 gap-8 px-0 md:px-40 mb-0 box-border' : 'flex items-center',
        ].join(' ')}
        >
          {partners.map((partner) => {
            const { website } = partner
            return (
              <PartnerItem
                key={website}
                partner={partner}
                isSwiperActive={isSwiperActive}
                className="swiper-slide"
              />
            )
          })}
        </ul>
      </div>
      <div
        ref={swiperPagination}
        className={[
          'swiper-pagination',
          'absolute bottom-4 -translate-x-1/2',
          ! isSwiperActive ? 'hidden' : null,
        ].join(' ')}
        style={{ left: '50%' }}
      />
    </Section>
  )
}

Partners.propTypes = {
  partners: PropTypes.array.isRequired,
}

export default Partners
