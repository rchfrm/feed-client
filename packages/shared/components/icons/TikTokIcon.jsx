import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const TikTokIcon = ({ fill, className, style }) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path d="M20.1265 5.79395C19.9683 5.71218 19.8143 5.62255 19.665 5.52539C19.2311 5.2385 18.8332 4.90046 18.48 4.51855C17.5962 3.50732 17.2661 2.48145 17.1445 1.76318H17.1494C17.0478 1.16699 17.0898 0.78125 17.0962 0.78125H13.0708V16.3467C13.0708 16.5557 13.0708 16.7622 13.062 16.9663C13.062 16.9917 13.0596 17.0151 13.0581 17.0425C13.0581 17.0537 13.0581 17.0654 13.0557 17.0771C13.0557 17.0801 13.0557 17.083 13.0557 17.0859C13.0132 17.6444 12.8342 18.1839 12.5343 18.657C12.2345 19.13 11.8229 19.5222 11.3359 19.7988C10.8284 20.0876 10.2543 20.239 9.6704 20.2383C7.79492 20.2383 6.2749 18.709 6.2749 16.8203C6.2749 14.9316 7.79492 13.4023 9.6704 13.4023C10.0254 13.402 10.3783 13.4579 10.7158 13.5679L10.7207 9.46924C9.69597 9.33687 8.65494 9.41831 7.66326 9.70842C6.67159 9.99852 5.7508 10.491 4.95898 11.1548C4.26516 11.7576 3.68187 12.4769 3.23535 13.2803C3.06542 13.5732 2.42431 14.7505 2.34667 16.6611C2.29785 17.7456 2.62353 18.8691 2.7788 19.3335V19.3433C2.87646 19.6167 3.25488 20.5498 3.87158 21.3364C4.36886 21.9674 4.95638 22.5217 5.61523 22.9814V22.9717L5.62499 22.9814C7.57372 24.3057 9.73437 24.2188 9.73437 24.2188C10.1084 24.2036 11.3613 24.2188 12.7842 23.5444C14.3623 22.7969 15.2607 21.6831 15.2607 21.6831C15.8347 21.0176 16.2911 20.2592 16.6103 19.4404C16.9746 18.4829 17.0962 17.3345 17.0962 16.8755V8.61768C17.145 8.64697 17.7954 9.07715 17.7954 9.07715C17.7954 9.07715 18.7324 9.67773 20.1943 10.0688C21.2432 10.3472 22.6562 10.4058 22.6562 10.4058V6.40967C22.1611 6.46338 21.1558 6.30713 20.1265 5.79395Z" fill={fill} />
    </svg>
  )
}

TikTokIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

TikTokIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
  style: null,
}


export default TikTokIcon

