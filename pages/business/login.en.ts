import { isFormal } from '~lib/config'
import loginDe from '~pages/business/login.de'

const en: typeof loginDe = {
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

export default en
