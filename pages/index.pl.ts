import de from './index.de'
import { isFormal, isCareEnv, isHealthEnv } from '~lib/config'

const pl: typeof de = {
  title1: 'Zameldowanie za pomocą kodu QR.',
  title2: 'Bez aplikacji, łatwo dla każdego.',

  intro: isCareEnv
    ? 'Ze względu na obowiązujące przepisy Corona, musisz zdeponować swoje dane kontaktowe, jeśli jesteś w przedsiębiorstwie, które jest zobowiązane do podjęcia środków ochronnych, takich jak zakłady opieki. Aplikacja może być również używana dobrowolnie, aby pomóc w śledzeniu.'
    : isHealthEnv
    ? 'Ze względu na obowiązujące przepisy Corona, jeśli jesteś w zakładzie, który jest zobowiązany do podjęcia środków ochronnych, takich jak szpitale, musisz przechowywać swoje dane kontaktowe. Aplikacja może być również używana dobrowolnie, aby pomóc w śledzeniu.'
    : 'to cyfrowa lista kontaktów dla firm i ich gości. Prosta, bezpieczna, szybka.',

  forVisitorsAndGuests: isFormal ? 'Dla odwiedzających i gości' : 'Dla gości',

  rcvrProtectsData: isFormal
    ? 'Odzyskiwanie danych chroni je lepiej niż papier'
    : 'recover protects your data better than any paper',

  scanCode: 'Zeskanuj kod QR',

  forYourCompany: isFormal ? 'Dla Twojej instytucji' : 'Dla Twojej firmy',

  yourTickets: isFormal ? 'Twoje bilety' : 'Twoje bilety',

  goodbyePaperwork: isFormal
    ? 'Goodbye, paperwork! recover to cyfrowa lista kontaktów Twoich gości i odwiedzających. Prosta, bezpieczna, szybka.'
    : 'Bye, paperwork! recover to cyfrowa lista danych kontaktowych Twoich gości. Prosto, bezpiecznie, szybko.',

  recoverForCompanies: isFormal
    ? 'Odzyskaj dla zakładów pracy'
    : 'Odzyskaj dla zakładów pracy',

  whatIsRecoverLink: isCareEnv
    ? 'https://recovercare.de/'
    : isHealthEnv
    ? 'https://www.recover-health.de'
    : 'https://www.recoverapp.de/',

  whatIsRecoverLinkText: 'Co to jest odzyskanie?',
}

export default pl
