import BasePage from '@/app/BasePage'
import FaqContent from '@/app/FaqContent'
// Dato data
import getDatoData from '@/helpers/getDatoData'
import query from '@/app/graphQl/faqsQuery'

const headerConfig = {
  text: 'FAQs',
}

const Page = ({ faqs }) => {
  return (
    <BasePage
      headerConfig={headerConfig}
      staticPage
    >
      <FaqContent faqs={faqs} />
    </BasePage>
  )
}

// This function gets called at build time on server-side.
// https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly
export async function getStaticProps() {
  const forceLoad = false
  const { data: { faqsApp: { faqs } } } = await getDatoData(query, 'faqsQuery', forceLoad)
  return {
    props: {
      faqs,
    },
  }
}

export default Page
