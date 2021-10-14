import { isFormal, isCareEnv, isHealthEnv } from '~lib/config'
import de from './checkin.de'

const en: typeof de = {
  pageTitle: 'Checkin...',
  whatIsRecover: 'What is Recover?',

  welcome: 'Welcome!',

  address: 'So the health department can call you if it is necessary.',

  coronaRegulations:
    'Current corona regulations require you to leave your contact information if you are in a business that is required to take protective measures, such as restaurants. The app can also be used voluntarily to assist with tracking.',

  dataProtection1: 'Data protection is very important to us!',
  dataProtection2: 'Your data is encrypted and stored securely.',
  dataProtection2_rcvr: 'stores your data encrypted and secure.',

  ownerIsBlockedMessage: [
    'Sorry, contact data collection with recover is no longer active for this business. Please',
    isFormal ? 'ask' : 'ask',
    'on site for another type of contact data capture.',
  ].join(' '),

  introText: '',

  checkinError: isFormal
    ? 'We could not establish a connection. Do you perhaps not have internet right now?'
    : 'We could not connect. Do you perhaps not have internet right now?',

  privacyPolicyLink: 'Privacy policy of',

  howDoesItWorkText: 'How does recover work?',

  howDoesItWorkLink: isCareEnv
    ? 'https://www.recovercare.de/fur-besucher'
    : isHealthEnv
    ? 'https://www.recover-health.de/fur-besucher'
    : 'https://www.recoverapp.de/fuer-gaeste',
}

export default en
