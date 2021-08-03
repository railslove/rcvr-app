import { isFormal } from '~lib/config'

const de = {
  pageTitle: `${isFormal ? 'Ihr' : 'Dein'} Schlüssel | recover`,
  headline: 'Schlüssel herunterladen',
  createAccountStep: 'Account erstellen',

  downloadKeyButtonText: 'Schlüssel herunterladen',

  privateKeyInputHint:
    'Falls Sie die Datei nicht haben, können Sie sie oben herunterladen.',
  privateKeyInputLabel: 'Hier die Schlüsseldatei einfügen',
  privateKeyInputMessage: `Nun erstellen Sie bitte eine Sicherheitskopie, indem Sie die
  Schlüssel-Datei ausdrucken, auf einen USB-Stick übertragen
  oder den Inhalt in einem Passwortmanager speichern.`,

  privateKeyPrintButton: 'Schlüssel drucken',
  privateKeySecureQuestion: isFormal
    ? 'Schlüssel sicher und zugänglich verwahrt? Dann können sie jetzt ihren Betrieb einrichten.'
    : 'Schlüssel sicher und zugänglich verwahrt? Dann kannst du jetzt deinen Betrieb einrichten.',

  continueButtonText: 'weiter',

  youWillNeedKey1:
    'Sie werden diesen Schlüssel wieder brauchen, wenn das Gesundheitsamt anruft.',

  youWillNeedKey2:
    'Bitte bewahren sie diesen Schlüssel an einem sicheren, aber für sie gut zugänglichen Ort auf.',

  verifyPrivateKeyError: 'Schlüsseldatei stimmt nicht überein.',
}

const en: typeof de = {
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

export default { de, en }
