import React from 'react'
import { isCareEnv, isHealthEnv } from '~lib/config'

type PageTitleProps = {
  children?: string
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <title key="title">
      {[
        children
          ? children
          : (isCareEnv && 'Für Pflegeeinrichtungen') ||
            (isHealthEnv && 'Für Krankenhäuser') ||
            'Für Betriebe',
        (isCareEnv && 'recover care') ||
          (isHealthEnv && 'recover health') ||
          'recover',
      ]
        .filter((v) => v)
        .join(' | ')}
    </title>
  )
}

export default PageTitle
