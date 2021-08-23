import React from 'react'
import { isCareEnv, isHealthEnv } from '~lib/config'

type PageTitleProps = {
  children?: string | string[]
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <title>
      {isCareEnv ? 'recover care' : isHealthEnv ? 'recover health' : 'recover'}
    </title>
  )
}

export default PageTitle
