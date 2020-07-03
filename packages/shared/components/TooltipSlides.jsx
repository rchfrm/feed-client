import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import SwiperBlock from '@/SwiperBlock'

const TooltipSlides = ({ slides }) => {
  return (
    <SwiperBlock
      containerClass="tooltip--slides-container"
      navigationClass="tooltip--slides-navigation"
      paginationClass="tooltip--slides-pagination"
      listClass="tooltip--slides-wrapper"
      navigation
      pagination
    >
      <>
        {slides.map((slide, index) => {
          return (
            <li key={index} className="swiper-slide tooltip--slides-slide">
              <MarkdownText markdown={slide} />
            </li>
          )
        })}
      </>
    </SwiperBlock>
  )
}

TooltipSlides.propTypes = {
  slides: PropTypes.array.isRequired,
}

export default TooltipSlides
