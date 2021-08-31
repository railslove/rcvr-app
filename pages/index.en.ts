import { isFormal, isCareEnv, isHealthEnv } from '~lib/config'
import de from '~pages/index.de'

const en: typeof de = {
  title1: 'Checkins via QR code.',
  title2: 'Without app, easy for everyone.',

  indexIntro: `recover is the digital contact list for ${
    isCareEnv ? 'Care Facilities' : isHealthEnv ? 'Hospitals' : 'Establishments'
  }, their visitors and guests. Simple, secure, fast.`,

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
