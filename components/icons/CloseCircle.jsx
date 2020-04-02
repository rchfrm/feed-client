import React from 'react'

import brandColors from '../../constants/brandColors'

const CloseCircle = () => {
  return (
    <svg width="389" height="388" viewBox="0 0 389 388" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="195.633" cy="194.755" rx="193.367" ry="193.245" fill={brandColors.textColor} />
      <rect x="293" y="113.818" width="251.987" height="25.1987" transform="rotate(135 293 113.818)" fill={brandColors.bgColor} />
      <rect x="114.818" y="96" width="251.987" height="25.1987" transform="rotate(45 114.818 96)" fill={brandColors.bgColor} />
    </svg>
  )
}

export default CloseCircle
