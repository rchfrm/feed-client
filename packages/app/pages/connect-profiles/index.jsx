import { useState } from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

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
    </BasePage>
  )
}

export default testPageReady('app')(Page)
