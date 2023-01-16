import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const LinkIcon = ({ fill, className, style }) => {
  return (
    <svg
      width="11"
      height="10"
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fill={fill}
        d="M4.35163 6.13928C5.03793 7.69993 6.91564 7.86327 8.09333 6.76794C8.81532 6.09536 9.50986 5.37475 10.1948 4.66511C10.4207 4.43526 10.5924 4.15776 10.6972 3.85294C10.802 3.54813 10.8373 3.22374 10.8004 2.90353C10.7636 2.58332 10.6555 2.27542 10.4842 2.00238C10.3129 1.72934 10.0827 1.49809 9.81046 1.32557C9.16945 0.913794 8.3006 0.720258 7.57861 1.02909C6.85662 1.33793 6.29248 2.12717 5.76129 2.65562C5.29735 3.12368 6.01933 3.85665 6.49014 3.3831C7.27526 2.59935 8.0851 1.35028 9.29848 2.22051C9.42414 2.30553 9.53143 2.41494 9.61399 2.54224C9.69654 2.66954 9.75268 2.81213 9.77905 2.96155C9.80543 3.11096 9.80151 3.26415 9.76752 3.41202C9.73354 3.55989 9.67019 3.69943 9.58123 3.82233C9.44629 3.9749 9.30237 4.11928 9.15024 4.2547C8.61629 4.78865 8.08647 5.32808 7.54704 5.8579C6.79348 6.60185 5.73658 6.73911 5.24107 5.62044C4.96655 5.01512 4.08534 5.53809 4.35163 6.13928Z"
      />
      <path
        fill={fill}
        d="M6.46131 4.73785C5.77501 3.1772 3.89866 3.01387 2.72097 4.1092C2.0031 4.78177 1.30445 5.50376 0.61952 6.21202C0.393733 6.4419 0.222189 6.71935 0.117435 7.02406C0.0126804 7.32878 -0.0226336 7.65306 0.0140757 7.97318C0.050785 8.2933 0.158589 8.60117 0.329602 8.87426C0.500615 9.14735 0.730512 9.37876 1.00248 9.55156C1.64348 9.96334 2.51234 10.1569 3.2357 9.84804C3.95906 9.53921 4.52182 8.74996 5.05165 8.22288C5.52108 7.75345 4.7936 7.02598 4.32417 7.49403C3.53904 8.27779 2.72783 9.52685 1.51583 8.66074C1.38942 8.57584 1.28146 8.46629 1.19842 8.33865C1.11538 8.21102 1.05897 8.06793 1.03256 7.91797C1.00616 7.768 1.01031 7.61425 1.04476 7.46593C1.07922 7.31761 1.14327 7.17777 1.23307 7.0548C1.36766 6.90191 1.51161 6.75751 1.66407 6.62243C2.19801 6.08849 2.72783 5.54906 3.26589 5.02061C4.02082 4.2794 5.07773 4.13802 5.57323 5.25807C5.84775 5.86201 6.72759 5.33905 6.46131 4.73785Z"
      />
    </svg>
  )
}

LinkIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

LinkIcon.defaultProps = {
  fill: brandColors.black,
  className: null,
  style: null,
}


export default LinkIcon
