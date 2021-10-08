import { isFormal, isCareEnv, isHealthEnv } from '~lib/config'
import de from './checkin.de'

const pl: typeof de = {
  pageTitle: 'Checkin ...',
  whatIsRecover: 'Co to jest odzyskiwanie?',

  welcome: 'Witamy!',

  address: isFormal
    ? 'Żeby wydział zdrowia mógł cię wezwać, jeśli będzie to konieczne'
    : 'Aby wydział zdrowia mógł cię wezwać, jeśli będzie to konieczne',

  coronaRegulations:
    "Ze względu na obowiązujące przepisy corona, musisz zostawić swoje dane kontaktowe, jeśli jesteś w biznesie, który jest zobowiązany do podjęcia środków ochronnych, takich jak restauracje.' Aplikacja może być również używana dobrowolnie, aby pomóc w śledzeniu",

  dataProtection1: 'Ochrona danych jest dla nas bardzo ważna!',
  dataProtection2:
    'Twoje dane są zaszyfrowane i przechowywane w bezpieczny sposób.',
  dataProtection2_rcvr: 'przechowuje Twoje dane zaszyfrowane i bezpieczne',

  ownerIsBlockedMessage: [
    'Przepraszamy, zbieranie danych kontaktowych z odzysku nie jest już aktywne dla tej firmy. Proszę',
    'ask',
    'na miejscu w celu innego rodzaju zbierania danych kontaktowych',
  ].join(' '),

  introText: '',

  checkinError: isFormal
    ? 'Nie mogliśmy się połączyć. Czy może nie masz teraz internetu?'
    : 'Nie udało nam się połączyć. Czy może nie masz teraz internetu?',
  privacyPolicyLink: 'polityka prywatności',

  howDoesItWorkText: 'Jak działa odzyskiwanie?',

  howDoesItWorkLink: isCareEnv
    ? 'https://www.recovercare.de/fur-besucher'
    : isHealthEnv
    ? 'https://www.recover-health.de/fur-besucher'
    : 'https://www.recoverapp.de/fuer-gaeste',
}

export default pl
