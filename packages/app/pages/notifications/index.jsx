import React from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

import { formatDictionary } from '@/app/helpers/notificationsHelpers'

import NotificationsContent from '@/app/NotificationsContent'

// Dato data
import getDatoData from '@/helpers/getDatoData'

const headerConfig = {
  text: 'notifications',
}

const Page = ({ notificationsDictionary }) => {
  const dictionaryFormatted = React.useMemo(() => {
    return formatDictionary(notificationsDictionary)
  }, [notificationsDictionary])
  return (
    <BasePage
      headerConfig={headerConfig}
      artistRequired
      staticPage
    >
      <NotificationsContent notificationsDictionary={dictionaryFormatted} />
    </BasePage>
  )
}

const query = `
  query {
    allNotifications {
      id
      topic
      code
      subcode
      title
      actionable
      dismissable
      hide
      appSummary
      appMessage
      ctaText
      apiMethod
      apiEndpoint
    }
  }
`

export async function getStaticProps() {
  const forceLoad = false
  const { data: { allNotifications } } = await getDatoData(query, 'notificationsQuery', forceLoad)
  return {
    props: {
      notificationsDictionary: allNotifications,
    },
  }
}


export default testPageReady('app')(Page)
