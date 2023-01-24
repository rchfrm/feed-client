import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import LinkIcon from '@/icons/LinkIcon'
import TrashIcon from '@/icons/TrashIcon'

import { SidePanelContext } from '@/contexts/SidePanelContext'
import useControlsStore from '@/app/stores/controlsStore'

import useCreateEditLinkBankLink from '@/app/hooks/useCreateEditLinkBankLink'
import useForceDeleteLink from '@/app/hooks/useForceDeleteLink'

import { removeProtocolFromUrl, enforceUrlProtocol } from '@/helpers/utils'
import { saveLink, usedLinkErrorCode } from '@/app/helpers/linksHelpers'
import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  artistId: state.artistId,
  savedFolders: state.savedFolders,
  updateLinks: state.updateLinks,
  setLinkBankError: state.setLinkBankError,
})

const LinkBankLink = ({
  link,
  editModeOn,
  setEditModeOn,
  className,
  style,
}) => {
  // FUNCTION FOR EDITING LINKS
  const editLink = useCreateEditLinkBankLink({
    action: 'edit',
    itemType: 'link',
    onSave: () => setEditModeOn(false),
  })

  // READ LINK STORE
  const {
    artistId,
    savedFolders,
    updateLinks,
    setLinkBankError,
  } = useControlsStore(getControlsStoreState, shallow)
  // DELETE LINK
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  const showForceDeleteModal = useForceDeleteLink()
  // Function for deleting link
  const runDeleteLink = React.useCallback(async (forceDelete) => {
    const action = 'delete'
    setSidePanelLoading(true)
    const { res: savedLink, error } = await saveLink(artistId, link, savedFolders, action, forceDelete)
    setSidePanelLoading(false)
    if (error) {
      const { code: errorCode } = error
      if (errorCode === usedLinkErrorCode) {
        const linkIds = [link.id]
        showForceDeleteModal(runDeleteLink, linkIds, 'link')
        return { error }
      }
      const linkBankError = { message: `Error deleting link. ${error.message}` }
      setLinkBankError(linkBankError)
      return
    }
    updateLinks(action, { newLink: savedLink, oldLink: link })
    setLinkBankError(null)
    return { savedLink }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedFolders])

  const { isDefaultLink } = link

  return (
    <li
      className={[
        className,
      ].join(' ')}
      style={style}
    >
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
            {! isDefaultLink && editModeOn && (
            <a
              className="text-sm text-red no-underline ml-4 pr-6 pt-3 -mt-3"
              role="button"
              onClick={() => runDeleteLink(false)}
            >
              <TrashIcon className="h-3 w-auto" fill={brandColors.red} />
            </a>
            )}
          </p>
          {/* LINK PREVIEW */}
          <a
            className="block pt-1 text-xs text-grey-dark truncate w-full"
            href={editModeOn ? null : enforceUrlProtocol(link.href)}
            target={editModeOn ? null : '_blank'}
            rel={editModeOn ? null : 'noreferrer noopener'}
            role={editModeOn ? 'button' : null}
            onClick={editModeOn ? () => editLink(link) : () => {}}
          >
            {removeProtocolFromUrl(link.href)}
          </a>
        </div>
      </div>
    </li>
  )
}

LinkBankLink.propTypes = {
  link: PropTypes.object.isRequired,
  editModeOn: PropTypes.bool.isRequired,
  setEditModeOn: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

LinkBankLink.defaultProps = {
  className: null,
  style: {},
}


export default LinkBankLink
