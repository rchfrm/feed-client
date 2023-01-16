import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const FolderIcon = ({ fill, className }) => {
  return (
    <svg
      className={className}
      width="402"
      height="296"
      viewBox="0 0 402 296"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1" fill="white">
        <path fillRule="evenodd" clipRule="evenodd" d="M50 0C22.3858 0 0 22.3858 0 50V86V184V246C0 273.614 22.3858 296 50 296H301C328.614 296 351 273.614 351 246V86C351 58.3858 328.614 36 301 36H164.203C152.248 14.5267 129.321 0 103 0H50Z" />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50 0C22.3858 0 0 22.3858 0 50V86V184V246C0 273.614 22.3858 296 50 296H301C328.614 296 351 273.614 351 246V86C351 58.3858 328.614 36 301 36H164.203C152.248 14.5267 129.321 0 103 0H50Z"
        fill={brandColors.offwhite}
      />
      <path
        d="M164.203 36L132.749 53.5111L143.042 72H164.203V36ZM36 50C36 42.268 42.268 36 50 36V-36C2.50352 -36 -36 2.50351 -36 50H36ZM36 86V50H-36V86H36ZM36 184V86H-36V184H36ZM36 246V184H-36V246H36ZM50 260C42.268 260 36 253.732 36 246H-36C-36 293.496 2.50352 332 50 332V260ZM301 260H50V332H301V260ZM315 246C315 253.732 308.732 260 301 260V332C348.496 332 387 293.496 387 246H315ZM315 86V246H387V86H315ZM301 72C308.732 72 315 78.268 315 86H387C387 38.5035 348.496 0 301 0V72ZM164.203 72H301V0H164.203V72ZM103 36C115.737 36 126.89 42.9881 132.749 53.5111L195.657 18.4889C177.606 -13.9346 142.904 -36 103 -36V36ZM50 36H103V-36H50V36Z"
        fill={fill}
        mask="url(#path-1-inside-1)"
      />
      <path
        d="M51.986 136.432C57.4691 117.579 78.2319 102 97.8753 102L365.621 102C384.684 102 395.49 116.705 389.877 135.007L352.19 257.894C346.522 276.374 326.259 291.561 306.93 291.814L40.1168 295.307C20.996 295.557 9.91465 281.088 15.23 262.812L51.986 136.432Z"
        fill={fill}
      />
    </svg>

  )
}

FolderIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

FolderIcon.defaultProps = {
  fill: brandColors.black,
  className: null,
}


export default FolderIcon
