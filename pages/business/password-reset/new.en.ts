import de from './new.de'

const en: typeof de = {
  pageTitle: 'Password Reset',
  pageHeadline: 'Password Reset',
  pageExplanation:
    'Please enter a new password with which you can log in from now on',

  passwordInputHint:
    'The password must be at least 8 characters long. At least one uppercase letter, one lowercase letter, one number and one special character.',
  passwordInputLabel: 'Password',

  passwordConfirmationInputLabel: 'Repeat password',
  passwordConfirmationRequired: 'Password confirmation must be specified',
  passwordsAreNotEqual: 'Passwords do not match',

  passwordRequired: 'Password must be specified.',
  passwordMaxLength: 'Password must not be longer than 128 characters.',
  passwordShouldMatch:
    'Password must be at least 8 characters long. At least one uppercase letter, one lowercase letter, one number and one special character.',

  passwordResetButtonText: 'Reset password',

  loginError: 'Something went wrong. Please try again.',
  loginError404: 'Sorry, the link has expired. Please request a new link',

  loginLinkText: 'To login',
}

export default en
