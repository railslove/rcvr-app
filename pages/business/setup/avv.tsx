import * as React from 'react'
import { isCareEnv, isFormal, isFreseniusEnv, isHealthEnv } from '~lib/config'
import { Text } from '~ui/core'
import { PRIVACY_URL } from '~ui/whitelabels'

const Avv: React.FC = () => {
  const getAvvLink = () => {
    if (isCareEnv) {
      return '/avv/2021_AVV_recover.care.pdf'
    } else if (isHealthEnv) {
      return '/avv/AVV_recover.health.pdf'
    } else {
      return '/avv/AVV_recover.pdf'
    }
  }

  return (
    <Text variant="fineprint">
      <p>
        Mit dem Betätigen des Buttons{' '}
        {isFormal ? 'erklären Sie sich' : 'erkläre ich mich'} mit den{' '}
        <a
          href={isFreseniusEnv ? PRIVACY_URL : 'https://railslove.com/privacy/'}
        >
          Datenschutzbestimmungen
        </a>{' '}
        sowie der{' '}
        <a href={getAvvLink()} target="_blank" rel="noopener noreferrer">
          Auftragsverarbeitungsvereinbarung
        </a>{' '}
        einverstanden.
      </p>
    </Text>
  )
}

export default Avv
