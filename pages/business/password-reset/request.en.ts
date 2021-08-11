import { isFormal } from '~lib/config'
import requestDe from '~pages/business/password-reset/request.de'

const en: typeof requestDe = {
  pageTitle: 'Forgot Password | recover',
  pageHeadline: 'Forgot Password',
  pageExplanation: `Please enter your email address.
  We will then send a link to reset the password to the
  given email address.`,
  emailRequired: 'Email must be provided.',
}

export default en
