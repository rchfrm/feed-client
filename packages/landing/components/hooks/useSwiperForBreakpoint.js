import React from 'react'

import Swiper from 'swiper'
import useOnResize from '@/landing/hooks/useOnResize'

const useSwiperForBreakpoint = ({ containerEl, paginationEl, breakpoint, items }) => {
  const [mySwiper, setMySwiper] = React.useState(null)
  const [isSwiperActive, setIsSwiperActive] = React.useState(false)
  const { width } = useOnResize()

  const initiateSwiper = React.useCallback(() => {
    const swiper = new Swiper(containerEl, {
      // Optional parameters
      loop: true,
      centeredSlides: true,
      // If we need pagination
      pagination: {
        el: paginationEl,
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
  }, [containerEl, paginationEl])

  const destroySwiper = () => {
    if (mySwiper) {
      mySwiper.destroy(true, true)
    }
    setIsSwiperActive(false)
  }

  React.useEffect(() => {
    if (width <= breakpoint && items.length > 4) {
      setIsSwiperActive(true)
    } else {
      destroySwiper()
    }
    // eslint-disable-next-line
  }, [width, items.length])

  React.useEffect(() => {
    if (isSwiperActive) {
      initiateSwiper()
    }
  }, [isSwiperActive, initiateSwiper])

  React.useEffect(() => {
    return () => destroySwiper()
    // eslint-disable-next-line
  }, [])

  return isSwiperActive
}

export default useSwiperForBreakpoint
