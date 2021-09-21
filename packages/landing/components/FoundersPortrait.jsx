import React from 'react'
import PropTypes from 'prop-types'

const FoundersPortrait = ({ alt, className }) => {
  const dir = '/images/joshua-nick-portrait/'
  return (
    <figure className={[className].join(' ')}>
      <picture>
        <img
          sizes="
            (max-width: 2800px) 48rem,
            (max-width: 600px) 100vw,
            2800px
          "
          srcSet={
            `
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_440.jpg 440w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_727.jpg 727w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_946.jpg 946w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_1129.jpg 1129w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_1313.jpg 1313w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_1451.jpg 1451w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_1586.jpg 1586w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_1706.jpg 1706w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_1818.jpg 1818w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_1924.jpg 1924w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_2027.jpg 2027w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_2124.jpg 2124w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_2218.jpg 2218w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_2308.jpg 2308w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_2394.jpg 2394w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_2476.jpg 2476w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_2556.jpg 2556w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_2637.jpg 2637w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_2712.jpg 2712w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_2787.jpg 2787w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_2797.jpg 2797w,
              ${dir}feed-joshua-nick_oyufx1_c_scale,w_2800.jpg 2800w
            `
          }
          src={`${dir}feed-joshua-nick_oyufx1_c_scale,w_2800.jpg`}
          alt={alt}
        />
      </picture>
    </figure>
  )
}

FoundersPortrait.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
}

FoundersPortrait.defaultProps = {
  alt: 'Joshua Jankowski and Nick Edwards',
  className: null,
}

export default FoundersPortrait
