import { isFormal } from '~lib/config'
import verifyKeyDe from '~pages/business/setup/verify-key.de'

const en: typeof verifyKeyDe = {
  pageTitle: `Your key`,
  headline: 'Download key',
  createAccountStep: 'create account',

  downloadKeyButtonText: 'download key',

  privateKeyInputHint: "If you don't have the file, you can download it above",
  privateKeyInputLabel: 'Insert the key file here',
  privateKeyInputMessage: `Now please create a backup copy by printing the
  printing the key file, transferring it to a USB flash drive
  or saving the contents in a password manager.`,

  privateKeyPrintButton: 'Print key',
  privateKeySecureQuestion: isFormal
    ? 'Key stored securely and accessible? Then they can now set up their operation.'
    : 'Key kept secure and accessible? Then you can set up your operation now',

  continueButtonText: 'continue',

  youWillNeedKey1:
    'You will need this key again when the health department calls.',

  youWillNeedKey2:
    'Please keep this key in a safe, but easily accessible place for them.',

  verifyPrivateKeyError: 'Key file does not match.',
}

export default en
