import React from 'react'
import PropTypes from 'prop-types'

import Swiper from 'swiper'

const SwiperBlock = ({
  config,
  navigation,
  pagination,
  containerClass,
  listClass,
  navigationClass,
  paginationClass,
  children,
}) => {
  const swiperContainer = React.useRef(null)
  const swiperPagination = React.useRef(null)
  // Setup swiper
  React.useEffect(() => {
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
    const mySwiper = new Swiper(swiperContainer.current, config)
    // Handle unmount
    return () => {
      mySwiper.destroy()
    }
  // eslint-disable-next-line
  }, [])
  return (
    <div className={containerClass}>
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
      {pagination && (
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
  navigationClass: PropTypes.string,
  containerClass: PropTypes.string,
  listClass: PropTypes.string,
  paginationClass: PropTypes.string,
  children: PropTypes.node.isRequired,
}

SwiperBlock.defaultProps = {
  navigation: false,
  pagination: false,
  navigationClass: '',
  containerClass: '',
  listClass: '',
  paginationClass: '',
  config: {},
}


export default SwiperBlock
