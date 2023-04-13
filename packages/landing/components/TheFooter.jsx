import TheFooterSocialLink from '@/landing/TheFooterSocialLink'
import TheFooterColophon from '@/landing/TheFooterColophon'
import copy from '@/landing/copy/LandingPageCopy'
import useGlobalInfoStore from '@/landing/store/globalInfoStore'

const getGlobalInfo = (state) => state

const { footer: { socials, legalCopy } } = copy

const TheFooter = () => {
  // READ FROM GLOBAL STORE
  const { footerLinks: legalLinks } = useGlobalInfoStore(getGlobalInfo)

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

        <TheFooterColophon
          colophon={legalCopy.colophon}
          className={['pt-6', 'text-center', 'mb-4'].join(' ')}
          legalLinks={legalLinks}
        />
      </div>
    </footer>
  )
}

export default TheFooter
