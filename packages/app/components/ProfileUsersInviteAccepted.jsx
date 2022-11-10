import React from 'react'
import Router from 'next/router'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import Success from '@/elements/Success'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import * as ROUTES from '@/app/constants/routes'

const ProfileUsersInviteAccepted = () => {
  const [seconds, setSeconds] = React.useState(5)
  const [intervalId, setIntervalId] = React.useState(0)

  const { artist } = React.useContext(ArtistContext)

  const onContinue = React.useCallback(() => {
    Router.push(ROUTES.HOME)
  }, [])

  React.useEffect(() => {
    if (seconds < 1) {
      clearInterval(intervalId)
      onContinue()
    }
  }, [intervalId, seconds, onContinue])

  React.useEffect(() => {
    setIntervalId(setInterval(() => setSeconds((prevSecond) => prevSecond - 1), 1000))

    return () => clearInterval(intervalId)
    // eslint-disable-next-line
  }, [])

  return (
    <div
      className={[
        'flex flex-1 flex-column justify-center max-w-md mx-auto',
      ].join(' ')}
    >
      <Success className="mb-2 text-xl" message="Success!" />
      <MarkdownText markdown={`You've been added to ${artist.name}'s team and can now manage their ads.`} />
      <div className="flex items-center justify-end pt-2">
        <p className="mr-6 mb-0">{seconds}s</p>
        <Button
          version="black small"
          className="w-1/3"
          onClick={() => {
            onContinue()
          }}
          trackComponentName="ProfileUsersInviteAccepted"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default ProfileUsersInviteAccepted
