import React from 'react'

import ThePageButtonsControls from '@/app/ThePageButtonsControls'
import ThePageButtonsBudget from '@/app/ThePageButtonsBudget'

import { UserContext } from '@/contexts/UserContext'

const ThePageButtons = () => {
  const { user } = React.useContext(UserContext)
  if (!user.id) return null
  if (user.role === 'admin') return <ThePageButtonsControls />
  return <ThePageButtonsBudget />
}

export default ThePageButtons
