import indexPageDE from '../de/indexPage'
import { isCareEnv, isFormal, isHealthEnv } from '~lib/config'

const indexPageEN: typeof indexPageDE = {
  title1: 'Checkins via QR code.',
  title2: 'Without app, easy for everyone.',

  intro:
    'recover is the digital contact list for businesses and their guests. Simple, secure, fast.',
  intro_care:
    'Due to the current Corona regulations, you have to deposit your contact details if you are in a business that is obliged to take protective measures, such as care facilities. The app can also be used voluntarily to assist with tracking.',
  intro_health:
    'Due to the current Corona regulations, if you are in an establishment that is required to take protective measures, such as hospitals, you must store your contact information. The app can also be used voluntarily to assist with tracking.',

  forVisitorsAndGuests: isFormal ? 'For visitors and guests' : 'For guests',

  rcvrProtectsData: isFormal
    ? 'recover protects your data better than paper'
    : 'recover protects your data better than any paper',

  scanCode: 'scan QR code',

  forYourCompany: isFormal ? 'for your institution' : 'for your company',

  yourTickets: isFormal ? 'Your tickets' : 'Your tickets',

  goodbyePaperwork: isFormal
    ? 'Goodbye, paperwork! recover is the digital contact list of your visitors and guests. Simple, secure, fast.'
    : 'Bye, paperwork! recover is the digital contact data list of your guests. Simple, secure, fast.',

  recoverForCompanies: isFormal
    ? 'Recover for establishments'
    : 'Recover for establishments',

  whatIsRecoverLink: isCareEnv
    ? 'https://recovercare.de/'
    : isHealthEnv
    ? 'https://www.recover-health.de'
    : 'https://www.recoverapp.de/',

  whatIsRecoverLinkText: 'What is recover?',
}

export default indexPageEN
