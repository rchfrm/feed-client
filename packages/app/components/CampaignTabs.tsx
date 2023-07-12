import React, { Dispatch, SetStateAction } from 'react'
import ChartIcon from '@/icons/ChartIcon'
import ImageIcon from '@/icons/ImageIcon'
import UsersIcon from '@/icons/UsersIcon'
import brandColors from '../../shared/constants/brandColors'

interface CampaignTabsProps {
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  className?: string
}

const CampaignTabs: React.FC<CampaignTabsProps> = ({
  tab,
  setTab,
  className,
}) => {
  const options = [
    {
      title: 'Results',
      value: 'results',
      icon: 'chart',
    },
    {
      title: 'Ads',
      value: 'ads',
      icon: 'image',
    },
    {
      title: 'Audiences',
      value: 'audiences',
      icon: 'users',
    },
  ]

  const onClick = (value: string) => {
    setTab(value)
  }

  const icons = {
    chart: ChartIcon,
    image: ImageIcon,
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
            <Icon className={[icon === 'users' ? 'w-3' : 'w-4', 'mr-2'].join(' ')} fill={isActive ? brandColors.black : brandColors.greyDark} />
            {title}
          </button>
        )
      })}
    </div>
  )
}

export default CampaignTabs
