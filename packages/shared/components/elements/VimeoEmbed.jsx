import React from 'react'
import PropTypes from 'prop-types'

const VimeoEmbed = ({ id, title, aspectRatio, className }) => {
  const paddingTop = `${(1 / aspectRatio) * 100}%`
  return (
    <div
      className={['video--embed', className].join(' ')}
      style={{ paddingTop }}
    >
      <iframe
        src={`https://player.vimeo.com/video/${id}`}
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
}

VimeoEmbed.defaultProps = {
  aspectRatio: 16 / 9,
  className: '',
}


export default VimeoEmbed
