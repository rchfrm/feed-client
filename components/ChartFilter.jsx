
// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Button from './elements/Button'
import Checkbox from './elements/Checkbox'
import Icon from './elements/Icon'
import Nothing from './elements/Nothing'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import dataSourceDetails from '../constants/dataSources'
import brandColours from '../constants/brandColours'
// IMPORT HELPERS
import helper from './helpers/helper'
// IMPORT STYLES
import styles from './ChartContainer.module.css'

function ChartFilter(props) {
// REDEFINE PROPS AS VARIABLES
  const { availableDataSources } = props
  const { displayedDataSources } = props
  const { setDisplayedDataSources } = props
  const { setData } = props
  // END REDEFINE PROPS AS VARIABLES

  // DEFINE STATES
  const [visiblePlatform, setVisiblePlatform] = React.useState(undefined)
  // END DEFINE STATES

  return (
    <div className={styles.chartFilter}>

      <PlatformOptions
        availableDataSources={availableDataSources}
        displayedDataSources={displayedDataSources}
        visiblePlatform={visiblePlatform}
        setVisiblePlatform={setVisiblePlatform}
      />

      <DataSourceOptions
        availableDataSources={availableDataSources}
        displayedDataSources={displayedDataSources}
        visiblePlatform={visiblePlatform}
        setData={setData}
        setDisplayedDataSources={setDisplayedDataSources}
      />

    </div>
  )
}

export default ChartFilter

function PlatformOptions(props) {
// REDEFINE PROPS AS VARIABLES
  const { availableDataSources } = props
  const platforms = Object.keys(availableDataSources)
  const { displayedDataSources } = props
  const numberOfPlatforms = platforms.length
  const { setVisiblePlatform } = props
  const { visiblePlatform } = props
  // END REDEFINE PROPS AS VARIABLES

  const returnPlatformStatus = (platform, availableDataSources, displayedDataSources) => {
    // Get a list of data sources associated with the platform
    const availablePlatformDataSources = Object.keys(availableDataSources[platform])

    // Cycle through each data source, and count how many also appear
    // in the list of displayed data sources
    let numberOfDataSourcesSelected = 0
    for (let i = 0; i < availablePlatformDataSources.length; i += 1) {
      const dataSourceToCheck = availableDataSources[platform][availablePlatformDataSources[i]].id
      if (displayedDataSources.indexOf(dataSourceToCheck) >= 0) {
        numberOfDataSourcesSelected += 1
      }
    }

    // Return the status
    if (numberOfDataSourcesSelected === availablePlatformDataSources.length) {
      return 'all'
    } if (numberOfDataSourcesSelected === 0) {
      return 'none'
    }
    return 'some'
  }

  const options = platforms.map(platform => {
    const status = returnPlatformStatus(platform, availableDataSources, displayedDataSources)
    return (
      <PlatformOption
        key={platform}
        platform={platform}
        status={status}
        setVisiblePlatform={setVisiblePlatform}
        visiblePlatform={visiblePlatform}
      />
    )
  })

  const setStyle = number => {
    const col = 12.916
    const margin = 2.5
    let width = (number * col) + ((number - 1) * margin)
    if (width > 90) {
      width = 90
    }
    return {
      width: `${width}%`,
      paddingLeft: `${(100 - width) / 2}%`,
      paddingRight: `${(100 - width) / 2}%`,
    }
  }

  const style = setStyle(numberOfPlatforms)

  return (
    <ul
      className={styles.filterOptions}
      style={style}
    >
      {options}
    </ul>
  )
}

function PlatformOption(props) {
// REDEFINE PROPS AS VARIABLES
  const { platform } = props
  const { status } = props
  const { setVisiblePlatform } = props
  const { visiblePlatform } = props
  // END REDEFINE PROPS AS VARIABLES

  const expandDataSources = e => {
    if (platform === visiblePlatform) {
      setVisiblePlatform(undefined)
    } else {
      setVisiblePlatform(platform)
    }
    e.preventDefault()
  }

  const bottomBorderColour = visiblePlatform === platform ? dataSourceDetails[visiblePlatform].colour : brandColours.white.hex

  return (
    <li
      key={platform}
      id={platform}
      className={styles.platformListItem}
      style={{
        borderBottom: `2px solid ${bottomBorderColour}`,
      }}
    >

      <Button
        onClick={expandDataSources}
        version="text"
      >
        <Icon
          color={dataSourceDetails[platform].colour}
          status={status}
          version={platform}
          width={30}
        />
      </Button>

    </li>
  )
}

function DataSourceOptions(props) {
// REDEFINE PROPS AS VARIABLES
  const { availableDataSources } = props
  const { displayedDataSources } = props
  const { setData } = props
  const { setDisplayedDataSources } = props
  const { visiblePlatform } = props
  // END REDEFINE PROPS AS VARIABLES

  if (!visiblePlatform) {
    return <Nothing />
  }

  const dataSources = Object.keys(availableDataSources[visiblePlatform]).sort()

  const dataSourceOptions = dataSources.map(dataSource => {
    const dataSourceId = availableDataSources[visiblePlatform][dataSource].id
    const selected = displayedDataSources.indexOf(dataSourceId) >= 0
    return (
      <DataSourceOption
        key={dataSourceId}
        dataSource={dataSource}
        displayedDataSources={displayedDataSources}
        id={dataSourceId}
        selected={selected}
        setData={setData}
        setDisplayedDataSources={setDisplayedDataSources}
      />
    )
  })

  return (
    <div className={styles.dataSourcesList}>
      <h2>
        {helper.capitalise(visiblePlatform)}
      </h2>

      <ul className={styles.ul}>
        {dataSourceOptions}
      </ul>

    </div>
  )
}

function DataSourceOption(props) {
// REDEFINE PROPS AS VARIABLES
  const { id } = props
  const { displayedDataSources } = props
  const { selected } = props
  const { setData } = props
  const { setDisplayedDataSources } = props
  // END REDEFINE PROPS AS VARIABLES

  const updateDisplayedData = () => {
    if (displayedDataSources.indexOf(id) >= 0) {
      setDisplayedDataSources({
        type: 'remove-data-sources',
        payload: {
          data_sources: [id],
        },
      })
    } else {
      setData({
        type: 'add-to-queued',
        payload: {
          queued: [id],
        },
      })
      setDisplayedDataSources({
        type: 'add-data-sources',
        payload: {
          data_sources: [id],
        },
      })
    }
  }

  return (
    <li key={id} className={styles.li}>

      <Button
        onClick={updateDisplayedData}
        version="text"
      >
        <Checkbox
          colour={dataSourceDetails[id].colour}
          selected={selected}
          width={15}
        />
      </Button>

      <p className={styles.p}>
        {helper.translateDataSourceId(id)}
      </p>
    </li>
  )
}
