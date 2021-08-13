import {
  isCareEnv,
  isFormal,
  isFreseniusEnv,
  isHealthEnv,
  isRcvrEnv,
} from '~lib/config'
import { privacyUrl } from '~ui/whitelabels'

export default {
  title: 'Account erstellen',
  headline: 'Persönliche Angaben',
  signupText: isRcvrEnv
    ? 'Mit deinem Account kannst du QR Codes erstellen und Checkins deiner Gäste verwalten.'
    : '',
  zipLabel: 'Postleitzahl',
  cityLabel: 'Ort',
  nameLabel: isFormal ? 'Ihr Name' : 'Dein Name',
  emailLabel: 'Email',
  phoneLabel: isFormal ? 'Ihre Telefonnummer' : 'Deine Telefonnummer',
  passwordHint:
    'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.',
  passwordLabel: 'Passwort',
  passwordConfirmLabel: 'Passwort wiederholen',

  streetLabel: 'Strasse und Hausnummer',
  companyNameLabel: isFormal
    ? 'Name Ihres Unternehmens'
    : 'Name deines Unternehmens',

  zipRequired: 'Postleitzahl muss angegeben werden.',
  cityRequired: 'Ort muss angegeben werden.',
  nameRequired: 'Name muss angegeben werden.',
  emailRequired: 'Email muss angegeben werden.',
  streetRequired: 'Strasse muss angegeben werden.',
  companyNameRequired: 'Unternehmensname muss angegeben werden.',
  passwordsDoNotMatch: 'Passwörter stimmen nicht überein.',
  confirmContractRequired: 'Sie müssen dem Vertrag zustimmen.',
  confirmPasswordRequired: 'Passwordwiederholung muss angegeben werden.',

  passwordRequired: 'Passwort muss angegeben werden.',
  passwordMaxLength: 'Das Passwort darf nicht länger als 128 Zeichen sein.',
  passwordShouldMatch:
    'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.',

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
    ? privacyUrl
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
