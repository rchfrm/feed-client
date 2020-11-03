import React from 'react'
import PropTypes from 'prop-types'

import linksStore from '@/app/store/linksStore'

import LinkIcon from '@/icons/LinkIcon'
import TrashIcon from '@/icons/TrashIcon'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import useCreateEditPostsLink from '@/app/hooks/useCreateEditPostsLink'

import RadioButton from '@/elements/RadioButton'

import { removeProtocolFromUrl } from '@/helpers/utils'
import { saveLink } from '@/app/helpers/linksHelpers'
import brandColors from '@/constants/brandColors'

const PostsLinksLink = ({
  link,
  isDefault,
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

  // DELETE LINK
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  const artistId = linksStore(state => state.artistId)
  const updateLinksStore = linksStore(state => state.updateLinksStore)
  const setLinkBankError = linksStore(state => state.setLinkBankError)
  // Function for deleting link
  const deleteLink = async () => {
    const action = 'delete'
    setSidePanelLoading(true)
    const { res: savedLink, error } = await saveLink(artistId, link, action)
    setSidePanelLoading(false)
    if (error) {
      const linkBankError = { message: `Error deleting link. ${error.message}` }
      setLinkBankError(linkBankError)
      return
    }
    updateLinksStore(action, { newLink: savedLink, oldLink: link })
    setLinkBankError(null)
  }

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
          <div>
            {/* LINK TITLE */}
            <a
              className={[
                'inline-flex items-baseline no-underline',
                editModeOn ? 'wobble-animation' : null,
              ].join(' ')}
              role="button"
              onClick={editModeOn ? () => editLink(link) : () => {}}
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
              {isDefault && (
                <span className="flex text-green pl-2 text-sm">
                  <strong className="pr-1" style={{ transform: 'translateY(0.2em)' }}>*</strong>
                  <strong>default link</strong>
                </span>
              )}
            </a>
            {/* LINK PREVIEW */}
            <a
              className="block pt-1 text-xs text-grey-3"
              href={editModeOn ? null : link.href}
              target={editModeOn ? null : '_blank'}
              rel={editModeOn ? null : 'noreferrer noopener'}
              role={editModeOn ? 'button' : null}
              onClick={editModeOn ? () => editLink(link) : () => {}}
            >
              {removeProtocolFromUrl(link.href)}
            </a>
          </div>
          {/* DELETE BUTTON */}
          {!isDefault && editModeOn && (
            <a
              className="text-sm text-red no-underline ml-4 pr-6 pt-3 -mt-3"
              role="button"
              onClick={deleteLink}
            >
              <TrashIcon className="h-3 w-auto" fill={brandColors.red} />
            </a>
          )}
        </div>
      )}
    </li>
  )
}

PostsLinksLink.propTypes = {
  link: PropTypes.object.isRequired,
  isDefault: PropTypes.bool,
  editModeOn: PropTypes.bool.isRequired,
  setEditModeOn: PropTypes.func.isRequired,
  useSelectMode: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

PostsLinksLink.defaultProps = {
  isDefault: false,
  className: null,
  style: {},
}


export default PostsLinksLink
