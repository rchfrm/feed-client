import getDatoData from '@/helpers/getDatoData'
import { getAllTestimonies } from '@/landing/graphQl/homePageQueries'

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
  const query = getAllTestimonies()
  const forceLoad = false
  const { data } = await getDatoData(query, 'home', forceLoad)
  const { allTestimonies: testimonies } = data

  return {
    props: {
      testimonies,
    },
  }
}

export default Page
