import { privacyUrl } from '~ui/whitelabels'
import { isFormal, isFreseniusEnv, isCareEnv, isHealthEnv } from '~lib/config'

const de = {
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

const en: typeof de = {
  message1: `By pressing the button ${
    isFormal ? 'declare' : 'declare myself'
  } with the`,

  privacyPolicyLink: isFreseniusEnv
    ? privacyUrl
    : 'https://railslove.com/privacy/',

  privacyPolicyText: 'privacy policy',

  message2: 'and the',
  message3: 'agree',

  avvLink: isCareEnv
    ? '/avv/2021_AVV_recover.care.pdf'
    : isHealthEnv
    ? '/avv/AVV_recover.health.pdf'
    : '/avv/AVV_recover.pdf',

  avvLinkText: 'order processing agreement',
}

export default { de, en }
