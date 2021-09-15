
export default function GlobeIcon({ width, fill }) {
  const name = 'Website'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      name={name}
      fill="none"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{name}</title>

      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <line
        x1="2"
        y1="12"
        x2="22"
        y2="12"
      />
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      />

    </svg>
  )
}
