import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import BasicTextPageHeader from '@/BasicTextPageHeader'
import BasicTextPageCopy from '@/BasicTextPageCopy'

const JobDetails = ({ pageData }) => {
  const { jobTitle, theRole, yourSkills, location, headlineSkills, ourOffer } = pageData.data.jobListing
  const { theCompany, submissionInstructions, email } = pageData.data.jobsInfo
  const content = [
    {
      title: 'The company',
      copy: theCompany,
    },
    {
      title: 'The role',
      copy: theRole,
    },
    {
      title: 'Your skills and experience',
      copy: yourSkills,
    },
    {
      title: 'Our offer',
      copy: ourOffer,
    },
  ]
  return (
    <article
      className={[
        'mx-auto sm:max-w-3xl',
        'p-5 xs:p-8 sm:p-6',
        'py-10 xs:py-14 sm:py-20',
      ].join(' ')}
    >
      <BasicTextPageHeader
        header={jobTitle}
        tag="h1"
        size="large"
        margin="small"
        className={[
          'sm:text-center',
        ].join(' ')}
      />
      <BasicTextPageHeader
        header={headlineSkills}
        className={[
          'sm:text-center',
          'font-normal',
        ].join(' ')}
      />
      <p className={[
        'sm:text-center',
        'mb-1',
        'mb-6',
        'sm:mb-8',
      ].join(' ')}
      >
        Location: <strong>{location}</strong>
      </p>

      {/* Job Description */}
      {content.map((contentBlock, index) => {
        const { title, copy } = contentBlock

        if (copy) {
          return (
            <Fragment key={index}>
              <BasicTextPageHeader header={title} />
              <BasicTextPageCopy copy={copy} />
            </Fragment>
          )
        }
        return <Fragment key={index} />
      })}

      <hr className={[
        'mb-10',
        'xs:mb-12',
        'sm:mb-16',
      ].join(' ')}
      />

      {/*  Application Instructions */}
      <BasicTextPageCopy copy={`${submissionInstructions} [jobs@tryfeed.co](mailto:${email}).`} />

    </article>
  )
}

JobDetails.propTypes = {
  pageData: PropTypes.object.isRequired,
}

export default JobDetails
