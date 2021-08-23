import * as React from 'react'
import { isCareEnv } from '~lib/config'
import { Box } from '~ui/core'

const envs = {
  rcvr: {
    backgroundColor: 'bluegrey.50',
    primaryHighlightColor: '#28EE5F',
    secondaryHighlightColor: '#EA28EE',
    formalAddress: false,
    title: 'Für Betriebe | recover',
    verifyPrivateKeyExplanation: (
      <>
        <p>
          <strong>
            Du wirst die Datei rcvr_geheimer_schluessel.txt wieder brauchen,
            wenn das Gesundheitsamt anruft.
          </strong>
        </p>
        <p>
          Zur Bestätigung, dass du den Schlüssel erhalten hast, lade den
          Schlüssel hier nochmal hoch.
        </p>
      </>
    ),
  },
  care: {
    backgroundColor: '#f2f2f2',
    primaryHighlightColor: '#F5B743',
    secondaryHighlightColor: '',

    formalAddress: true,
    title: 'Für Pflegeeinrichtungen | recover',
    verifyPrivateKeyExplanation: (
      <>
        <p>
          <strong>
            Zur Bestätigung laden Sie die Schlüsseldatei
            rcvr_geheimer_schluessel.txt bitte hier hoch.
          </strong>
        </p>
        <Box height={4} />
      </>
    ),
  },
  health: {
    backgroundColor: '#f2f2f2',
    primaryHighlightColor: '#28EE5F',
    secondaryHighlightColor: '#10D4FF',
    formalAddress: true,
    title: 'Für Krankenhäuser | recover',
    verifyPrivateKeyExplanation: (
      <>
        <p>
          <strong>
            Zur Bestätigung laden Sie die Schlüsseldatei
            rcvr_geheimer_schluessel.txt bitte hier hoch.
          </strong>
        </p>
        <Box height={4} />
      </>
    ),
  },
  fresenius: {
    backgroundColor: '#A6D7D7',
    primaryHighlightColor: '#009EE0',
    secondaryHighlightColor: '',
    verifyPrivateKeyExplanation: (
      <>
        <p>
          <strong>
            Du wirst die Datei rcvr_geheimer_schluessel.txt wieder brauchen,
            wenn das Gesundheitsamt anruft.
          </strong>
        </p>
        <p>
          Lade die Schlüsseldatei deshalb hier zur Bestätigung noch einmal hoch.
        </p>
      </>
    ),
  },
}

export type WhiteLabelBuildVariant = keyof typeof envs

export const BUILD_VARIANT: WhiteLabelBuildVariant =
  (process.env.NEXT_PUBLIC_BUILD_VARIANT as WhiteLabelBuildVariant) || 'rcvr'

const {
  signupText,
  verifyPrivateKeyExplanation,
  formalAddress,
  backgroundColor,
  primaryHighlightColor,
  secondaryHighlightColor,
} = envs[process.env.NEXT_PUBLIC_BUILD_VARIANT || 'rcvr']

export {
  signupText,
  verifyPrivateKeyExplanation,
  formalAddress,
  backgroundColor,
  primaryHighlightColor,
  secondaryHighlightColor,
}

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
