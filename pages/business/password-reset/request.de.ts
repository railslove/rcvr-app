import { isFormal } from '~lib/config'

export default {
  pageTitle: 'Passwort Vergessen | recover',
  pageHeadline: 'Passwort Vergessen',
  pageExplanation: `Bitte ${
    isFormal ? 'geben Sie Ihre' : 'gib Deine'
  } Email Adresse ein.
  Wir schicken dann einen Link um das Passwort zurückzusetzen an die
  angegebene Email Adresse.`,
  emailRequired: 'Email muss angegeben werden.',
}
