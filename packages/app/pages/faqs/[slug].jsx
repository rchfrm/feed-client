import React from 'react'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import getDatoData from '@/helpers/getDatoData'
import { getAllFaqQuestionsByCategoryQuery, getAllFaqSlugsQuery, getFaqQuery } from '@/app/graphQl/faqsQueries'
import BasePage from '@/app/BasePage'
import FaqContent from '@/app/FaqContent'
import FaqsRelated from '@/app/FaqsRelated'
import FaqsLinkToAll from '@/app/FaqsLinkToAll'
import { faqHeaderConfig } from './index'

export default function FAQPage({ pageData }) {
  const isLoggedIn = useLoggedInTest()

  const {
    faqArticle,
    allFaqsInCategory,
  } = pageData

  return (
    <BasePage
      headerConfig={faqHeaderConfig}
      staticPage
    >
      <div
        className={[
          'md:grid',
          'md:grid-cols-12',
          'md:gap-4',
          ! isLoggedIn ? 'pt-16' : null,
        ].join(' ')}
      >
        <FaqsLinkToAll />
        <FaqContent faq={faqArticle} />
        <FaqsRelated slug={faqArticle.slug} faqs={allFaqsInCategory} />
      </div>
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
      faqArticle,
    },
  } = await getDatoData(query, pageKey, forceLoad)
  const { category } = faqArticle
  const {
    data: {
      allFaqArticles: allFaqsInCategory,
    },
  } = await getDatoData(getAllFaqQuestionsByCategoryQuery(category), `faqQuestions_${category}`, forceLoad)
  return {
    props: {
      pageData: {
        faqArticle,
        allFaqsInCategory,
      },
    },
  }
}
