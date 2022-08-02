import PropTypes from 'prop-types'

import { Image } from 'react-datocms'

import MarkdownText from '@/landing/elements/MarkdownText'

const FeatureItem = ({
  header,
  copy,
  className,
  image,
  index,
}) => {
  const {
    url: imageSrc,
    mimeType,
    responsiveImage,
    width,
    height,
  } = image
  const shouldReverse = index % 2 !== 0
  const isSvg = mimeType === 'image/svg+xml'
  return (
    <li className={className}>
      <div
        className={[
          'mb-7',
          'sm:mb-0',
          shouldReverse ? 'sm:col-start-2' : null,
          shouldReverse ? 'sm:row-start-1' : null,
        ].join(' ')}
      >
        <h3
          className={[
            'bold',
            'underline',
            'decoration-green',
            'decoration-3',
            'mb-7',
            'leading-tight',
          ].join(' ')}
        >
          {header}
        </h3>
        <MarkdownText className="sm:mb-0" markdown={copy} />
      </div>
      <div
        className={[
          shouldReverse ? 'sm:col-start-1' : null,
          shouldReverse ? 'sm:row-start-1' : null,
        ].join(' ')}
      >
        {imageSrc && (
          isSvg ? (
            <img
              className={[

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

              ].join(' ')}
            />
          )
        )}
      </div>
    </li>
  )
}

FeatureItem.propTypes = {
  header: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
}

FeatureItem.defaultProps = {
  className: '',
}

export default FeatureItem
