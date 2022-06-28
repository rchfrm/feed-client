import getDatoData from '@/helpers/getDatoData'
import getQuery from '@/landing/graphQl/homePageQueries'

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
  const query = getQuery()
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
