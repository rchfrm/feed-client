import React from 'react'
import PropTypes from 'prop-types'

import { Portal } from 'react-portal'

import CloseCircle from '@/icons/CloseCircle'

import popupStore from '@/store/popupStore'

import styles from '@/PopupModal.module.css'

const PopupModal = () => {
  const content = popupStore(state => state.content)
  const closePopup = popupStore(state => state.clear)
  if (!content) return null
  return (
    <Portal>
      <div
        className={[
          'fixed',
          'top-0',
          'left-0',
          'right-0',
          'bottom-0',
          'z-30',
        ].join(' ')}
      >
        {/* Close button */}
        {/* Close button */}
        <button
          onClick={closePopup}
          className={['button--close', styles.backButton].join(' ')}
          label="Close"
        >
          <CloseCircle />
        </button>
        <div
          className={[
            'absolute',
            'top-0',
            'left-0',
            'right-0',
            'bottom-0',
            'z-2',
            'flex',
            'items-center',
            'justify-center',
            styles.inner,
          ].join(' ')}
        >
          <button
            className={['modal--background', styles.background].join(' ')}
            aria-label="close"
            onClick={closePopup}
          />
          {content}
        </div>
      </div>
    </Portal>
  )
}


export default PopupModal
