// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT
import AppleIcon from '@/icons/AppleIcon'
import BandcampIcon from '@/icons/BandcampIcon'
import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'
import SoundCloudIcon from '@/icons/SoundCloudIcon'
import SpotifyIcon from '@/icons/SpotifyIcon'
import TwitterIcon from '@/icons/TwitterIcon'
import YouTubeIcon from '@/icons/YouTubeIcon'
//
import CrossIcon from '@/icons/CrossIcon'
import GlobeIcon from '@/icons/GlobeIcon'
import PencilIcon from '@/icons/PencilIcon'
import TickIcon from '@/icons/TickIcon'
// IMPORT CONSTANTS
import brandColors from '@/constants/brandColors'
// IMPORT HELPERS
// IMPORT STYLES

function Icon({
  color = brandColors.black,
  data,
  version,
  width,
}) {
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
        return null
    }
  }
  const icon = selectIcon(version, color, width, data)

  return icon
}

export default Icon
