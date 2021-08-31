import { isFormal } from '~lib/config'
import de from './login.de'

const pl: typeof de = {
  pageTitle: 'Login',

  title: 'Login dla firm',
  message: isFormal
    ? 'Od czasu Corony zakłady pracy są zobowiązane do rejestrowania danych kontaktowych gości. Oszczędź sobie papierkowej roboty! odzyskiwanie jest najłatwiejszym rozwiązaniem dla Ciebie - i najbezpieczniejszym dla Twoich gości'
    : 'Od czasu Corony wiele firm i placówek ma obowiązek rejestrowania danych kontaktowych. Oszczędź sobie papierkowej roboty! odzyskiwanie jest najłatwiejszym rozwiązaniem dla Ciebie - i najbezpieczniejszym dla Twoich gości i odwiedzających',

  inputEmailLabel: 'Email',
  inputPasswordLabel: 'Hasło',

  inputPasswordHint1: isFormal
    ? 'Podczas rejestracji wybrałeś swoje własne hasło. To jest'
    : 'Hasło wybrałeś sam podczas rejestracji. To jest ',
  inputPasswordHint2: 'nie',

  inputPasswordHint3: isFormal
    ? ' twój klucz prywatny'
    : ' twój klucz prywatny',

  loginButtonText: 'Zaloguj się',

  emailRequired: 'Email musi być określony',
  passwordRequired: 'Hasło musi być wpisane',

  wrongEmailOrPassword: 'Nieprawidłowy adres e-mail lub hasło',

  forgottenPasswordText: 'Zapomniałeś hasła?',
}

export default pl
