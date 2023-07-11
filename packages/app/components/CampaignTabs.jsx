import React from 'react'
import UsersIcon from '@/icons/UsersIcon'
import brandColors from '../../shared/constants/brandColors'

const CampaignTabs = ({ className }) => {
  const [tab, setTab] = React.useState('results')

  const options = [
    {
      title: 'Results',
      value: 'results',
      icon: 'users',
    },
    {
      title: 'Ads',
      value: 'ads',
      icon: 'users',
    },
    {
      title: 'Audiences',
      value: 'audiences',
      icon: 'users',
    },
  ]

  const onClick = (value) => {
    setTab(value)
  }

  const icons = {
    users: UsersIcon,
  }

  return (
    <div className={[
      'inline-flex overflow-hidden',
      'rounded-dialogue text-sm text-grey-dark bg-offwhite',
      'mb-10',
      className,
    ].join(' ')}
    >
      {options.map(({ title, value, icon }) => {
        const Icon = icons[icon]
        const isActive = tab === value
        return (
          <button
            key={value}
            onClick={() => onClick(value)}
            className={[
              'flex flex-auto justify-center items-center py-2 px-3 font-bold',
              'whitespace-nowrap',
              isActive ? 'text-black bg-green' : null,
            ].join(' ')}
          >
            <Icon className="w-3 mr-2" fill={isActive ? brandColors.black : brandColors.greyDark} />
            {title}
          </button>
        )
      })}
    </div>
  )
}

export default CampaignTabs
