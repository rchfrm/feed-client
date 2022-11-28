import React from 'react'
import PropTypes from 'prop-types'

import AppleIcon from '@/icons/AppleIcon'
import BandcampIcon from '@/icons/BandcampIcon'
import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'
import SoundCloudIcon from '@/icons/SoundCloudIcon'
import SpotifyIcon from '@/icons/SpotifyIcon'
import TwitterIcon from '@/icons/TwitterIcon'
import YouTubeIcon from '@/icons/YouTubeIcon'
import GlobeIcon from '@/icons/GlobeIcon'
import TikTokIcon from '@/icons/TikTokIcon'

import brandColors from '@/constants/brandColors'

const PlatformIcon = ({
  platform,
  fill,
  title,
  className,
  style,
}) => {
  const color = fill || brandColors[platform].bg
  switch (platform) {
  // Platform logos
    case 'apple':
      return <AppleIcon fill={color} className={className} style={style} title={title || platform} />
    case 'bandcamp':
      return <BandcampIcon fill={color} className={className} style={style} title={title || platform} />
    case 'facebook':
      return <FacebookIcon fill={color} className={className} style={style} title={title || platform} />
    case 'instagram':
      return <InstagramIcon fill={color} className={className} style={style} title={title || platform} />
    case 'soundcloud':
      return <SoundCloudIcon fill={color} className={className} style={style} title={title || platform} />
    case 'spotify':
      return <SpotifyIcon fill={color} className={className} style={style} title={title || platform} />
    case 'twitter':
      return <TwitterIcon fill={color} className={className} style={style} title={title || platform} />
    case 'youtube':
      return <YouTubeIcon fill={color} className={className} style={style} title={title || platform} />
    case 'website':
      return <GlobeIcon fill={color} className={className} style={style} title={title || platform} />
    case 'tiktok':
      return <TikTokIcon fill={color} className={className} style={style} title={title || platform} />
    default:
      throw new Error('Could not find platform icon')
  }
}

PlatformIcon.propTypes = {
  platform: PropTypes.string.isRequired,
  fill: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

PlatformIcon.defaultProps = {
  fill: '',
  title: '',
  className: null,
  style: null,
}


export default React.memo(PlatformIcon)
