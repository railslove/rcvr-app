import {
  isRcvrEnv,
  isFormal,
  isCareEnv,
  isFreseniusEnv,
  isHealthEnv,
} from '~lib/config'
import validatorsLocalesEN from '~lib/validators/validatorsLocales.en'
import de from '~pages/business/setup/signup.de'
import { PRIVACY_URL } from '~ui/whitelabels'

const en: typeof de = {
  ...validatorsLocalesEN,

  title: 'Create account',
  headline: 'Personal data',
  signUpText: isRcvrEnv
    ? 'With your account you can create QR codes and manage checkins of your guests.'
    : '',

  emailRegisteredError: 'This email is already registered.',

  termsOfUse1: 'I accept the',
  termsOfUseContractLink: '/contractBFSCare.pdf',
  termsOfUseContractLinkText: 'User contract',
  termsOfUse2: 'and the',

  pricingLink: 'https://www.recover-health.de/unser-pricing',
  pricingLinkText: 'prices',

  confirmContract1: 'I accept the',
  confirmContract2: 'and the',
  confirmContractLink: '/user-contract_recover-health.pdf',
  confirmContractLinkText: 'User contract',

  avvMessage1: `By pressing the button ${
    isFormal ? 'you aggree' : 'I agree'
  } with the`,

  avvPrivacyPolicyLink: isFreseniusEnv
    ? PRIVACY_URL
    : 'https://railslove.com/privacy/',

  avvPrivacyPolicyText: 'privacy policy',

  avvMessage2: 'and the',
  avvMessage3: 'agree',

  avvLink: isCareEnv
    ? '/avv/2021_AVV_recover.care.pdf'
    : isHealthEnv
    ? '/avv/AVV_recover.health.pdf'
    : '/avv/AVV_recover.pdf',

  avvLinkText: 'order processing agreement',

  submitButtonText: 'Register',
}

export default en
