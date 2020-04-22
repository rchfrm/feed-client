// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT
import AppleIcon from '../icons/AppleIcon'
import BandcampIcon from '../icons/BandcampIcon'
import FacebookIcon from '../icons/FacebookIcon'
import InstagramIcon from '../icons/InstagramIcon'
import SoundCloudIcon from '../icons/SoundCloudIcon'
import SpotifyIcon from '../icons/SpotifyIcon'
import TwitterIcon from '../icons/TwitterIcon'
import YouTubeIcon from '../icons/YouTubeIcon'
//
import CrossIcon from '../icons/CrossIcon'
import GlobeIcon from '../icons/GlobeIcon'
import PencilIcon from '../icons/PencilIcon'
import TickIcon from '../icons/TickIcon'
// IMPORT CONSTANTS
import brandColors from '../../constants/brandColors'
// IMPORT HELPERS
// IMPORT STYLES

function Icon({
  color = brandColors.black,
  data,
  status,
  version,
  width,
  className = '',
}) {
  // ADAPTATIONS FOR A STATUS PROPS
  // Adapt colors for different status'
  let bgColor
  let borderColor
  if (status === 'all') {
    color = brandColors.white
    bgColor = color
    borderColor = color
  } else if (status === 'some') {
    bgColor = brandColors.white
    borderColor = color
  } else if (status === 'none') {
    color = brandColors.grey
    bgColor = brandColors.white
    borderColor = brandColors.grey
  }

  // Add a wrapper to icons with a status props
  const iconWrapper = (
    status
      ? {
        width: width + 15,
        height: width + 15,
        backgroundColor: bgColor,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 3,
        border: `1px solid ${borderColor}`,
      }
      : {}
  )
  // END ADAPTATIONS FOR A STATUS PROPS

  // SELECT CORRECT ICON
  const selectIcon = (version, color, width, data) => {
    switch (version) {
      // Platform logos
      case 'apple':
        return <AppleIcon fill={color} width={width} />
      case 'bandcamp':
        return <BandcampIcon fill={color} width={width} />
      case 'facebook':
        return <FacebookIcon fill={color} width={width} />
      case 'instagram':
        return <InstagramIcon fill={color} width={width} />
      case 'soundcloud':
        return <SoundCloudIcon fill={color} width={width} />
      case 'spotify':
        return <SpotifyIcon fill={color} width={width} />
      case 'twitter':
        return <TwitterIcon fill={color} width={width} />
      case 'youtube':
        return <YouTubeIcon fill={color} width={width} />

      // General icons / graphics
      case 'cross':
        return <CrossIcon fill={color} width={width} data={data} />
      case 'pencil':
        return <PencilIcon fill={color} width={width} data={data} />
      case 'tick':
        return <TickIcon fill={color} width={width} data={data} />
      case 'website':
        return <GlobeIcon fill={color} width={width} data={data} />

      // Default
      default:
        return (
          <div
            className={className}
            style={{ display: 'block', width: `${width}px`, height: `${width}px` }}
            data-item={data}
          >
            &nbsp;
          </div>
        )
    }
  }
  const icon = selectIcon(version, color, width, data)


  return (
    <div className={['icon', className].join(' ')} style={iconWrapper}>
      {icon}
    </div>
  )
}

export default Icon
