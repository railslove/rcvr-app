import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMountedState } from 'react-use'
import { useOwner, CurrentOwner } from '~lib/hooks'
import { Loading } from '~ui/blocks/Loading'

interface WithOwnerConfig {
  redirect?: 'authorized' | 'unauthorized' | false
}

const defaultConfig = {
  redirect: 'unauthorized',
}

export const withOwner = (userConfig: WithOwnerConfig = {}) => (
  ComposedComponent: React.FC
) => {
  const config = { ...defaultConfig, ...userConfig }

  const WithOwnerComp = (props) => {
    const isMounted = useMountedState()
    const [renderPage, setRenderPage] = React.useState(false)
    const { data, status, error } = useOwner()
    const router = useRouter()

    const publicKey = data?.publicKey
    React.useEffect(() => {
      if (!isMounted()) return

      if (status === 'error' && config.redirect === 'unauthorized') {
        router.replace('/business/login')
        return
      }

      if (status === 'error') {
        setRenderPage(true)
        return
      }

      if (status === 'success' && config.redirect === 'authorized') {
        if (!publicKey) {
          router.replace('/business/setup/success')
        } else {
          router.replace('/business/dashboard')
        }
        return
      }

      if (status === 'success') {
        setRenderPage(true)
        return
      }
    }, [router, status, error, isMounted, publicKey])

    return (
      <>
        <Head>
          <title key="title">recover</title>
        </Head>
        {renderPage ? (
          <ComposedComponent {...props} owner={data} />
        ) : (
          <Loading show />
        )}
      </>
    )
  }

  WithOwnerComp.displayName = `withOwner(${ComposedComponent.displayName})`

  return WithOwnerComp
}

export interface WithOwnerProps {
  owner: CurrentOwner
}
