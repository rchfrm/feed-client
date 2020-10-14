import React from 'react'
import PropTypes from 'prop-types'

import {
  Accordion,
  AccordionItem,
  AccordionItemState,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import FolderIcon from '@/icons/FolderIcon'
import ArrowHeadIcon from '@/icons/ArrowHeadIcon'

import PostsLinksLink from '@/app/PostsLinksLink'

const PostsLinksFolder = ({
  folder,
  useSelectMode,
  className,
}) => {
  return (
    <Accordion
      className={[
        'mb-5',
        className,
      ].join(' ')}
      allowMultipleExpanded
      allowZeroExpanded
    >
      <AccordionItem uuid={folder.id}>
        <AccordionItemState>
          {({ expanded }) => (
            <>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <p
                    className={[
                      'flex items-baseline',
                      useSelectMode ? 'mb-5' : 'mb-3',
                    ].join(' ')}
                  >
                    <span className="h-4 mr-3">
                      <FolderIcon className="w-auto h-full" />
                    </span>
                    <span>{folder.name}</span>
                    <ArrowHeadIcon
                      className="ml-3"
                      style={{
                        height: '0.5rem',
                        width: 'auto',
                        transform: expanded ? 'rotate(0deg) translateY(-0.05rem)' : 'rotate(-90deg) translateX(0.1rem)',
                      }}
                    />
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {folder.links.map((item) => {
                  const { id } = item
                  // LINK
                  return (
                    <PostsLinksLink
                      className="ml-8 mb-3 last:mb-0"
                      style={{ paddingLeft: '0.1rem' }}
                      key={id}
                      link={item}
                      useSelectMode={useSelectMode}
                    />
                  )
                })}
              </AccordionItemPanel>
            </>
          )}
        </AccordionItemState>
      </AccordionItem>
    </Accordion>
  )
}

PostsLinksFolder.propTypes = {
  folder: PropTypes.object.isRequired,
  useSelectMode: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostsLinksFolder.defaultProps = {
  className: null,
}


export default PostsLinksFolder
