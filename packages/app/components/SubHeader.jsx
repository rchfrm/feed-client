import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import SubHeaderProfileStatus from '@/app/SubHeaderProfileStatus'

const SubHeader = ({ className }) => {
  const { artist } = React.useContext(ArtistContext)

  return (
    <div className={[
      'relative h-20',
      'flex items-center justify-between',
      '-mx-5 sm:-mx-8 md:-mx-10 md:-mt-10',
      'p-4 sm:px-6 md:px-30',
      'bg-green-bg-light border border-solid border-green-bg-dark',
      className,
    ].join(' ')}
    >
      <div className="flex items-center">
        <p className="mb-0 font-bold text-2xl">{artist.name}</p>
      </div>
      <SubHeaderProfileStatus />
    </div>
  )
}

SubHeader.propTypes = {
  className: PropTypes.string,
}

SubHeader.defaultProps = {
  className: '',
}

export default SubHeader
