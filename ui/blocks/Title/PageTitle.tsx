import React from 'react'
import { isCareEnv, isHealthEnv } from '~lib/config'

type PageTitleProps = {
  children?: string
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <title key="title">
      {[
        children,
        isCareEnv ? 'recover care' : isHealthEnv ? 'recover health' : 'recover',
      ]
        .filter((v) => v)
        .join('-')}
    </title>
  )
}

export default PageTitle
