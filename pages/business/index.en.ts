import { isFormal } from '~lib/config'
import indexDe from '~pages/business/index.de'

const en: typeof indexDe = {
  title: isFormal ? 'For facilities' : 'For businesses',

  subtitle: isFormal
    ? 'Since the outbreak of the Corona pandemic, hospital and healthcare facility operators are also required to record the contact details of their visitors. Save yourself the paperwork! recover is the easiest solution for you and the safest for your visitors.'
    : 'Since Corona, many businesses and facilities are required to collect contact information. Save yourself the paperwork! recover is the easiest solution for you and the safest for your visitors or guests.',

  registerTitle: isFormal ? 'Register facility' : 'Register operation',

  registerMessage: isFormal
    ? 'With recover you are ready to go in 10 minutes'
    : "With recover, you'll be ready to go in 10 minutes",

  alreadyRegisteredTitle: 'Already registered?',
  alreadyRegisteredMessage:
    'Manage your businesses, print QR codes and see current checkins.',
  alreadyRegisteredMessage_formal:
    'Manage your establishments, print QR codes and see current checkins here',

  login: 'Login',
  register: 'Register',
}

export default en
