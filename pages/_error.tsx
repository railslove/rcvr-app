import * as React from 'react'
import { NextPageContext, NextPage } from 'next'

export type ErrorProps = {
  statusCode: number
}

const Error: NextPage<ErrorProps> = (props) => {
  return <div>Error {props.statusCode}</div>
}

export default Error

function normalizePath(path: string): string {
  return path
    .replace(/\/+$/, '')
    .replace(/\/+#/, '#')
    .replace(/\/+\?/, '?')
    .replace(/\/+/g, '/')
}

Error.getInitialProps = async (ctx: NextPageContext): Promise<ErrorProps> => {
  const { req, res, err } = ctx
  const statusCode = res?.statusCode || err?.statusCode || 404

  if (typeof window === 'undefined') {
    /**
     * Redirect trailing slashes to non-trailing slashes
     * Workaround for: https://github.com/zeit/next.js/issues/8913#issuecomment-537632531
     * Test vectors:
     * `/test/test/` -> `/test/test`
     * `/test/////test////` -> `/test/test`
     * `/test//test//?a=1&b=2` -> `/test?a=1&b=2`
     * `/test///#test` -> `/test#test`
     */
    const normalizedPath = normalizePath(req.url)
    if (req && res && req.url && normalizedPath !== req.url) {
      res.writeHead(302, { Location: normalizedPath })
      res.end()
    }
  }

  return { statusCode }
}
