import React from 'react'
import PropTypes from 'prop-types'

import Swiper from 'swiper'

import TestimonyItem from '@/landing/TestimonyItem'

import useOnResize from '@/landing/hooks/useOnResize'
import useBreakpointTest from '@/landing/hooks/useBreakpointTest'

import * as styles from '@/landing/Testimonies.module.css'

const Testimonies = ({
  testimonies,
}) => {
  // Setup swiper
  const swiperContainer = React.useRef(null)
  const swiperPagination = React.useRef(null)
  const [mySwiper, setMySwiper] = React.useState(null)
  const [isSwiperActive, setIsSwiperActive] = React.useState(true)
  const { width } = useOnResize()
  const isDesktopLayout = useBreakpointTest('md')

  const initiateSwiper = () => {
    const swiper = new Swiper(swiperContainer.current, {
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
      },
    })
    setMySwiper(swiper)
  }

  const destroySwiper = () => {
    if (mySwiper) {
      mySwiper.destroy(true, true)
    }
    setIsSwiperActive(false)
  }

  React.useEffect(() => {
    if (!isDesktopLayout && testimonies.length > 4) {
      setIsSwiperActive(true)
    } else {
      destroySwiper()
    }
    // eslint-disable-next-line
  }, [width, testimonies.length, isDesktopLayout])

  React.useEffect(() => {
    if (isSwiperActive) {
      initiateSwiper()
    }
  }, [isSwiperActive])

  React.useEffect(() => {
    return () => destroySwiper()
    // eslint-disable-next-line
  }, [])

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
