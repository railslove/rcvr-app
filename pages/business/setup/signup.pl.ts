import { isCareEnv, isFreseniusEnv, isHealthEnv, isRcvrEnv } from '~lib/config'
import validatorsLocalesDE from '~lib/validators/validatorsLocales.de'
import { PRIVACY_URL } from '~ui/whitelabels'
import de from './signup.de'

const pl: typeof de = {
  ...validatorsLocalesDE,

  title: 'Utwórz konto',
  headline: 'Dane osobowe',

  signUpText: isRcvrEnv
    ? 'Za pomocą konta możesz tworzyć kody QR i zarządzać meldunkami swoich gości'
    : '',

  emailRegisteredError: 'Ten email jest już zarejestrowany',

  termsOfUse1: 'Akceptuję',
  termsOfUseContractLink: '/contractBFSCare.pdf',
  termsOfUseContractLinkText: 'Umowa z użytkownikiem',
  termsOfUse2: 'and the',

  pricingLink: 'https://www.recover-health.de/unser-pricing',
  pricingLinkText: 'ceny',

  confirmContract1: 'Akceptuję',
  confirmContract2: 'and the',
  confirmContractLink: '/user-contract_recover-health.pdf',
  confirmContractLinkText: 'umowa użytkowania',

  avvMessage1: `Poprzez naciśnięcie przycisku oświadczam się z`,

  avvPrivacyPolicyLink: isFreseniusEnv
    ? PRIVACY_URL
    : 'https://railslove.com/privacy/',

  avvPrivacyPolicyText: 'polityka prywatności',

  avvMessage2: 'jak również',
  avvMessage3: 'zgadzam się',

  avvLink: isCareEnv
    ? '/avv/2021_AVV_recover.care.pdf'
    : isHealthEnv
    ? '/avv/AVV_recover.health.pdf'
    : '/avv/AVV_recover.pdf',

  avvLinkText: 'Umowa dotycząca przetwarzania zamówienia',

  submitButtonText: 'Register',
}

export default pl
