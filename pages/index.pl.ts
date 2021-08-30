import { isCareEnv, isFormal, isHealthEnv } from '~lib/config'
import de from './index.de'

const pl: typeof de = {
  title1: 'Zameldowanie za pomocą kodu QR.',
  title2: 'Bez aplikacji, łatwo dla każdego.',

  indexIntro: `jest to cyfrowa lista kontaktów dla ${
    isCareEnv ? 'Care Facilities' : isHealthEnv ? 'Hospitals' : 'Establishments'
  }, ich odwiedzających i gości. Prosta, bezpieczna, szybka.`,

  forVisitorsAndGuests: isFormal ? 'Dla gości i odwiedzających' : 'Dla gości',

  rcvrProtectsData: isFormal
    ? 'Recovery chroni dane lepiej niż papier'
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
