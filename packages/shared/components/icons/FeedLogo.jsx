import React from 'react'
import PropTypes from 'prop-types'

const FeedLogo = ({
  id,
  hasWordmark,
  className,
  wordmarkClassName,
  style,
}) => {
  return (
    <svg
      width={hasWordmark ? '140' : '50'}
      height="50"
      viewBox={hasWordmark ? '0 0 140 50' : '0 0 50 50'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
    >
      <circle cx="25" cy="25" r="25" fill={`url(#${id})`} />
      <path d="M35.7914 21.5214C35.7641 18.5277 34.5548 15.6659 32.4267 13.5586C30.2985 11.4513 27.4237 10.269 24.4277 10.269C21.4316 10.269 18.5568 11.4513 16.4286 13.5586C14.3005 15.6659 13.0912 18.5277 13.064 21.5214V37.1177H35.7914V21.5214Z" fill="#F4F4F4" />
      <path d="M24.9563 35.9912C26.2792 34.4959 26.9577 32.539 26.8441 30.5463C26.7305 28.5537 25.834 26.6865 24.3496 25.351C22.8653 24.0155 20.9133 23.3197 18.9182 23.4151C16.9231 23.5105 15.0464 24.3893 13.6965 25.8603L6.734 33.5872L17.9938 43.7181L24.9563 35.9912Z" fill="#0D1311" />
      <path className={wordmarkClassName} d="M60 10.3V37.0648H65.0449V25.9383H76.2813V21.35H65.0449V14.8883H77.0457V10.3H60Z" fill="white" />
      <path className={wordmarkClassName} d="M78.8195 27.5824C78.8195 33.6236 82.7561 37.6 88.4125 37.6C93.6103 37.6 95.8652 34.6559 96.9353 32.6295L92.9988 30.5648C92.3491 32.0177 91.2407 33.4706 88.5654 33.4706C85.8901 33.4706 83.8644 31.5971 83.7498 28.9971H97.5468V27.353C97.5468 21.5412 93.916 17.5648 88.3361 17.5648C82.7561 17.5648 78.8195 21.5412 78.8195 27.5824ZM83.788 25.403C84.0938 23.3001 85.699 21.6942 88.2978 21.6942C90.7821 21.6942 92.4255 23.2236 92.6548 25.403H83.788Z" fill="white" />
      <path className={wordmarkClassName} d="M99.3846 27.5824C99.3846 33.6236 103.321 37.6 108.978 37.6C114.175 37.6 116.43 34.6559 117.5 32.6295L113.564 30.5648C112.914 32.0177 111.806 33.4706 109.13 33.4706C106.455 33.4706 104.43 31.5971 104.315 28.9971H118.112V27.353C118.112 21.5412 114.481 17.5648 108.901 17.5648C103.321 17.5648 99.3846 21.5412 99.3846 27.5824ZM104.353 25.403C104.659 23.3001 106.264 21.6942 108.863 21.6942C111.347 21.6942 112.991 23.2236 113.22 25.403H104.353Z" fill="white" />
      <path className={wordmarkClassName} d="M139.9 10.3H135.084V20.5471H134.702C133.632 19.0177 131.798 17.5648 128.511 17.5648C124.001 17.5648 119.95 21.3883 119.95 27.5824C119.95 33.7765 124.001 37.6 128.511 37.6C131.798 37.6 133.632 36.1471 134.779 34.503H135.161V37.0648H139.9V10.3ZM129.963 21.6942C132.944 21.6942 135.161 23.8353 135.161 27.5824C135.161 31.3295 132.944 33.4706 129.963 33.4706C126.982 33.4706 124.765 31.3295 124.765 27.5824C124.765 23.8353 126.982 21.6942 129.963 21.6942Z" fill="white" />
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4F4F4" />
          <stop offset="0.322917" stopColor="#19C89C" />
          <stop offset="0.869792" stopColor="#26547C" />
        </linearGradient>
      </defs>
    </svg>
  )
}

FeedLogo.propTypes = {
  id: PropTypes.string.isRequired,
  hasWordmark: PropTypes.bool,
  className: PropTypes.string,
  wordmarkClassName: PropTypes.string,
  style: PropTypes.object,
}

FeedLogo.defaultProps = {
  hasWordmark: false,
  className: null,
  wordmarkClassName: null,
  style: {},
}

export default FeedLogo
