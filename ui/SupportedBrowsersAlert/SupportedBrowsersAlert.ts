import React from 'react'

import useLocaleObject from '~locales/useLocaleObject'
import supportedBrowsers from '~lib/supportedBrowsers'

import locales from '~ui/SupportedBrowsersAlert/locales'

const SupportedBrowsersAlert: React.FC = () => {
  const { t } = useLocaleObject(locales)

  if (
    typeof navigator != 'undefined' &&
    !supportedBrowsers.test(navigator.userAgent)
  ) {
    alert(t('message'))
  }

  return null
}

export default SupportedBrowsersAlert
