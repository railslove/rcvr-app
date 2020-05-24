import * as React from 'react'

import { withOwner, WithOwnerProps } from '@lib/pageWrappers/withOwner'
import { OwnerApp, BackLink } from '@ui/layouts/OwnerApp'

const DecryptPage: React.FC<WithOwnerProps> = () => {
  return (
    <OwnerApp title="Daten entschlüsseln">
      <BackLink href="/business/dashboard">Meine Betriebe</BackLink>
      <div />
    </OwnerApp>
  )
}

export default withOwner()(DecryptPage)
