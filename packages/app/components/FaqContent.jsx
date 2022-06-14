import MarkdownText from '@/elements/MarkdownText'
import React from 'react'
import Link from 'next/link'
import * as ROUTES from '@/app/constants/routes'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

export default function FaqContent({ faq }) {
  const {
    question,
    answer,
  } = faq
  return (
    <>
      <Link href={ROUTES.FAQS}>
        <div
          className={[
            'inline-flex',
            'gap-2',
            'items-center',
            'mb-10',
            'cursor-pointer',
            'w-auto',
            'self-start',
          ].join(' ')}
        >
          <ArrowAltIcon direction="left" className="w-3" />
          <h4
            className={[
              'mb-0',
              'underline',
              'hover:text-green',
            ].join(' ')}
          >See all FAQs
          </h4>
        </div>
      </Link>
      <h2>{question}</h2>
      {answer.map(contentBlock => {
        const {
          id,
          copy,
          _modelApiKey: contentType,
        } = contentBlock
        // COPY
        if (contentType === 'copy') {
          return (
            <MarkdownText markdown={copy} key={id} />
          )
        }
        return null
      })}
    </>
  )
}
