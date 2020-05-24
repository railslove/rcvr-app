import * as React from 'react'

import { withOwner, WithOwnerProps } from '@lib/pageWrappers/withOwner'
import { OwnerApp } from '@ui/layouts/OwnerApp'

const DecryptPage: React.FC<WithOwnerProps> = () => {
  return (
    <OwnerApp title="Daten entschlüsseln">
      <div />
    </OwnerApp>
  )
}

export default withOwner()(DecryptPage)
