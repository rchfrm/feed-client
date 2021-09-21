import React from 'react'
import PropTypes from 'prop-types'

import JobItem from '@/landing/JobItem'

import * as styles from '@/landing/BlogSummary.module.css'

const JobsSummary = ({ featuredJobListings }) => {
  // Format data from Dato
  const jobs = React.useMemo(() => {
    return featuredJobListings.map((listing) => {
      const { id, jobTitle, applicationsOpen, slug, jobImage } = listing
      return {
        id,
        title: jobTitle,
        open: applicationsOpen,
        slug,
        image: jobImage,
      }
    })
  }, [featuredJobListings])

  return (
    <section className="section--padding bmw">
      <ul className={[
        styles.blogList,
        'xs:grid',
        'grid-cols-12',
        'gap-4',
        'xs:gap-5',
        'md:gap-20',
        'lg:gap-6',
      ].join(' ')}
      >
        {jobs.map((job) => {
          return (
            <JobItem
              className={[
                styles.blogItem,
                'xs:col-span-6',
                'md:col-span-6',
                'lg:col-span-3',
              ].join(' ')}
              key={job.id}
              job={job}
            />
          )
        })}
      </ul>
    </section>
  )
}

JobsSummary.propTypes = {
  featuredJobListings: PropTypes.array.isRequired,
}

export default JobsSummary
