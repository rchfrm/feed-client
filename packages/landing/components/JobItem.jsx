import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import Button from '@/elements/Button'

import { jobSlug } from '@/copy/LandingPageCopy'

import * as styles from '@/./JobsSummary.module.css'
import { Image } from 'react-datocms'
import Anchor from '@/elements/Anchor'


const Status = ({ open }) => {
  return (
    <span
      className={[
        'px-2',
        'pb-1',
        'align-text-bottom',
        'font-semibold',
        open ? styles.openJob : styles.closedJob,
        styles.applicationStatus,
      ].join(' ')}
    >
      { open ? 'open' : 'closed' }
    </span>
  )
}

const JobItem = ({ job, className }) => {
  const { image, title, open, slug } = job
  const link = `${jobSlug}/${slug}`
  const label = `Read more about ${title}`
  return (
    <li className={className}>
      <Anchor href={link} label={label}>
        <figure
          className={[
            styles.jobFigure,
            'relative',
            'leading-none',
          ].join(' ')}
        >
          <div className={[
            styles.jobImage,
            'absolute',
            'inset-0',
            'w-full',
            'h-full',
          ].join(' ')}
          >
            <Image data={image.responsiveImage} />
          </div>
        </figure>
      </Anchor>
      <h3 className={[
        styles.jobTitle,
        'mb-4',
        'pointer-events-none',
      ].join(' ')}
      >
        <strong>{title}</strong>
      </h3>

      <p
        className={[
          'mb-4',
          'mt-1',
        ].join(' ')}
      >
        Applications: <Status open={open} />
      </p>
      <Link href={link}>
        <Button version="text" href={link} label={label}>
          <strong>View details</strong>
        </Button>
      </Link>
    </li>
  )
}

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
  className: PropTypes.string,
}

JobItem.defaultProps = {
  className: null,
}

export default JobItem
