import { useState } from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

import ConnectProfilesAlreadyConnected from '@/app/ConnectProfilesAlreadyConnected'
import ConnectProfilesLoader from '@/app/ConnectProfilesLoader'

const headerConfig = {
  text: 'connect accounts',
}

const Page = () => {
  const [isConnecting, setIsConnecting] = useState(false)
  return (
    <BasePage
      headerConfig={headerConfig}
    >
      <ConnectProfilesLoader
        isConnecting={isConnecting}
        setIsConnecting={setIsConnecting}
        className="mb-8"
      />
      {!isConnecting && (
        <ConnectProfilesAlreadyConnected />
      )}
    </BasePage>
  )
}

export default testPageReady('app')(Page)
