import React from 'react'
import EntityOverview, { getEntityInfo } from '@/admin/EntityOverview'
import TournamentLink from '@/admin/TournamentLink'
import ArtistIntegrationLinks from '@/admin/ArtistIntegrationLinks'
import PatchArtist from '@/admin/PatchArtist'
import { useAsync } from 'react-async'
import { getCategoryOptions, getEntityCategory } from '@/admin/helpers/adminServer'
import Select from '@/elements/Select'
import { capitalise } from '@/helpers/utils'

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
  const handleChange = React.useCallback(e => {
    const { target: { value, name } } = e
    console.log('value', value)
    console.log('name', name)
  }, [])
  if (categoryIsPending || optionsArePending) {
    return <CategoryWrapper entityType={entityType}><p>Loading...</p></CategoryWrapper>
  }
  if (categoryError || optionsError) {
    return <CategoryWrapper entityType={entityType}><p>{categoryError.message}</p></CategoryWrapper>
  }
  // TODO Display category information
  // TODO Add ability to update category information
  const categoryBreakdowns = Object.keys(options)
  return (
    <CategoryWrapper entityType={entityType}>
      {categoryBreakdowns.map(breakdown => {
        let breakdownOptions = options[breakdown].map(option => ({ name: option, value: option }))
        if (!category[breakdown]) {
          breakdownOptions = [{
            value: 'no-choice',
            name: '---',
          }, ...breakdownOptions]
        }

        return (
          <>
            <h5 className="font-normal">{capitalise(breakdown)}:</h5>
            <Select
              key={breakdown}
              options={breakdownOptions}
              selectedValue={category[breakdown]}
              name={breakdown}
              handleChange={handleChange}
            />
          </>
        )
      })}
    </CategoryWrapper>
  )
}

const Entity = ({ entity, propsToDisplay }) => {
  const entityInfo = getEntityInfo(entity)
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

          {/* PATCH INSTAGRAM BUSINESS ID */}
          <PatchArtist
            artistId={entity.id}
            artistName={entity.name}
            integrations={entity.integrations}
          />
        </>
      )}
    </>
  )
}

export default Entity
