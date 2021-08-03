import { isFormal, isRcvrEnv } from '~lib/config'

const de = {
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

const en: typeof de = {
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
  confirmContractLink: '/user-contract_recover-health.pdf',
  confirmContractLinkText: 'User contract',

  submitButtonText: 'Register',
}

export default { de, en }
