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
import brandColours from '../../constants/brandColours'
// IMPORT HELPERS
// IMPORT STYLES

function Icon(props) {
// REDEFINE PROPS AS VARIABLES
  let { color } = props
  const { data } = props
  const { status } = props
  const { version } = props
  const { width } = props
  // END REDEFINE PROPS AS VARIABLES

  // ADAPTATIONS FOR A STATUS PROPS
  // Adapt colours for different status'
  let bgColor
  let borderColor
  if (status === 'all') {
    color = brandColours.white.hex
    bgColor = props.color
    borderColor = props.color
  } else if (status === 'some') {
    color = props.color
    bgColor = brandColours.white.hex
    borderColor = props.color
  } else if (status === 'none') {
    color = brandColours.grey.hex
    bgColor = brandColours.white.hex
    borderColor = brandColours.grey.hex
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
        borderRadius: 5,
        border: `1px solid ${borderColor}`,
        boxSizing: 'border-box',
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
            style={{ display: 'block', width: `${props.width}px`, height: `${props.width}px` }}
            data-item={props.data}
          >
            &nbsp;
          </div>
        )
    }
  }
  const icon = selectIcon(version, color, width, data)
  // END SELECT CORRECT ICON


  return (
    <div className="icon" style={iconWrapper}>
      {icon}
    </div>
  )
}

export default Icon
