import React from 'react'
import Link from 'next/link'
import { useUser } from '@/admin/hooks/useUser'

const PageIntro = () => {
  const { user, logout } = useUser()
  return (
    <header>
      {user ? (
        <div>
          <div>
            <p>You're signed in. Email: {user.email}</p>
            <p>
              <button onClick={logout}>Log out</button>
            </p>
          </div>
        </div>
      ) : (
        <>
          <p>Hi there!</p>
          <p>
            You are not signed in.{' '}
            <Link href="/login">
              <a>Log in</a>
            </Link>
          </p>
        </>
      )}
    </header>
  )
}

export default PageIntro
