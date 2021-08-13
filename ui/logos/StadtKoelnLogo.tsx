import React, { memo } from 'react'

export type StadtKoelnLogoProps = {
  scale?: number
}

const StadtKoelnLogo: React.FC<StadtKoelnLogoProps> = ({ scale = 1 }) => {
  return (
    <img
      alt="stadt-koeln-logo"
      src={require('./img/stadt-koeln-logo.png')}
      height={`${20 * scale}px`}
    />
  )
}

export default memo(StadtKoelnLogo)
