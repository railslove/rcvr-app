import { isFormal, isRcvrEnv } from '~lib/config'

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
  confirmContractLink: '/Nutzungsvertrag_recover-health.pdf',
  confirmContractLinkText: 'Nutzungsvertrag',

  submitButtonText: 'Registrieren',
}
