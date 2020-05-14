import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '../../constants/brandColors'

const { green, bgColor } = brandColors

const BudgetIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="384"
      height="384"
      viewBox="0 0 384 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="192" cy="192" r="192" fill={green} />
      <path
        d="M192 186.023C251.429 186.023 300 162.113 300 132.511C300 102.909 252 79 192 79C132 79 84 102.34 84 131.942C84 161.544 132 186.023 192 186.023ZM192 212.209C132.571 212.209 84 188.3 84 158.698L84 192.285C84 221.887 132 245.796 192 245.796C251.429 245.796 300 221.887 300 192.285L300 158.698C299.429 188.3 251.429 212.209 192 212.209ZM192 271.413C132.571 271.413 84 247.504 84 217.902L84 251.489C84 281.091 132 305 192 305C251.429 305 300 281.091 300 251.489L300 217.902C299.429 246.934 251.429 271.413 192 271.413Z"
        fill={bgColor}
      />
    </svg>

  )
}

BudgetIcon.propTypes = {
  className: PropTypes.string,
}

BudgetIcon.defaultProps = {
  className: '',
}


export default BudgetIcon
