import { isFormal } from '~lib/config'

const de = {
  pageTitle: 'Passwort Vergessen | recover',
  pageHeadline: 'Passwort Vergessen',
  pageExplanation: `Bitte ${
    isFormal ? 'geben Sie Ihre' : 'gib Deine'
  } Email Adresse ein.
  Wir schicken dann einen Link um das Passwort zurückzusetzen an die
  angegebene Email Adresse.`,
  emailRequired: 'Email muss angegeben werden.',
}

const en: typeof de = {
  pageTitle: 'Forgot Password | recover',
  pageHeadline: 'Forgot Password',
  pageExplanation: `Please enter your email address.
  We will then send a link to reset the password to the
  given email address.`,
  emailRequired: 'Email must be provided.',
}

export default { de, en }
