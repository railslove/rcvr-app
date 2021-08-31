import { isFormal } from './../../lib/config'
import de from './index.de'

const pl: typeof de = {
  title: isFormal ? 'Dla instytucji' : 'Dla przedsiębiorstw',

  subtitle: isFormal
    ? 'Od czasu wybuchu pandemii Corony, operatorzy szpitali i placówek służby zdrowia mają również obowiązek rejestrowania danych kontaktowych osób odwiedzających. Oszczędź sobie papierkowej roboty! odzyskiwanie jest najłatwiejszym rozwiązaniem dla Ciebie i najbezpieczniejszym dla Twoich gości'
    : 'Od czasu Corony wiele firm i placówek ma obowiązek rejestrowania danych kontaktowych. Oszczędź sobie papierkowej roboty! odzyskiwanie jest najłatwiejszym rozwiązaniem dla Ciebie i najbezpieczniejszym dla Twoich gości lub odwiedzających',
  registerTitle: isFormal ? 'Obiekt rejestracji' : 'Operacja rejestracji',

  registerMessage: isFormal
    ? 'Z odzysku jesteś gotowy do pracy w ciągu 10 minut'
    : 'Z odzysku, będziesz gotowy do pracy w 10 minut',

  alreadyRegisteredTitle: 'Już zarejestrowany?',
  alreadyRegisteredMessage:
    'Zarządzaj swoimi firmami, drukuj kody QR i zobacz aktualne zameldowania',
  alreadyRegisteredMessage_formal:
    'Zarządzaj swoimi placówkami, drukuj kody QR i zobacz aktualne zameldowania tutaj',

  login: 'Zaloguj się',
  register: 'Rejestr',
}

export default pl
