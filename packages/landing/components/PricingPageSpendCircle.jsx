export default function PricingPageSpendCircle({
  amount,
  color,
  className,
}) {
  return (
    <div
      className={[
        className,
        `bg-${color}`,
        'rounded-full',
        'after:block',
        'after:pb-full',
      ].join(' ')}
    >
      {amount}
    </div>
  )
}
