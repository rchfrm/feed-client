import PropTypes from 'prop-types'

const GetStartedPricingPlanServiceFee = ({ percentage, plan }) => {
  const { name } = plan

  return (
    <div
      className={[
        'flex',
        'items-center flex-col sm:flex-row',
        percentage === 0 ? 'text-grey-dark' : null,
      ].join(' ')}
    >
      <div className="flex items-center">
        <p className={[
          'text-2xl mb-0 sm:mb-5',
          name === 'free' ? 'font-bold sm:font-normal' : null,
        ].join(' ')}
        >
          {percentage * 100}
        </p>
        <p className={[
          'h4 pr-1 mb-0 sm:mb-5',
          name === 'free' ? 'font-bold sm:font-normal' : null,
        ].join(' ')}
        >
          %
        </p>
      </div>
      <p className="text-xs sm:text-base mb-0 sm:mb-5">service fee</p>
    </div>
  )
}

GetStartedPricingPlanServiceFee.propTypes = {
  percentage: PropTypes.number.isRequired,
  plan: PropTypes.object.isRequired,
}

export default GetStartedPricingPlanServiceFee
