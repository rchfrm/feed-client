import PropTypes from 'prop-types'
import React from 'react'

import Error from '@/elements/Error'

import get from 'lodash/get'

import { getAdminFacebookIntegration } from '@/admin/helpers/adminServer'

const getButtonName = (buttonType) => {
  if (buttonType === 'adaccount_id') return 'Ad Account'
  if (buttonType === 'instagram_id') return 'Instagram Business'
  if (buttonType === 'page_id') return 'Facebook Page'
}

const ArtistIntegrationLinks = ({ artistId, integrations }) => {
  // Trigger auth error if artist has no authorization
  const { authorization } = integrations.facebook || {}
  const hasAuth = !!authorization

  const [error, setError] = React.useState(null)
  // RUN TO OPEN LINK
  const getApiKeyAndLaunchGraphExplorer = async (id, type) => {
    const adminIntegration = await getAdminFacebookIntegration(artistId)
    let accessToken
    if (type === 'user') {
      accessToken = adminIntegration.access_token
    } else {
      const accountsObject = get(adminIntegration, ['authorization', 'accounts'], {})
      const account = Object.values(accountsObject).filter(x => x.id === id)[0]
      accessToken = account ? account.access_token : ''
    }
    if (!accessToken) {
      setError({ message: `could not determine access token for ${type} ${id}` })
      return
    }
    setError(null)
    const fbUrl = `https://developers.facebook.com/tools/explorer/?method=GET&path=${id}&version=v9.0&access_token=${accessToken}`
    window.open(fbUrl, '_blank')
  }
  // GET BUTTON LINKS
  const buttons = React.useMemo(() => {
    if (!integrations.facebook) return []
    return Object.entries(integrations.facebook).reduce((buttons, [type, id]) => {
      if (!id) return buttons
      const title = getButtonName(type)
      const buttonType = type === 'page_id' ? 'page' : 'user'
      const onClick = () => getApiKeyAndLaunchGraphExplorer(id, buttonType)
      return [...buttons, {
        title,
        id,
        onClick,
      }]
    }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [integrations, artistId])

  // Stop here if no auth
  if (!hasAuth) {
    return <Error className="pt-4" error={{ message: 'Artist does not have Facebook authorization' }} />
  }

  return (
    <div>
      {error && <Error className="pt-4" error={error} />}
      {!!buttons.length && (
        <ul className="mt-4">
          {buttons.map(({ title, id, onClick }) => {
            return (
              <li key={id} className="mb-4">
                <a role="button" onClick={onClick}>{title}</a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

ArtistIntegrationLinks.propTypes = {
  artistId: PropTypes.string.isRequired,
  integrations: PropTypes.object,
}

ArtistIntegrationLinks.defaultProps = {
  integrations: {},
}


export default ArtistIntegrationLinks
