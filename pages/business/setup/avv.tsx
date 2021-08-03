import * as React from 'react'
import useLocale from '~locales/useLocale'
import { Text } from '~ui/core'

import de from './avv.de'

const Avv: React.FC = () => {
  const t = useLocale({ de })

  return (
    <Text variant="fineprint">
      <p>
        {t('message1')}{' '}
        <a href={t('privacyPolicyLink')}>{t('privacyPolicyText')}</a>{' '}
        {t('message2')}{' '}
        <a href={t('avvLink')} target="_blank" rel="noopener noreferrer">
          {t('avvLinkText')}
        </a>{' '}
        {t('message3')}.
      </p>
    </Text>
  )
}

export default Avv
