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
  resetPasswordButtonText: 'Passwort Zurücksetzen',
  doneMessage: `Falls ${isFormal ? 'Ihre' : 'Deine'} Email Adresse bei uns
  registriert war haben wir ${isFormal ? 'Ihnen' : 'dir'} einen Link
  zum Passwort zurückzusetzen geschickt. Bitte${' '}
  ${isFormal ? 'überprüfen Sie Ihr' : 'überprüfe dein'} Email Konto.
  Sollte das nicht funktioniert haben,
  ${isFormal ? 'wenden Sie' : 'wende Dich'} bitte an useren`,
  goToLoginLinkText: 'Zum login',
}
