import React from 'react'
import PropTypes from 'prop-types'

import TestimonyItem from '@/landing/TestimonyItem'

import useSwiperForBreakpoint from '@/landing/hooks/useSwiperForBreakpoint'

import * as styles from '@/landing/Testimonies.module.css'

const Testimonies = ({
  testimonies,
}) => {
  // Setup swiper
  const swiperContainer = React.useRef(null)
  const swiperPagination = React.useRef(null)
  const isSwiperActive = useSwiperForBreakpoint({
    breakpoint: 992,
    items: testimonies,
    containerEl: swiperContainer.current,
    paginationEl: swiperPagination.current,
  })

  return (
    <section className={['section--padding', styles.testimoniesSection].join(' ')}>
      <div ref={swiperContainer} className="swiper-container">
        <ul className={[
          isSwiperActive ? 'swiper-wrapper' : 'grid grid-cols-12 col-span-12 gap-10 px-10 mb-0',
        ].join(' ')}
        >
          {testimonies.map((testimony) => {
            const { id } = testimony
            return (
              <TestimonyItem
                key={id}
                testimony={testimony}
                isSwiperActive={isSwiperActive}
                className={isSwiperActive ? 'swiper-slide' : null}
              />
            )
          })}
        </ul>
      </div>
      {isSwiperActive && (
        <div
          ref={swiperPagination}
          className={[
            'swiper-pagination',
            styles.pagination,
          ].join(' ')}
        />
      )}
    </section>
  )
}

Testimonies.propTypes = {
  testimonies: PropTypes.array.isRequired,
}

export default Testimonies
