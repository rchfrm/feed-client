import PropTypes from 'prop-types'
import MarkdownText from '@/landing/elements/MarkdownText'

const FeatureItem = ({
  header,
  copy,
  className,
  index,
}) => {
  const shouldReverse = index % 2 !== 0
  return (
    <li className={className}>
      <div
        className={[
          'mb-0',
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
            'minContent:text-2xl',
          ].join(' ')}
        >
          {header}
        </h3>
        <MarkdownText className="text-base minContent:text-lg sm:mb-0" markdown={copy} />
      </div>
    </li>
  )
}

FeatureItem.propTypes = {
  header: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
}

FeatureItem.defaultProps = {
  className: '',
}

export default FeatureItem
