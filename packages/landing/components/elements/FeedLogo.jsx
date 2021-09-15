import PropTypes from 'prop-types'
import brandColors from '../../constants/brandColors'

// TODO : Increase space between logo and wordmark

const { green, black, white } = brandColors

const style = {
  width: '100%',
  height: 'auto',
}

export default function FeedLogo({ className }) {
  return (
    <div className={className}>
      <svg style={style} width="1188" height="1188" viewBox="0 0 1188 1188" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="594" cy="594" r="594" fill={green} />
        <path d="M850.41 511.458C849.762 440.301 821.03 372.278 770.465 322.19C719.9 272.101 651.594 244 580.408 244C509.222 244 440.916 272.101 390.351 322.19C339.787 372.278 311.055 440.301 310.407 511.458V882.167H850.41V511.458Z" fill={white} />
        <path d="M592.962 855.39C624.395 819.847 640.515 773.335 637.815 725.971C635.116 678.608 613.815 634.226 578.548 602.482C543.28 570.739 496.899 554.201 449.496 556.469C402.093 558.736 357.503 579.624 325.428 614.588L160 798.249L427.534 1039.05L592.962 855.39Z" fill={black} />
      </svg>
    </div>
  )
}

FeedLogo.propTypes = {
  className: PropTypes.string,
}

FeedLogo.defaultProps = {
  className: null,
}
