import * as React from 'react'
import { IIconProps } from './types'

export const MapPinIcon = (props: IIconProps): React.ReactElement => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <title>Map pin</title>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx={12} cy={10} r={3} />
  </svg>
)
