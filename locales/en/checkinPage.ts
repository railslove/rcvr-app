import { isFormal, isRcvrEnv, isCareEnv, isHealthEnv } from '~lib/config'
import checkingPageDE from '~locales/de/checkinPage'

const checkingPageEN: typeof checkingPageDE = {
  whatIsRecover: 'What is Recover?',
  invalidQRCode:
    'Warning, this QR code is not part of the RecoverApp. You can open this page, but any data you enter there will be sent to {{hostname}}',
  scanCodeArea: isFormal
    ? 'Scan the QR code in the input area.'
    : 'Scan the QR code you will find on the table of participating businesses.',

  welcome: 'Welcome!',

  address: isFormal
    ? 'So the health department can call you if it is necessary.'
    : 'So the health department can call you if it is necessary',

  coronaRegulations:
    'Current corona regulations require you to leave your contact information if you are in a business that is required to take protective measures, such as restaurants. The app can also be used voluntarily to assist with tracking.',

  dataProtection: [
    'Privacy is very important to us in this!',
    isRcvrEnv
      ? 'recover stores your data encrypted and secure.'
      : 'Your data will be stored encrypted and securely.',
    'Your data will be stored encrypted and secure.',
  ].join(' '),

  ownerIsBlockedMessage: [
    'Sorry, contact data collection with recover is no longer active for this business. Please',
    'ask',
    'on site for another type of contact data capture.',
  ].join(' '),

  introText: '',

  checkinError: isFormal
    ? 'We could not establish a connection. Do you perhaps not have internet right now?'
    : 'We could not connect. Do you perhaps not have internet right now?',

  privacyPolicyLink: '{{companyName}} privacy policy',

  howDoesItWorkText: 'How does recover work?',

  howDoesItWorkLink: isCareEnv
    ? 'https://www.recovercare.de/fur-besucher'
    : isHealthEnv
    ? 'https://www.recover-health.de/fur-besucher'
    : 'https://www.recoverapp.de/fuer-gaeste',
}

export default checkingPageEN
