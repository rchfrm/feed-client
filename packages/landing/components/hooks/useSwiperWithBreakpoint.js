import React from 'react'

import Swiper from 'swiper'
import useOnResize from '@/landing/hooks/useOnResize'

const useSwiperWithBreakpoint = ({ containerEl, paginationEl, breakpoint, items }) => {
  const [mySwiper, setMySwiper] = React.useState(null)
  const { width } = useOnResize()

  const initiateSwiper = React.useCallback(() => {
    if (!mySwiper && containerEl) {
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

      // Fixes issue where duplicated loop slides are not being updated correctly on first load
      setTimeout(() => {
        swiper.loopDestroy()
        swiper.loopCreate()
      })
    }
  }, [containerEl, paginationEl, mySwiper])

  const destroySwiper = React.useCallback(() => {
    if (mySwiper) {
      mySwiper.destroy(true, true)
      setMySwiper(null)
    }
  }, [mySwiper])

  React.useEffect(() => {
    if (width <= breakpoint && items.length > 4) {
      initiateSwiper()
    } else {
      destroySwiper()
    }
  }, [width, items.length, initiateSwiper, destroySwiper, breakpoint])

  React.useEffect(() => {
    return () => destroySwiper()
  }, [destroySwiper])

  return Boolean(mySwiper)
}

export default useSwiperWithBreakpoint
