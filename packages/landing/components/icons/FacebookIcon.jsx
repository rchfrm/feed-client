export default function FacebookIcon({ width, fill }) {
  const name = 'Facebook'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name={name}
      width={width}
      viewBox="0 0 1024 1024"
    >
      <title>{name}</title>
      <path
        fill={fill}
        d="M967 0h-911A57 57 0 0 0 0 57v911A57 57 0 0 0 57 1024H547V628H414V473H547V359c0-132 81-204 199-204 57 0 105 4 119 6V299l-81 0c-64 0-77 31-77 75V473H860l-20 155H707v396H967A57 57 0 0 0 1024 967v-911A57 57 0 0 0 967 0Z"
      />
    </svg>
  )
}
