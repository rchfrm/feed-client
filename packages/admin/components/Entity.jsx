import React from 'react'
import EntityOverview, { getEntityInfo } from '@/admin/EntityOverview'
import TournamentLink from '@/admin/TournamentLink'
import ArtistIntegrationLinks from '@/admin/ArtistIntegrationLinks'
import PatchArtist from '@/admin/PatchArtist'
import { useAsync } from 'react-async'
import { getCategoryOptions, getEntityCategory, saveEntityCategory } from '@/admin/helpers/adminServer'
import Select from '@/elements/Select'
import { capitalise } from '@/helpers/utils'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import TotalSpendLoader from '@/admin/TotalSpendLoader'
import ArtistActivationStatusButton from '@/admin/ArtistActivationStatusButton'
import ArtistCampaignStatusButton from '@/admin/ArtistCampaignStatusButton'

const CategoryWrapper = ({ entityType, children }) => {
  return (
    <>
      <h4 className="strong">{capitalise(entityType)} Category</h4>
      {children}
    </>
  )
}

const Category = ({ entityType, id }) => {
  // Get current category information for entity, if it exists
  const { data: category, error: categoryError, isPending: categoryIsPending } = useAsync({
    promiseFn: getEntityCategory,
    entityType,
    entityId: id,
  })
  // Get category information options
  const { data: options, error: optionsError, isPending: optionsArePending } = useAsync({
    promiseFn: getCategoryOptions,
    entityType,
  })
  // Store current category information for entity in state
  const [selectedCategoryType, setSelectedCategoryType] = React.useState()
  const [selectedCategoryIndustry, setSelectedCategoryIndustry] = React.useState()
  const [error, setError] = React.useState()

  React.useEffect(() => {
    if (!categoryIsPending) {
      setSelectedCategoryType(category.type || undefined)
      setSelectedCategoryIndustry(category.industry || undefined)
    }
  }, [category, categoryIsPending])


  const handleTypeChange = e => {
    setSelectedCategoryType(e.target.value)
  }

  const handleIndustryChange = e => {
    setSelectedCategoryIndustry(e.target.value)
  }

  const handleClick = async e => {
    e.preventDefault()
    if (
      !selectedCategoryType
      || selectedCategoryType === 'none'
      || !selectedCategoryIndustry
      || selectedCategoryIndustry === 'none'
    ) {
      setError({ message: 'Select a Type and Industry' })
      return
    }
    await saveEntityCategory(entityType, id, {
      type: selectedCategoryType,
      industry: selectedCategoryIndustry,
    }).catch(error => setError(error))
  }

  // Loading and error state
  if (categoryIsPending || optionsArePending) {
    return <CategoryWrapper entityType={entityType}><p>Loading...</p></CategoryWrapper>
  }
  if (categoryError || optionsError) {
    return <CategoryWrapper entityType={entityType}><p>{categoryError.message}</p></CategoryWrapper>
  }
  const typeSelectOptions = options.type.map(option => {
    const { name, id } = option
    return {
      name,
      value: id,
    }
  })
  if (!category.type) {
    typeSelectOptions.unshift({
      name: '---',
      value: 'none',
    })
  }
  const industrySelectOptions = options.industry.map(option => {
    const { name, id } = option
    return {
      name,
      value: id,
    }
  })
  if (!category.industry) {
    industrySelectOptions.unshift({
      name: '---',
      value: 'none',
    })
  }
  return (
    <CategoryWrapper entityType={entityType}>
      <h5 className="font-normal">Type:</h5>
      <Select
        options={typeSelectOptions}
        selectedValue={selectedCategoryType}
        name="type"
        handleChange={handleTypeChange}
      />
      <h5 className="font-normal">Industry:</h5>
      <Select
        options={industrySelectOptions}
        selectedValue={selectedCategoryIndustry}
        name="industry"
        handleChange={handleIndustryChange}
      />
      <Button
        version="green"
        onClick={handleClick}
        trackComponentName="Entity"
      >
        Save
      </Button>
      <Error error={error} />
    </CategoryWrapper>
  )
}

const Entity = ({ entity, propsToDisplay }) => {
  const [artistActivationStatus, setArtistActivationStatus] = React.useState(entity.status)
  const [artistCampaignStatus, setArtistCampaignStatus] = React.useState(entity.preferences.targeting.status)
  const entityInfo = getEntityInfo(entity)
  if (!entity) {
    return null
  }
  return (
    <>
      <EntityOverview entity={entity} propsToDisplay={propsToDisplay} isSingleEntity />
      {entityInfo.type === 'organization'
        && <Category entityType={entityInfo.type} id={entity.id} />}
      {entityInfo.type === 'artist' && (
      <>
        {/* LINKS */}
        <h4><strong>Links</strong></h4>

        {/* TOURNAMENTS */}
        <TournamentLink
          artistId={entity.id}
          buttonText="Artist Tournaments"
          buttonClass="w-40"
          overviewLink
          linkType="anchor"
        />

        {/* INTEGRATIONS */}
        <ArtistIntegrationLinks
          artistId={entity.id}
          integrations={entity.integrations}
        />

        <div
          className={[
            'flex',
            'flex-wrap',
            'gap-4',
            'mb-4',
          ].join(' ')}
        >

          {/* PATCH INSTAGRAM BUSINESS ID */}
          <PatchArtist
            artistId={entity.id}
            artistName={entity.name}
            integrations={entity.integrations}
          />

          {/* ACTIVATE ARTIST */}
          <ArtistActivationStatusButton
            artistId={entity.id}
            artistStatus={artistActivationStatus}
            setArtistsStatus={setArtistActivationStatus}
          />

          {/* ARTIST CAMPAIGN STATUS */}
          <ArtistCampaignStatusButton
            artistId={entity.id}
            artistStatus={artistCampaignStatus}
            setArtistStatus={setArtistCampaignStatus}
          />
        </div>

        {/* TOTAL SPEND */}
        <TotalSpendLoader
          artistId={entity.id}
          artistCurrency={entity.currency}
        />
      </>
      )}
    </>
  )
}

export default Entity
