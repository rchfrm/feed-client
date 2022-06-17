import PropTypes from 'prop-types'

import { Image } from 'react-datocms'

import MarkdownText from '@/landing/elements/MarkdownText'

const FeatureItem = ({
  header,
  copy,
  className,
  image,
}) => {
  const {
    url: imageSrc,
    mimeType,
    responsiveImage,
    width,
    height,
  } = image
  const isSvg = mimeType === 'image/svg+xml'
  return (
    <li className={className}>
      <div
        className={[
          'mb-7',
          'sm:w-2/4',
          'sm:max-w-md',
        ].join(' ')}
      >
        <h3
          className={[
            'underline',
            'mb-7',
            'text-green',
            'leading-tight',
          ].join(' ')}
        >
          {header}
        </h3>
        <MarkdownText markdown={copy} />
      </div>
      {imageSrc && (
        <>
          {isSvg ? (
            <img
              className={[
                'inline',
                'w-full',
                'h-auto',
                'max-w-xs',
                'sm:w-2/4',
                'md:max-w-sm',
              ].join(' ')}
              src={imageSrc}
              alt={header}
              width={width}
              height={height}
            />
          ) : (
            <Image
              data={{
                ...responsiveImage,
                alt: header,
              }}
              fadeInDuration={1}
              className={[
                'max-w-xs',
                'sm:w-2/4',
                'md:max-w-sm',
              ].join(' ')}
            />
          )}
        </>
      )}
    </li>
  )
}

FeatureItem.propTypes = {
  header: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  className: PropTypes.string,
}

FeatureItem.defaultProps = {
  className: '',
}

export default FeatureItem
