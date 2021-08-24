import { isFormal } from '~lib/config'

const validatorsLocalesDE = {
  zipLabel: 'Postleitzahl',
  zipRequired: 'Postleitzahl muss angegeben werden.',

  cityLabel: 'Ort',
  cityRequired: 'Ort muss angegeben werden.',

  nameLabel: isFormal ? 'Ihr Name' : 'Dein Name',
  nameRequired: 'Name muss angegeben werden.',

  emailLabel: 'Email',
  emailRequired: 'Email muss angegeben werden.',

  phoneLabel: isFormal ? 'Ihre Telefonnummer' : 'Deine Telefonnummer',
  phoneInvalid: 'Telefonnummer ist nicht im richtigen Format',
  phoneRequired: 'Telefonnummer muss angegeben werden.',

  passwordLabel: 'Passwort',
  passwordHint:
    'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.',
  passwordConfirmLabel: 'Passwort wiederholen',
  passwordRequired: 'Passwort muss angegeben werden.',
  passwordMaxLength: 'Das Passwort darf nicht länger als 128 Zeichen sein.',
  passwordsDoNotMatch: 'Passwörter stimmen nicht überein.',
  passwordShouldMatch:
    'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.',
  confirmPasswordRequired: 'Passwordwiederholung muss angegeben werden.',

  streetLabel: 'Strasse und Hausnummer',
  streetRequired: 'Strasse muss angegeben werden.',

  addressLabel: 'Adresse',
  addressRequired: 'Adresse muss angegeben werden.',

  companyNameLabel: isFormal
    ? 'Name Ihres Unternehmens'
    : 'Name deines Unternehmens',
  companyNameRequired: 'Unternehmensname muss angegeben werden.',

  confirmContractRequired: 'Sie müssen dem Vertrag zustimmen.',
}

export default validatorsLocalesDE
