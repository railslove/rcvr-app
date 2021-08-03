import { isCareEnv, isFormal, isFreseniusEnv, isHealthEnv } from '~lib/config'
import { privacyUrl } from '~ui/whitelabels'

export default {
  message1: `Mit dem Betätigen des Buttons ${
    isFormal ? 'erklären Sie sich' : 'erkläre ich mich'
  } mit den`,

  privacyPolicyLink: isFreseniusEnv
    ? privacyUrl
    : 'https://railslove.com/privacy/',

  privacyPolicyText: 'Datenschutzbestimmungen',

  message2: 'sowie der',
  message3: 'einverstanden',

  avvLink: isCareEnv
    ? '/avv/2021_AVV_recover.care.pdf'
    : isHealthEnv
    ? '/avv/AVV_recover.health.pdf'
    : '/avv/AVV_recover.pdf',

  avvLinkText: 'Auftragsverarbeitungsvereinbarung',
}
