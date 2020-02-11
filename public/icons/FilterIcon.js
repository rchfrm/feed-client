import React from 'react';

function FilterIcon(props) {
  const name = "Filter";
  return (
    <svg
      data-name={name}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      viewBox="0 0 600 600"
    >
      <title>{name}</title>
      <rect
        fill={props.fill}
        y="95.502"
        width="600"
        height="60"
        transform="translate(600 251.004) rotate(180)"
      />
      <rect
        fill={props.fill}
        x="79.306"
        y="270"
        width="441.388"
        height="60"
        transform="translate(600 600) rotate(180)"
      />
      <rect
        fill={props.fill}
        x="137.647"
        y="450"
        width="324.706"
        height="60"
        transform="translate(600 960) rotate(180)"
      />
    </svg>
  )
}

export default FilterIcon;