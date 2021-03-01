import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const JigsawIcon = ({ fill, className, style }) => {
  return (
    <svg
      width="387"
      height="386"
      viewBox="0 0 387 386"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M158.527 0C123.98 0 95.7791 28.1898 95.7791 62.7295V69.9124H15.1844C6.80086 69.9124 0 76.7093 0 85.0932V180.408C0 188.792 6.80086 195.588 15.1844 195.588H37.5553C55.3302 195.588 69.9348 210.19 69.9348 227.956C69.9348 245.728 55.3306 260.324 37.5553 260.324H15.1844C6.80087 260.324 0 267.121 0 275.505V370.819C0 379.21 6.80218 386 15.1844 386H110.964C119.346 386 126.148 379.21 126.148 370.819V348.455C126.148 330.689 140.747 316.088 158.527 316.088C176.302 316.088 190.907 330.689 190.907 348.455V370.819C190.907 379.21 197.709 386 206.091 386H301.87C310.253 386 317.055 379.21 317.055 370.819V290.686H324.241C358.789 290.686 386.99 262.496 386.99 227.956C386.99 193.422 358.789 165.227 324.241 165.227H317.055V85.0932C317.055 76.7093 310.254 69.9124 301.87 69.9124H221.276V62.7295C221.276 28.1895 193.069 0 158.527 0ZM126.148 62.7295C126.148 44.9577 140.747 30.3616 158.527 30.3616C176.303 30.3616 190.907 44.9581 190.907 62.7295V85.0932C190.907 93.4772 197.708 100.274 206.091 100.274H286.686V180.408C286.686 188.792 293.487 195.588 301.87 195.588H324.241C342.022 195.588 356.621 210.19 356.621 227.956C356.621 245.728 342.022 260.324 324.241 260.324H301.87C293.487 260.324 286.686 267.121 286.686 275.505V355.638H221.276V348.455C221.276 313.921 193.069 285.726 158.527 285.726C123.979 285.726 95.7791 313.922 95.7791 348.455V355.638H30.3689V290.686H37.5553C72.0971 290.686 100.304 262.496 100.304 227.956C100.304 193.422 72.0974 165.227 37.5553 165.227H30.3689V100.274H110.964C119.347 100.274 126.148 93.4772 126.148 85.0932V62.7295Z"
        fill={fill}
      />
    </svg>
  )
}

JigsawIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

JigsawIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
  style: null,
}


export default JigsawIcon
