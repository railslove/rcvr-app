import { isFormal, isRcvrEnv, isCareEnv, isHealthEnv } from '~lib/config'

const de = {
  whatIsRecover: 'Was ist Recover?',

  welcome: 'Willkommen!',

  address: isFormal
    ? 'So kann das Gesundheitsamt Dich anrufen, wenn es notwendig ist.'
    : 'So kann das Gesundheitsamt Sie anrufen, wenn es notwendig ist.',

  coronaRegulations:
    'Durch die aktuellen Corona-Verordnungen musst du Deine Kontaktdaten hinterlegen, wenn Du in einem Betrieb bist der zu Schutzmaßnahmen verpflichtet ist, wie z.B. Restaurants. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',

  dataProtection: [
    'Datenschutz ist uns dabei sehr wichtig!',
    isRcvrEnv
      ? 'speichert Deine Daten verschlüsselt und sicher.'
      : 'Ihre Daten werden verschlüsselt und sicher gespeichert.',
    'Ihre Daten werden verschlüsselt und sicher gespeichert.',
  ].join(' '),

  ownerIsBlockedMessage: [
    'Die Kontaktdatenerfassung mit recover ist für diesen Betrieb leider nicht mehr aktiv. Bitte',
    isFormal ? 'fragen Sie' : 'frag',
    'vor Ort nach einer anderen Art der Kontaktdatenerfassung.',
  ].join(' '),

  introText: '',

  checkinError: isFormal
    ? 'Wir konnten keine Verbindung herstellen. Haben Sie vielleicht gerade kein Internet?'
    : 'Wir konnten keine Verbindung herstellen. Hast du vielleicht gerade kein Internet?',

  privacyPolicyLink: 'Datenschutzerklärung von {{companyName}}',

  howDoesItWorkText: 'Wie funktioniert recover?',

  howDoesItWorkLink: isCareEnv
    ? 'https://www.recovercare.de/fur-besucher'
    : isHealthEnv
    ? 'https://www.recover-health.de/fur-besucher'
    : 'https://www.recoverapp.de/fuer-gaeste',
}

const en: typeof de = {
  whatIsRecover: 'What is Recover?',

  welcome: 'Welcome!',

  address: 'So the health department can call you if it is necessary.',

  coronaRegulations:
    'Current corona regulations require you to leave your contact information if you are in a business that is required to take protective measures, such as restaurants. The app can also be used voluntarily to assist with tracking.',

  dataProtection: [
    'Privacy is very important to us in this!',
    isRcvrEnv
      ? 'stores your data encrypted and secure.'
      : 'Your data is stored encrypted and secure.',
    'Your data will be stored encrypted and secure.',
  ].join(' '),

  ownerIsBlockedMessage: [
    'Sorry, contact data collection with recover is no longer active for this business. Please',
    isFormal ? 'ask' : 'ask',
    'on site for another type of contact data capture.',
  ].join(' '),

  introText: '',

  checkinError: isFormal
    ? 'We could not establish a connection. Do you perhaps not have internet right now?'
    : 'We could not connect. Do you perhaps not have internet right now?',
  privacyPolicyLink: 'Privacy policy of {{companyName}}',

  howDoesItWorkText: 'How does recover work?',

  howDoesItWorkLink: isCareEnv
    ? 'https://www.recovercare.de/fur-besucher'
    : isHealthEnv
    ? 'https://www.recover-health.de/fur-besucher'
    : 'https://www.recoverapp.de/fuer-gaeste',
}

export default { de, en }
