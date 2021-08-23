import { isFormal, isCareEnv, isHealthEnv } from '~lib/config'
import de from '~pages/index.de'

const en: typeof de = {
  title1: 'Checkins via QR code.',
  title2: 'Without app, easy for everyone.',

  indexIntro: isCareEnv
    ? 'Due to the current Corona regulations, you have to deposit your contact details if you are in a business that is obliged to take protective measures, such as care facilities. The app can also be used voluntarily to assist with tracking.'
    : isHealthEnv
    ? 'Due to the current Corona regulations, if you are in an establishment that is required to take protective measures, such as hospitals, you must store your contact information. The app can also be used voluntarily to assist with tracking.'
    : 'is the digital contact list for businesses and their guests. Simple, secure, fast.',

  forVisitorsAndGuests: isFormal ? 'For visitors and guests' : 'For guests',

  rcvrProtectsData: isFormal
    ? 'recover protects your data better than paper'
    : 'recover protects your data better than any paper',

  scanCode: 'Scan QR code',

  forYourCompany: isFormal ? 'For your institution' : 'For your company',

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

export default en
