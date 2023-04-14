import TheFooterSocialLink from '@/landing/TheFooterSocialLink'
import TheFooterColophon from '@/landing/TheFooterColophon'
import socials from '@/landing/copy/SocialLinks'


const TheFooter = () => {
  return (
    <footer
      id="TheFooter"
      className={[
        'w-full',
        'bg-black',
        'text-offwhite',
        'px-5',
        'xs:px-8',
        'py-15',
      ].join(' ')}
    >
      <div className="bmw">
        <div className={['w-full'].join(' ')} />
        {/* Footer columns */}
        <nav className={[
          'grid',
          'gap-4',
          'grid-cols-12',
        ].join(' ')}
        >
          {/* socialLinks */}
          <ul className={[
            'flex',
            'justify-center',
            'mb-5',
            'col-span-12',
          ].join(' ')}
          >
            {socials.map((link, index) => {
              return <TheFooterSocialLink key={index} link={link} index={index} />
            })}
          </ul>
        </nav>

        <TheFooterColophon />
      </div>
    </footer>
  )
}

export default TheFooter
