import { getAllReferralCodeSlugsQuery, getReferralCodeQuery } from '@/landing/graphQl/referralCodeQueries'
import getDatoData from '@/landing/helpers/getDatoData'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Page({ url }) {
  const router = useRouter()
  useEffect(() => {
    router.push(url)
  })
  return null
}

export async function getStaticPaths() {
  const query = getAllReferralCodeSlugsQuery()
  const pageKey = 'referralCodeSlugs'
  const {
    data: {
      allReferralCodeRedirects,
    },
  } = await getDatoData(query, pageKey, true)
  // Get the paths we want to pre-render based on posts
  const paths = allReferralCodeRedirects.map(({ slug }) => ({
    params: { slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { slug } }) {
  const query = getReferralCodeQuery(slug)
  const pageKey = `referralCode_${slug}`
  const {
    data: {
      referralCodeRedirect: {
        referralCode,
      },
    },
  } = await getDatoData(query, pageKey, true)
  return {
    props: {
      url: `https://app.tryfeed.co/join?code=${referralCode}`,
    },
  }
}