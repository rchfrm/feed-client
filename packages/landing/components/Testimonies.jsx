import React from 'react'
import PropTypes from 'prop-types'

import Swiper from 'swiper'

import TestimonyItem from '@/TestimonyItem'

import * as styles from '@/Testimonies.module.css'

const Testimonies = ({
  testimonies,
}) => {
  // Setup swiper
  const swiperContainer = React.useRef(null)
  const swiperPagination = React.useRef(null)
  React.useEffect(() => {
    const mySwiper = new Swiper(swiperContainer.current, {
      // Optional parameters
      loop: true,
      centeredSlides: true,
      // If we need pagination
      pagination: {
        el: swiperPagination.current,
      },
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
        },
        450: {
          slidesPerView: 2,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 256,
        },
        1200: {
          slidesPerView: 2.5,
          spaceBetween: 256,
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 256,
        },
        2000: {
          slidesPerView: 3.2,
          spaceBetween: 200,
        },
      },
    })

    return () => {
      mySwiper.destroy()
    }
  }, [])

  return (
    <section className={['section--padding', styles.testimoniesSection].join(' ')}>
      <div ref={swiperContainer} className="swiper-container">
        <ul className={[styles.testimoniesList, 'swiper-wrapper'].join(' ')}>
          {testimonies.map((testimony) => {
            const { id } = testimony
            return (
              <TestimonyItem
                key={id}
                testimony={testimony}
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
          styles.pagination,
        ].join(' ')}
      />
    </section>
  )
}

Testimonies.propTypes = {
  testimonies: PropTypes.array.isRequired,
}

export default Testimonies
