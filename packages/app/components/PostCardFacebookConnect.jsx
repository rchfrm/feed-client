import React from 'react'

import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'

import { AuthContext } from '@/contexts/AuthContext'
import brandColors from '@/constants/brandColors'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'

const PostCardFacebookConnect = () => {
  const { auth } = React.useContext(AuthContext)

  const [errors, setErrors] = React.useState([])
  const { missingScopes, providerIds } = auth

  const linkFacebook = React.useCallback(() => {
    if (missingScopes.length || providerIds.includes('facebook.com')) {
      const requestedScopes = missingScopes.length ? missingScopes : null
      firebaseHelpers.reauthFacebook(requestedScopes)
        .catch((error) => {
          setErrors([...errors, error])
        })
      return
    }
    firebaseHelpers.linkFacebookAccount()
      .catch((error) => {
        setErrors([...errors, error])
      })
  // eslint-disable-next-line
  }, [missingScopes.length, providerIds])

  return (
    <button
      className={[
        'mx-auto max-w-sm mb-12',
        'sm:max-w-none sm:mx-0 sm:mb-0',
        'col-span-12 sm:col-span-6 lg:col-span-4',
        'flex flex-column justify-center items-center p-12 text-center',
      ].join(' ')}
      onClick={linkFacebook}
    >
      <FacebookIcon className="h-8 mb-6" fill={brandColors.facebook.bg} />
      <div className="flex flex-column mb-6">
        <span className="mb-1 text-xl font-bold underline">Connect your pages</span>
        <span className="text-lg">to see your Facebook and Instagram posts</span>
      </div>
      <InstagramIcon className="h-8 mb-6" fill={brandColors.instagram.bg} />
    </button>
  )
}

PostCardFacebookConnect.propTypes = {
}

PostCardFacebookConnect.defaultProps = {
}

export default PostCardFacebookConnect
