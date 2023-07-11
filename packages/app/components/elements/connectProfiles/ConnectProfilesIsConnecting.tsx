import React from 'react'
import Spinner from '@/elements/Spinner'

interface ConnectProfilesIsConnectingProps {
  profileName: string
  className?: string
}

const ConnectProfilesIsConnecting: React.FC<ConnectProfilesIsConnectingProps> = ({ profileName, className }) => {
  return (
    <div className={[
      'flex flex-1 flex-column justify-center items-center',
      className,
    ].join(' ')}
    >
      <Spinner className="flex-none mb-10" />
      <div className="max-w-sm text-center">
        Setting up
        {' '}
        <div className="inline">
          <span className="font-bold">{profileName}</span>
        </div>
        ...
      </div>
    </div>
  )
}

export default ConnectProfilesIsConnecting
