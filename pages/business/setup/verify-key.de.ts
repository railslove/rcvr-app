import { isFormal } from '~lib/config'

export default {
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

  verifyKeyExp1:
    'Du wirst die Datei rcvr_geheimer_schluessel.txt wieder brauchen, wenn das Gesundheitsamt anruft.',
  verifyKeyExp2:
    'Zur Bestätigung, dass du den Schlüssel erhalten hast, lade den Schlüssel hier nochmal hoch.',

  verifyKeyExp1_fresenius:
    'Du wirst die Datei rcvr_geheimer_schluessel.txt wieder brauchen, wenn das Gesundheitsamt anruft.',

  verifyKeyExp2_fresenius:
    'Lade die Schlüsseldatei deshalb hier zur Bestätigung noch einmal hoch.',

  verifyKeyExpCareHealth:
    'Zur Bestätigung laden Sie die Schlüsseldatei rcvr_geheimer_schluessel.txt bitte hier hoch.',
}
