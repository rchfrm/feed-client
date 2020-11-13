import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import LinkIcon from '@/icons/LinkIcon'
import TrashIcon from '@/icons/TrashIcon'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import linksStore from '@/app/store/linksStore'

import useCreateEditPostsLink from '@/app/hooks/useCreateEditPostsLink'
import useForceDeleteLink from '@/app/hooks/useForceDeleteLink'

import RadioButton from '@/elements/RadioButton'

import { removeProtocolFromUrl } from '@/helpers/utils'
import { saveLink } from '@/app/helpers/linksHelpers'
import brandColors from '@/constants/brandColors'

const getLinksStoreState = (state) => ({
  artistId: state.artistId,
  savedFolders: state.savedFolders,
  updateLinksStore: state.updateLinksStore,
  setLinkBankError: state.setLinkBankError,
})

const PostsLinksLink = ({
  link,
  editModeOn,
  setEditModeOn,
  useSelectMode,
  className,
  style,
}) => {
  // FUNCTION FOR EDITING LINKS
  const editLink = useCreateEditPostsLink({
    action: 'edit',
    itemType: 'link',
    onSave: () => setEditModeOn(false),
  })

  // READ LINK STORE
  const {
    artistId,
    savedFolders,
    updateLinksStore,
    setLinkBankError,
  } = linksStore(getLinksStoreState, shallow)
  // DELETE LINK
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  const showForceDeleteModal = useForceDeleteLink()
  // Function for deleting link
  const deleteLink = React.useCallback(async (forceDelete) => {
    const action = 'delete'
    setSidePanelLoading(true)
    const { res: savedLink, error } = await saveLink(artistId, link, savedFolders, action, forceDelete)
    setSidePanelLoading(false)
    if (error) {
      const { code: errorCode } = error
      if (errorCode === 'link_reference_error') {
        showForceDeleteModal(deleteLink)
        return
      }
      const linkBankError = { message: `Error deleting link. ${error.message}` }
      setLinkBankError(linkBankError)
      return
    }
    updateLinksStore(action, { newLink: savedLink, oldLink: link })
    setLinkBankError(null)
  }, [])

  const { isDefaultLink } = link

  return (
    <li
      className={[
        useSelectMode ? 'flex' : null,
        className,
      ].join(' ')}
      style={style}
    >
      {useSelectMode ? (
        <div>
          <RadioButton
            value={link.name}
            name={link.name}
            label={link.name}
            checked={false}
            onChange={() => {}}
          />
          <p className="text-xs text-grey-3 -mt-2 pl-10">
            <a href={link.href} className="flex items-baseline" target="_blank" rel="noreferrer noopener">
              <LinkIcon className="mr-2" />
              preview
            </a>
          </p>
        </div>
      ) : (
        <div className="mb-0 flex items-baseline">
          <div className="w-full">
            {/* LINK TITLE */}
            <p
              className={[
                'inline-flex items-baseline no-underline mb-0',
              ].join(' ')}
            >
              <a
                role="button"
                onClick={editModeOn ? () => editLink(link) : () => {}}
                className={[
                  'no-underline',
                  editModeOn ? 'wobble-animation' : null,
                ].join(' ')}
              >
                <span
                  className="inline-block mr-2"
                  style={{
                    transform: 'translateY(-0.1rem)',
                  }}
                >
                  <LinkIcon />
                </span>
                {link.name}
              </a>
              {isDefaultLink && (
                <span className="flex text-green pl-2 text-sm">
                  <strong className="pr-1" style={{ transform: 'translateY(0.2em)' }}>*</strong>
                  <strong>default link</strong>
                </span>
              )}
              {/* DELETE BUTTON */}
              {!isDefaultLink && editModeOn && (
                <a
                  className="text-sm text-red no-underline ml-4 pr-6 pt-3 -mt-3"
                  role="button"
                  onClick={() => deleteLink(false)}
                >
                  <TrashIcon className="h-3 w-auto" fill={brandColors.red} />
                </a>
              )}
            </p>
            {/* LINK PREVIEW */}
            <a
              className="block pt-1 text-xs text-grey-3 truncate w-full"
              href={editModeOn ? null : link.href}
              target={editModeOn ? null : '_blank'}
              rel={editModeOn ? null : 'noreferrer noopener'}
              role={editModeOn ? 'button' : null}
              onClick={editModeOn ? () => editLink(link) : () => {}}
            >
              {removeProtocolFromUrl(link.href)}
            </a>
          </div>
        </div>
      )}
    </li>
  )
}

PostsLinksLink.propTypes = {
  link: PropTypes.object.isRequired,
  editModeOn: PropTypes.bool.isRequired,
  setEditModeOn: PropTypes.func.isRequired,
  useSelectMode: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

PostsLinksLink.defaultProps = {
  className: null,
  style: {},
}


export default PostsLinksLink
