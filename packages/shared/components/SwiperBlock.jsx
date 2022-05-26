import React from 'react'
import PropTypes from 'prop-types'

import Swiper from 'swiper'

const SwiperBlock = ({
  config,
  navigation,
  pagination,
  paginationPosition,
  containerClass,
  listClass,
  navigationClass,
  paginationClass,
  children,
  // Use these to control the swiper
  goToSlide,
  disable,
  // Use these to update the parent
  onSlideChange,
}) => {
  const swiperContainer = React.useRef(null)
  const swiperPagination = React.useRef(null)
  const mySwiper = React.useRef(null)
  const currentSlide = React.useRef(null)
  // SETUP SWIPER
  React.useEffect(() => {
    // Stop here (and destroy) if disabled
    if (disable) {
      if (mySwiper.current) mySwiper.current.destroy()
      return
    }
    // Add pagination to config
    if (navigation) {
      config.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }
    // Add pagination to config
    if (pagination) {
      config.pagination = {
        el: swiperPagination.current,
      }
    }
    // Init swiper
    mySwiper.current = new Swiper(swiperContainer.current, config)
    const swiper = mySwiper.current
    // Listen to events
    mySwiper.current.on('slideChange', function slideChange() {
      const { activeIndex } = this
      currentSlide.current = activeIndex
      onSlideChange(this)
    })
    // Handle unmount
    return () => {
      swiper.destroy()
    }
  // eslint-disable-next-line
  }, [disable])

  // CONTROL SWIPER FROM PARENT
  React.useEffect(() => {
    if (disable) return
    if (typeof goToSlide !== 'number' || !mySwiper.current) return
    if (currentSlide.current === goToSlide) return
    mySwiper.current.slideTo(goToSlide)
  }, [goToSlide, disable])

  // Stop here and just return children if disabled
  if (disable) return children

  return (
    <div className={containerClass}>
      {/* PAGINATION */}
      {pagination && paginationPosition === 'top' && (
        <div
          ref={swiperPagination}
          className={[
            'swiper-pagination',
            paginationClass,
          ].join(' ')}
        />
      )}
      <div ref={swiperContainer} className="swiper-container">
        <ul className={[listClass, 'swiper-wrapper'].join(' ')}>
          {children}
        </ul>
      </div>
      {/* NAVIGATION */}
      {navigation && (
        <div
          className={[
            'swiper-navigation',
            navigationClass,
          ].join(' ')}
        >
          <button aria-label="previous" className="swiper-button-prev" />
          <button aria-label="next" className="swiper-button-next" />
        </div>
      )}
      {/* PAGINATION */}
      {pagination && paginationPosition === 'bottom' && (
        <div
          ref={swiperPagination}
          className={[
            'swiper-pagination',
            paginationClass,
          ].join(' ')}
        />
      )}
    </div>
  )
}

SwiperBlock.propTypes = {
  config: PropTypes.object,
  navigation: PropTypes.bool,
  pagination: PropTypes.bool,
  paginationPosition: PropTypes.oneOf(['top', 'bottom']),
  navigationClass: PropTypes.string,
  containerClass: PropTypes.string,
  listClass: PropTypes.string,
  paginationClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  goToSlide: PropTypes.number,
  disable: PropTypes.bool,
  onSlideChange: PropTypes.func,
}

SwiperBlock.defaultProps = {
  navigation: false,
  pagination: false,
  paginationPosition: 'bottom',
  navigationClass: '',
  containerClass: '',
  listClass: '',
  paginationClass: '',
  config: {},
  goToSlide: null,
  disable: false,
  onSlideChange: () => {},
}


export default SwiperBlock
