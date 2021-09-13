import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const { green, textColor: black, bgColor: white } = brandColors

const FeedLogo = ({ className, style }) => {
  return (
    <div className={['FeedLogo', className].join(' ')} style={style}>
      <svg width="500" height="501" viewBox="0 0 500 501" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="250.243" r="250" fill={green} />
        <path d="M357.917 215.461C357.644 185.524 345.551 156.906 324.27 135.833C302.988 114.76 274.24 102.937 244.28 102.937C214.319 102.937 185.571 114.76 164.289 135.833C143.008 156.906 130.915 185.524 130.643 215.461V371.424H357.917V215.461Z" fill={white} />
        <path d="M249.563 360.158C262.792 345.205 269.577 325.637 268.441 305.71C267.305 285.783 258.34 267.111 243.496 253.756C228.653 240.401 209.133 233.444 189.182 234.398C169.231 235.351 150.464 244.139 136.965 258.849L67.3401 336.118L179.938 437.427L249.563 360.158Z" fill={black} />
      </svg>
    </div>
  )
}

FeedLogo.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  textColor: PropTypes.string,
}

FeedLogo.defaultProps = {
  className: '',
  style: {},
  textColor: black,
}


export default FeedLogo
