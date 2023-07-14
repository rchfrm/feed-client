import React from 'react'
import ChartLine from '@/app/ChartLine'
import ChartLegend from '@/app/ChartLegend'
import brandColors from '@/constants/brandColors'

const CampaignResultsChart: React.FC = () => {
  // TODO (Campaign detail page): Format both y-axis' labels (left, right) based on the two data sets (engagement rate and cost per engagement)

  const legendItems = [
    {
      description: 'Engagement rate',
      color: brandColors.green,
      shouldShow: true,
    },
    {
      description: 'Cost per engagement',
      color: brandColors.yellow,
      shouldShow: true,
    },
  ]

  const data = [
    {
      primaryData: {
        "2022-05-20": 0,
        "2022-05-21": 0,
        "2022-05-22": 0,
        "2022-05-23": 0,
        "2022-05-24": 0.5,
        "2022-05-25": 5.6,
        "2022-05-26": 5.66,
        "2022-05-27": 5.52,
        "2022-05-28": 5.94,
        "2022-05-29": 5.53,
        "2022-05-30": 5.28,
        "2022-05-31": 5.33,
        "2022-06-01": 5.25,
        "2022-06-02": 5.28,
      },
      secondaryData: null,
      projections: [],
      color: {
        primary: brandColors.green,
      },
      label: {
        primary: 'Engagement rate',
      }
    },
    {
      primaryData: {
        "2022-05-20": 0,
        "2022-05-21": 0,
        "2022-05-22": 0,
        "2022-05-23": 0,
        "2022-05-24": 1.4,
        "2022-05-25": 1.9,
        "2022-05-26": 8.36,
        "2022-05-27": 5.51,
        "2022-05-28": 4.30,
        "2022-05-29": 1.53,
        "2022-05-30": 1.28,
        "2022-05-31": 2.04,
        "2022-06-01": 3.96,
        "2022-06-02": 4.18,
      },
      secondaryData: null,
      projections: [],
      color: {
        primary: brandColors.yellow,
      },
      label: {
        primary: 'Cost per engagement',
      }
    }
  ]

  return (
    <>
      <div className="font-bold">Timeline</div>
      <ChartLine
        data={data}
        currency="GBP"
        hasMultiAxis
      />
      <ChartLegend items={legendItems} />
    </>
  )
}

export default CampaignResultsChart
