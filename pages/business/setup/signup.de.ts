import { isFormal } from '~lib/config'

export default {
  pageTitle: 'Account erstellen | recover',
  title: 'Account erstellen (1/3)',

  zipLabel: 'Postleitzahl',
  cityLabel: 'Ort',
  emailLabel: 'Email',
  phoneLabel: isFormal ? 'Ihre Telefonnummer' : 'Deine Telefonnummer',
  passwordHint:
    'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.',
  passwordLabel: 'Passwort',

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
