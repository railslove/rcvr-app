import { isFormal } from '~lib/config'

const de = {
  pageTitle: 'Passwort Zurücksetzen | recover',
  pageHeadline: 'Passwort Zurücksetzen',
  pageExplanation: isFormal
    ? 'Bitte gib ein neues Passwort an mit dem du Dich von jetzt an anmelden kannst.'
    : 'Bitte geben Sie ein neues Passwort an mit dem Sie sich von jetzt an anmelden können',

  passwordInputHint:
    'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.',
  passwordInputLabel: 'Passwort',

  passwordConfirmationInputLabel: 'Passwort Wiederholen',
  passwordConfirmationRequired: 'Passwortbestätigung muss angegeben werden.',
  passwordsAreNotEqual: 'Passwörter stimmen nicht überein.',

  passwordRequired: 'Passwort muss angegeben werden.',
  passwordMaxLength: 'Das Passwort darf nicht länger als 128 Zeichen sein.',
  passwordShouldMatch:
    'Das Passwort muss mindestens 8 Zeichen lang sein. Mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.',

  passwordResetButtonText: 'Passwort Zurücksetzen',

  loginError: 'Etwas ist schiefgegangen. Bitte versuch es erneut.',
  loginError404:
    'Leider ist der Link abgelaufen. Bitte fordere einen neuen Link an.',

  loginLinkText: 'Zum login',
}

const en: typeof de = {
  pageTitle: 'Password Reset | recover',
  pageHeadline: 'Password Reset',
  pageExplanation: isFormal
    ? 'Please enter a new password with which you can log in from now on'
    : 'Please enter a new password with which you can log in from now on',

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

export default { de, en }
