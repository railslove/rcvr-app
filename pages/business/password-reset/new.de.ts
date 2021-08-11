import { isFormal } from '~lib/config'

export default {
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
