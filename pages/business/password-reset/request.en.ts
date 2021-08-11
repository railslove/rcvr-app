import requestDe from '~pages/business/password-reset/request.de'

const en: typeof requestDe = {
  pageTitle: 'Forgot Password | recover',
  pageHeadline: 'Forgot Password',
  pageExplanation: `Please enter your email address.
  We will then send a link to reset the password to the
  given email address.`,
  emailRequired: 'Email must be provided.',
  resetPasswordButtonText: 'Reset Password',
  doneMessage: `If your email address was registered with us we have
  was registered we have sent you we have sent a link
  to reset your password. Please check your email account. If that didn't work, please contact our`,
  goToLoginLinkText: 'To Login',
}

export default en
