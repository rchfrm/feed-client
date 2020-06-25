// IMPORT PACKAGES
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import brandColors from '@/constants/brandColors'
// IMPORT STYLES
import * as utils from '@/helpers/utils'
// IMPORT STYLES
import styles from '@/app/InsightsPage.module.css'

const ChartDoughnut = ({
  data,
}) => {
  // DEFINE STATES
  const [currentPlatform] = React.useState(data.platform)
  const [currentDataSource] = React.useState(data.source)
  const [displayData, setDisplayData] = React.useState([])
  const [dataColors, setDataColors] = React.useState([])
  // UPDATE DATA
  React.useEffect(() => {
    const { mostRecent: { value } } = data
    const { bg: color } = brandColors[currentPlatform]
    setDisplayData([value])
    setDataColors([color])
  }, [currentDataSource])

  return (
    <div className={styles.chartContainer__doughnut}>
      <Doughnut
        width={100}
        height={100}
        data={{
          labels: [currentDataSource],
          datasets: [
            {
              backgroundColor: dataColors,
              data: displayData,
            },
          ],
        }}
        options={{
          legend: {
            display: false,
          },
          cutoutPercentage: 65.738,
          tooltips: {
            backgroundColor: utils.hexToRGBA(brandColors.bgColor, 0.9),
            borderColor: brandColors.textColor,
            titleFontFamily: "'Inter', 'sans-serif'",
            bodyFontFamily: "'Inter', 'sans-serif'",
            titleFontSize: 18,
            bodyFontSize: 15,
            titleMarginBottom: 9,
            titleFontColor: brandColors.textColor,
            bodyFontColor: brandColors.textColor,
            bodySpacing: 5,
            xPadding: 15,
            yPadding: 15,
            callbacks: {
              label(tooltipItem, chart) {
                const dataSourceIndex = tooltipItem.index
                const dataSourceValue = chart.datasets[0].data[dataSourceIndex]
                return ` ${utils.formatNumber(dataSourceValue)}: ${utils.capitalise(data.title)}`
              },
            },
          },
        }}
      />
    </div>
  )
}

export default ChartDoughnut
