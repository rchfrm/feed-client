import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import styles from '@/elements/BannerBase.module.css'

const BannerBase = ({
  copy,
  textLeft,
  children,
  link,
  className,
  innerClassName,
}) => {
  const El = link ? 'a' : 'div'
  return (
    <El
      href={link}
      target={link ? '_blank' : null}
      rel={link ? 'noopener noreferrer' : null}
      className={[
        'block',
        'bg-insta text-white',
        'p-4',
        textLeft ? 'text-left' : 'text-center',
        'font-display xs:text-lg lg:text-xl',
        className,
      ].join(' ')}
      style={{
        paddingTop: '0.95rem',
      }}
    >
      <div className={['bmw', innerClassName, styles.banner].join(' ')}>
        <MarkdownText
          markdown={copy}
        />
        {children}
      </div>
    </El>
  )
}

BannerBase.propTypes = {
  copy: PropTypes.string.isRequired,
  textLeft: PropTypes.bool,
  children: PropTypes.node,
  link: PropTypes.string,
  className: PropTypes.string,
  innerClassName: PropTypes.string,
}

BannerBase.defaultProps = {
  textLeft: false,
  children: null,
  link: '',
  className: null,
  innerClassName: null,
}

export default BannerBase