/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react'
import { NextRouter } from 'next/router'
import { RouterContext } from 'next/dist/next-server/lib/router-context'

export function withTestRouter(
  tree: React.ReactElement,
  router: Partial<NextRouter> = {}
): React.ReactElement {
  const {
    route = '',
    pathname = '',
    query = {},
    asPath = pathname,
    push = async () => true,
    replace = async () => true,
    reload = () => null,
    back = () => null,
    prefetch = async () => undefined,
    beforePopState = () => null,
    isFallback = false,
    events = {
      on: () => null,
      off: () => null,
      emit: () => null,
    },
    basePath = '/',
  } = router

  return (
    <RouterContext.Provider
      value={{
        route,
        pathname,
        query,
        asPath,
        push,
        replace,
        reload,
        back,
        prefetch,
        beforePopState,
        isFallback,
        events,
        basePath,
      }}
    >
      {tree}
    </RouterContext.Provider>
  )
}
