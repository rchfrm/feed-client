import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'react-datocms'

import useOnResize from '@/landing/hooks/useOnResize'

const FullbleedImage = ({
  image,
  className,
  style,
}) => {
  const { responsiveImage, focalPoint } = image

  const container = React.useRef(null)
  const [imageSize, setImageSize] = React.useState({})

  const useRelative = ! className || (! className.includes('absolute') && ! className.includes('fixed'))

  // HANDLE RESIZE
  const { width, height } = useOnResize()
  React.useEffect(() => {
    const imageRatio = responsiveImage.width / responsiveImage.height
    const { width, height } = container.current.getBoundingClientRect()
    const containerRatio = width / height
    if (containerRatio > imageRatio) {
      setImageSize({ width, height: width / imageRatio })
      return
    }
    setImageSize({ width: height * imageRatio, height })
  }, [responsiveImage.width, responsiveImage.height, width, height])

  // Position image within contaienr
  const translateX = `${focalPoint.x * 100}%`
  const translateY = `${focalPoint.y * 100}%`
  const transform = `translate(${translateX}, ${translateY})`

  return (
    <div
      ref={container}
      className={[
        'overflow-hidden',
        useRelative ? 'relative' : null,
        className,
      ].join(' ')}
      style={style}
    >
      <div
        className="absolute"
        style={{
          position: 'absolute',
          bottom: '50%',
          right: '50%',
          transform,
          width: imageSize.width,
          height: imageSize.height,
        }}
      >
        <Image
          data={responsiveImage}
          style={{
            width: imageSize.width,
            height: imageSize.height,
          }}
        />
      </div>
    </div>
  )
}

FullbleedImage.propTypes = {
  image: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

FullbleedImage.defaultProps = {
  className: null,
  style: null,
}

export default React.memo(FullbleedImage)
