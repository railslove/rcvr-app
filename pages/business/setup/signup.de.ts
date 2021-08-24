import {
  isFormal,
  isRcvrEnv,
  isCareEnv,
  isHealthEnv,
  isFreseniusEnv,
} from '~lib/config'

import { PRIVACY_URL } from '~ui/whitelabels'
import validatorsLocalesDE from '~lib/validators/validatorsLocales.de'

export default {
  ...validatorsLocalesDE,

  title: 'Account erstellen',
  headline: 'Persönliche Angaben',

  signUpText: isRcvrEnv
    ? 'Mit deinem Account kannst du QR Codes erstellen und Checkins deiner Gäste verwalten.'
    : '',

  emailRegisteredError: 'Diese Email ist bereits registriert.',

  termsOfUse1: 'Ich akzeptiere den',
  termsOfUseContractLink: '/VertragBFSCare.pdf',
  termsOfUseContractLinkText: 'Nutzungsvertrag',
  termsOfUse2: 'und die',

  pricingLink: 'https://www.recover-health.de/unser-pricing',
  pricingLinkText: 'Preise',

  confirmContract1: 'Ich akzeptiere den',
  confirmContract2: 'und die',
  confirmContractLink: '/Nutzungsvertrag_recover-health.pdf',
  confirmContractLinkText: 'Nutzungsvertrag',

  avvMessage1: `Mit dem Betätigen des Buttons ${
    isFormal ? 'erklären Sie sich' : 'erkläre ich mich'
  } mit den`,

  avvPrivacyPolicyLink: isFreseniusEnv
    ? PRIVACY_URL
    : 'https://railslove.com/privacy/',

  avvPrivacyPolicyText: 'Datenschutzbestimmungen',

  avvMessage2: 'sowie der',
  avvMessage3: 'einverstanden',

  avvLink: isCareEnv
    ? '/avv/2021_AVV_recover.care.pdf'
    : isHealthEnv
    ? '/avv/AVV_recover.health.pdf'
    : '/avv/AVV_recover.pdf',

  avvLinkText: 'Auftragsverarbeitungsvereinbarung',

  submitButtonText: 'Registrieren',
}
