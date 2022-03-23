import React from 'react'

const ProfileStatusSpendingPaused = () => {
  return (
    <div>
      Spending is:
      <span
        className="mb-0 border-2 border-red border-solid rounded-full ml-1 py-2 px-3"
      >
        paused
      </span>
    </div>
  )
}

ProfileStatusSpendingPaused.propTypes = {
}

ProfileStatusSpendingPaused.defaultProps = {
}

export default ProfileStatusSpendingPaused
