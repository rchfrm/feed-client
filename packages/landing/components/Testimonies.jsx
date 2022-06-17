import React from 'react'
import PropTypes from 'prop-types'

import TestimonyItem from '@/landing/TestimonyItem'

import useSwiperWithBreakpoint from '@/landing/hooks/useSwiperWithBreakpoint'
import Section from '@/landing/Section'

const Testimonies = ({
  testimonies,
}) => {
  // Setup swiper
  const swiperContainer = React.useRef(null)
  const swiperPagination = React.useRef(null)
  const swiperSlide = React.useRef(null)
  const isSwiperActive = useSwiperWithBreakpoint({
    breakpoint: 992,
    items: testimonies,
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
          !isSwiperActive ? 'grid grid-cols-12 col-span-12 gap-10 box-border px-10 mb-0' : null,
        ].join(' ')}
        >
          {testimonies.map((testimony) => {
            const { id } = testimony
            return (
              <TestimonyItem
                key={id}
                testimony={testimony}
                isSwiperActive={isSwiperActive}
                className="swiper-slide"
                swiperSlide={swiperSlide}
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
          !isSwiperActive ? 'hidden' : null,
        ].join(' ')}
        style={{ left: '50%' }}
      />
    </Section>
  )
}

Testimonies.propTypes = {
  testimonies: PropTypes.array.isRequired,
}

export default Testimonies
