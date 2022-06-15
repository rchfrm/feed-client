import BasePage from '@/app/BasePage'
import FaqCategories from '@/app/FaqCategories'
import getDatoData from '@/helpers/getDatoData'
import { getAllFaqQuestionsQuery } from '@/app/graphQl/faqsQueries'

export const headerConfig = {
  text: 'FAQs',
}

const Page = ({ faqs }) => {
  return (
    <BasePage
      headerConfig={headerConfig}
      staticPage
    >
      <FaqCategories faqs={faqs} />
    </BasePage>
  )
}

// This function gets called at build time on server-side.
// https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly
export async function getStaticProps() {
  const forceLoad = false
  const {
    data: {
      allFaqArticles: faqs,
    },
  } = await getDatoData(getAllFaqQuestionsQuery(), 'faqQuestions', forceLoad)
  return {
    props: {
      faqs,
    },
  }
}

export default Page
