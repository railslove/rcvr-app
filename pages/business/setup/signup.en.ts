import {
  isRcvrEnv,
  isFormal,
  isCareEnv,
  isFreseniusEnv,
  isHealthEnv,
} from '~lib/config'
import signupDe from '~pages/business/setup/signup.de'
import { privacyUrl } from '~ui/whitelabels'

const en: typeof signupDe = {
  title: 'Create account',
  headline: 'Personal data',
  signupText: isRcvrEnv
    ? 'With your account you can create QR codes and manage checkins of your guests.'
    : '',

  zipLabel: 'Zip code',
  cityLabel: 'City',
  nameLabel: 'Your name',
  emailLabel: 'Email',
  phoneLabel: isFormal ? 'Your phone number' : 'Your phone number',
  passwordHint:
    'Password must be at least 8 characters long. At least one upper case letter, one lower case letter, one number and one special character.',
  streetLabel: 'Street and house number',
  passwordLabel: 'Password',
  passwordConfirmLabel: 'Repeat password',
  companyNameLabel: isFormal ? 'Name of your company' : 'Name of your company',

  zipRequired: 'Postal code must be specified',
  cityRequired: 'City must be specified',
  nameRequired: 'Name must be specified',
  emailRequired: 'Email must be specified.',
  streetRequired: 'Street must be specified.',
  companyNameRequired: 'Company name must be specified.',
  passwordsDoNotMatch: 'Passwords do not match.',
  confirmContractRequired: 'You must agree to the contract.',
  confirmPasswordRequired: 'Password repetition must be specified.',

  passwordRequired: 'Password must be specified.',
  passwordMaxLength: 'Password must not be longer than 128 characters.',
  passwordShouldMatch:
    'Password must be at least 8 characters long. At least one uppercase letter, one lowercase letter, one number and one special character.',

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
    ? privacyUrl
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
