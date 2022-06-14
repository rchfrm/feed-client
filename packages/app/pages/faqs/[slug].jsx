import getDatoData from '@/helpers/getDatoData'
import { getAllFaqSlugsQuery, getFaqQuery } from '@/app/graphQl/faqsQueries'
import BasePage from '@/app/BasePage'
import React from 'react'
import FaqContent from '@/app/FaqContent'
import { headerConfig } from './index'

export default function FAQPage({ pageData }) {
  return (
    <BasePage
      headerConfig={headerConfig}
      staticPage
    >
      <FaqContent faq={pageData} />
    </BasePage>
  )
}

export async function getStaticPaths() {
  const query = getAllFaqSlugsQuery()
  const pageKey = 'faqSlugs'
  const forceLoad = true
  const {
    data: {
      allFaqArticles: faqs,
    },
  } = await getDatoData(query, pageKey, forceLoad)

  // Get the paths we want to pre-render based on posts
  const paths = faqs.map(({ slug }) => ({
    params: { slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { slug } }) {
  const query = getFaqQuery(slug)
  const pageKey = `faq_${slug}`
  const forceLoad = true
  const {
    data: {
      faqArticle: pageData,
    },
  } = await getDatoData(query, pageKey, forceLoad)
  return {
    props: {
      pageData,
    },
  }
}
