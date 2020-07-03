import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import SwiperBlock from '@/SwiperBlock'

const TooltipSlides = ({ slides, slidesContentAfter }) => {
  return (
    <SwiperBlock
      containerClass="tooltip--slides-container"
      navigationClass="tooltip--slides-navigation"
      paginationClass="tooltip--slides-pagination"
      listClass="tooltip--slides-wrapper"
      navigation
      pagination
      config={{
        spaceBetween: 20,
      }}
    >
      <>
        {slides.map((slide, index) => {
          const contentAfter = slidesContentAfter ? slidesContentAfter[index] || null : null
          return (
            <li key={index} className="swiper-slide tooltip--slides-slide">
              <MarkdownText markdown={slide} />
              {contentAfter}
            </li>
          )
        })}
      </>
    </SwiperBlock>
  )
}

TooltipSlides.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.string).isRequired,
  slidesContentAfter: PropTypes.arrayOf(PropTypes.node),
}

TooltipSlides.defaultProps = {
  slidesContentAfter: null,
}


export default TooltipSlides
