const envs = {
  rcvr: {
    backgroundColor: 'bluegrey.50',
    primaryHighlightColor: '#28EE5F',
    secondaryHighlightColor: '#EA28EE',

    /* non-theme constants */
    PRIVACY_URL: 'https://railslove.com/privacy/',
  },
  care: {
    backgroundColor: '#f2f2f2',
    primaryHighlightColor: '#F5B743',
    secondaryHighlightColor: '',

    /* non-theme constants */
    PRIVACY_URL: 'https://www.recovercare.de/datenschutzerklarung',
  },
  health: {
    backgroundColor: '#f2f2f2',
    primaryHighlightColor: '#28EE5F',
    secondaryHighlightColor: '#10D4FF',

    /* non-theme constants */
    PRIVACY_URL: 'https://www.recover-health.de/datenschutzerklarung',
  },
  fresenius: {
    backgroundColor: '#A6D7D7',
    primaryHighlightColor: '#009EE0',
    secondaryHighlightColor: '',

    /* non-theme constants */
    PRIVACY_URL:
      'https://www.hs-fresenius.de/datenschutzerklaerung-recover-app/',
  },
}

export type WhiteLabelBuildVariant = keyof typeof envs

export const BUILD_VARIANT: WhiteLabelBuildVariant =
  (process.env.NEXT_PUBLIC_BUILD_VARIANT as WhiteLabelBuildVariant) || 'rcvr'

export const {
  backgroundColor,
  primaryHighlightColor,
  secondaryHighlightColor,
  /* non-theme constants */
  PRIVACY_URL,
} = envs[BUILD_VARIANT]
