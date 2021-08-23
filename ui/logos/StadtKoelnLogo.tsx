import React, { memo } from 'react'

import stadtKoelnLogoSrc from './img/stadt-koeln-logo.png'

export type StadtKoelnLogoProps = {
  scale?: number
}

const StadtKoelnLogo: React.FC<StadtKoelnLogoProps> = ({ scale = 1 }) => {
  return (
    <img
      alt="stadt-koeln-logo"
      src={stadtKoelnLogoSrc.src}
      height={`${20 * scale}px`}
    />
  )
}

export default memo(StadtKoelnLogo)
