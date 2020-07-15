import React from 'react'
import PropTypes from 'prop-types'

const VimeoEmbed = ({
  id,
  title,
  aspectRatio,
  className,
  vimeoOptions,
}) => {
  const paddingTop = `${(1 / aspectRatio) * 100}%`
  const parameters = Object.entries(vimeoOptions).reduce((params, [key, value], index) => {
    const separator = index === 0 ? '?' : '&'
    return `${params}${separator}${key}=${value}`
  }, '')
  return (
    <div
      className={['video--embed', className].join(' ')}
      style={{ paddingTop }}
    >
      <iframe
        src={`https://player.vimeo.com/video/${id}${parameters}`}
        title={title}
        width="640"
        height="360"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </div>
  )
}

VimeoEmbed.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number,
  className: PropTypes.string,
  vimeoOptions: PropTypes.object,
}

VimeoEmbed.defaultProps = {
  aspectRatio: 16 / 9,
  className: '',
  // See here: https://vimeo.zendesk.com/hc/en-us/articles/360001494447-Using-Player-Parameters
  vimeoOptions: {
    portrait: 0,
    byline: 0,
    title: 0,
    color: '#03D8B2',
  },
}


export default VimeoEmbed
