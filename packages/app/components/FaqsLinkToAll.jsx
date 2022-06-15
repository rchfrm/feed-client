import * as ROUTES from '@/app/constants/routes'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import Link from 'next/link'
import React from 'react'

export default function FaqsLinkToAll() {
  return (
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
          'col-span-12',
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
  )
}
