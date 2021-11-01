import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useOpenIntegrationsPanel from '@/app/hooks/useOpenIntegrationsPanel'


const ShowIntegrationsButton = ({
  text,
  className,
  circleButton,
}) => {
  const openIntegrationsPanel = useOpenIntegrationsPanel({})
  return (
    <div
      className={[className].join(' ')}
    >
      {circleButton ? (
        <button
          onClick={openIntegrationsPanel}
          className={[
            'flex items-center justify-center',
            'h-10 w-10 rounded-full',
            'text-white', 'bg-black',
          ].join(' ')}
          aria-label="Add more insights"
        >
          <strong className="-mt-1 text-lg">{text}</strong>
        </button>
      ) : (
        <Button
          className={[className].join(' ')}
          version="small black"
          onClick={openIntegrationsPanel}
          trackComponentName="ShowIntegrationsButton"
        >
          {text}
        </Button>
      )}
    </div>
  )
}

ShowIntegrationsButton.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  circleButton: PropTypes.bool,
}

ShowIntegrationsButton.defaultProps = {
  className: null,
  circleButton: false,
}


export default ShowIntegrationsButton
