import ButtonFacebook from 'shared/components/elements/ButtonFacebook'

export default function HeroSignUp() {
  return (
    <div
      className={[
        'pb-8',
        'col-span-12',
        'gap-4',
        'row-start-2',
        'col-start-1',

        'xs:grid',
        'xs:grid-cols-12',
        'xs:items-center',

        'lg:col-start-1',
        'lg:col-end-7',
        'lg:grid-cols-6',
        'lg:z-10',
      ].join(' ')}
    >
      <ButtonFacebook
        className={[
          'w-full',
          'xs:w-auto',

          'xs:col-span-6',

          'lg:col-span-4',
        ].join(' ')}
        fallbackCta="Sign up with Facebook"
      >
        Sign up with Facebook
      </ButtonFacebook>
      <p
        className={[
          'mt-2',
          'mb-0',
          'text-center',

          'xs:col-span-6',
          'xs:mt-0',
          'xs:text-left',

          'lg:col-span-2',
          'lg:pl-0',
        ].join(' ')}
      >
        or email.
      </p>
    </div>
  )
}
