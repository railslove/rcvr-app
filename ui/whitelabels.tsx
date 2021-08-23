import * as React from 'react'
import { isCareEnv } from '~lib/config'
import { Box } from '~ui/core'

const envs = {
  rcvr: {
    backgroundColor: 'bluegrey.50',
    primaryHighlightColor: '#28EE5F',
    secondaryHighlightColor: '#EA28EE',
    title: 'Für Betriebe | recover',
  },
  care: {
    backgroundColor: '#f2f2f2',
    primaryHighlightColor: '#F5B743',
    secondaryHighlightColor: '',

    title: 'Für Pflegeeinrichtungen | recover',
  },
  health: {
    backgroundColor: '#f2f2f2',
    primaryHighlightColor: '#28EE5F',
    secondaryHighlightColor: '#10D4FF',
    title: 'Für Krankenhäuser | recover',
  },
  fresenius: {
    backgroundColor: '#A6D7D7',
    primaryHighlightColor: '#009EE0',
    secondaryHighlightColor: '',
  },
}

export type WhiteLabelBuildVariant = keyof typeof envs

export const BUILD_VARIANT: WhiteLabelBuildVariant =
  (process.env.NEXT_PUBLIC_BUILD_VARIANT as WhiteLabelBuildVariant) || 'rcvr'

const { backgroundColor, primaryHighlightColor, secondaryHighlightColor } =
  envs[process.env.NEXT_PUBLIC_BUILD_VARIANT || 'rcvr']

export { backgroundColor, primaryHighlightColor, secondaryHighlightColor }

export function buildSelect<T>(variants: Record<WhiteLabelBuildVariant, T>) {
  return variants[BUILD_VARIANT]
}

export const PDF_TYPE = buildSelect({
  rcvr: 'Zusatz-Informationen',
  care: 'Hygienevorschriften',
  health: 'Hygienevorschriften',
  fresenius: '',
})

export const PRIVACY_URL = (() => {
  switch (BUILD_VARIANT) {
    case 'care':
    case 'health': {
      return 'https://www.recovercare.de/datenschutzerklarung'
    }
    case 'fresenius': {
      return 'https://www.hs-fresenius.de/datenschutzerklaerung-recover-app/'
    }
    default: {
      return 'https://railslove.com/privacy/'
    }
  }
})()
