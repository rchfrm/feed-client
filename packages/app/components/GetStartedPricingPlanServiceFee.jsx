import PropTypes from 'prop-types'

const GetStartedPricingPlanServiceFee = ({ percentage }) => {
  return (
    <div
      className={[
        'flex',
        'items-center flex-col sm:flex-row',
        percentage === 0 ? 'text-grey-3' : null,
      ].join(' ')}
    >
      <div className="flex items-center">
        <p className="text-2xl mb-0 sm:mb-5">{percentage * 100}</p>
        <p className="h4 pr-1 mb-0 sm:mb-5">
          %
        </p>
      </div>
      <p className="text-xs sm:text-base mb-0 sm:mb-5">service fee</p>
    </div>
  )
}

GetStartedPricingPlanServiceFee.propTypes = {
  percentage: PropTypes.number.isRequired,
}

export default GetStartedPricingPlanServiceFee
