import * as React from 'react'
import { ErrorText } from '~ui/core/ErrorText'
import { MobileApp } from '~ui/layouts/MobileApp'
import { withOwner } from '.'

export const withValidPrivateKey = () => (ComposedComponent: React.FC) => {
  const WithValidPrivateKeyComp = (props) => {
    const { owner } = props
    const hasPrivateKey = owner.privateKey?.length > 0

    return (
      <>
        {hasPrivateKey ? (
          <ComposedComponent {...props} owner={owner} />
        ) : (
          <MobileApp>
            <ErrorText>Fehler! Bitte Schlüsselprozess neustarten!</ErrorText>
          </MobileApp>
        )}
      </>
    )
  }

  WithValidPrivateKeyComp.displayName = `withValidPrivateKey(${ComposedComponent.displayName})`

  return withOwner()(WithValidPrivateKeyComp)
}
