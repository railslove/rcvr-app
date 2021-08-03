import { isFormal } from '~lib/config'

const de = {
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

  emailRequired: 'Email muss angegeben werden.',
  passwordRequired: 'Password muss angegeben werden.',

  wrongEmailOrPassword: 'E-Mail oder Passwort falsch',

  forgottenPasswordText: 'Passwort vergessen?',
}

const en: typeof de = {
  pageTitle: 'Login',

  title: 'Login for companies',
  message: isFormal
    ? 'Since Corona, establishments are required to record guests contact information. Save yourself the paperwork! recover is the easiest solution for you - and the safest for your visitors.'
    : 'Since Corona, many businesses and establishments are required to collect contact information. Save yourself the paperwork! recover is the easiest solution for you - and the safest for your guests',

  inputEmailLabel: 'Email',
  inputPasswordLabel: 'Password',

  inputPasswordHint1:
    'Your password you chose yourself during registration. This is ',
  inputPasswordHint2: 'not',

  inputPasswordHint3: 'your private key.',

  loginButtonText: 'Login',

  emailRequired: 'Email must be specified',
  passwordRequired: 'Password must be specified.',

  wrongEmailOrPassword: 'Email or password incorrect',

  forgottenPasswordText: 'Forgot password?',
}

export default { de, en }
