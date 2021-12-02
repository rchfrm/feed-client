import React from 'react'

const Partners = () => {
  return (
    <section className="p-12 sm:p-24 bg-grey-1">
      <ul className="grid grid-cols-12 col-span-12 gap-8 mb-0">
        {[...Array(8)].map((_, index) => (
          <li
            className={[
              'col-span-6 sm:col-span-3',
              'flex justify-center items-center',
              'text-grey-3 text-xs',
              'bg-white rounded-dialogue h-20',
            ].join(' ')}
            key={index}
          >
            Partner Logo
          </li>
        ))}
      </ul>
    </section>
  )
}

Partners.propTypes = {
}

export default Partners
