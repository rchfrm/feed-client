import PropTypes from 'prop-types'

import { Image } from 'react-datocms'

import MarkdownText from '@/landing/elements/MarkdownText'

import * as styles from '@/landing/Features.module.css'

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
      <div className={[styles.text].join(' ')}>
        <div className={styles.textInner}>
          <h3 className={styles.header}>{header}</h3>
          <MarkdownText markdown={copy} className={styles.description} />
        </div>
      </div>
      {imageSrc && (
        <figure className={[styles.image].join(' ')}>
          {isSvg ? (
            <img src={imageSrc} alt={header} width={width} height={height} />
          ) : (
            <Image
              data={{
                ...responsiveImage,
                alt: header,
              }}
              fadeInDuration={1}
            />
          )}
        </figure>
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
