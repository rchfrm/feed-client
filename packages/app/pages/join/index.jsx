import React from 'react'
import getDatoData from '@/helpers/getDatoData'
import query from '@/app/graphQl/testimoniesQuery'

import BasePage from '@/app/BasePage'

import SignupPage from '@/app/SignupPage'

const headerConfig = {
  text: 'sign up',
}

const Page = ({ testimonies }) => {
  return (
    <BasePage
      headerConfig={headerConfig}
      staticPage
      authPage
    >
      <SignupPage testimonies={testimonies} />
    </BasePage>
  )
}

export async function getStaticProps() {
  const forceLoad = false
  const { data } = await getDatoData(query, 'home', forceLoad)
  const { heroCopy: { testimonies } } = data

  return {
    props: {
      testimonies,
    },
  }
}

export default Page
