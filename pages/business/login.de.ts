import { isFormal } from '~lib/config'

export default {
  pageTitle: 'Login',

  title: 'Login für Betriebe',
  message: isFormal
    ? 'Seit Corona sind Einrichtungen verpflichtet die Kontaktdaten von Gästen zu erfassen. Ersparen Sie sich die Zettelwirtschaft! recover ist die einfachste Lösung für Sie - und die sicherste für Ihre Besucher.'
    : 'Seit Corona sind viele Betriebe und Einrichtungen verpflichtet, Kontaktdaten zu erfassen. Erspar Dir die Zettelwirtschaft! recover ist die einfachste Lösung für Dich und die sicherste für Deine Besucher oder Gäste.',

  inputEmailLabel: 'E-Mail',
  inputPasswordLabel: 'Passwort',

  inputPasswordHint1: isFormal
    ? 'Ihr Passwort haben Sie während der Registrierung selbst gewählt. Das ist '
    : 'Dein Password hast du während der Registrierung selbst gewählt. Das ist ',
  inputPasswordHint2: 'nicht',

  inputPasswordHint3: isFormal
    ? ' Ihr privater Schlüssel.'
    : ' dein privater Schlüssel.',

  loginButtonText: 'Login',

  wrongEmailOrPassword: 'E-Mail oder Passwort falsch',

  forgottenPasswordText: 'Passwort vergessen?',
}
