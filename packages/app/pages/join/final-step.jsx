import { useState } from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ConnectProfilesLoader from '@/app/ConnectProfilesLoader'

const headerConfig = {
  text: 'continue sign up',
  punctuation: ',',
}

const Page = () => {
  const [isConnecting, setIsConnecting] = useState(false)
  return (
    <BasePage
      headerConfig={headerConfig}
      staticPage
    >
      <ConnectProfilesLoader
        isConnecting={isConnecting}
        setIsConnecting={setIsConnecting}
        isSignupStep
      />
    </BasePage>
  )
}


export default testPageReady('app')(Page)
