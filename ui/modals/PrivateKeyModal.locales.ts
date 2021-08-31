const de = {
  or: 'oder',

  message1:
    'Bitte gib Deinen privaten Schlüssel ein, den du während der Registrierung notiert hast.',

  message2: `Er enthält nur Zahlen von 0 - 9 und Buchstaben von A - F. Du
  kannst ihn mit oder ohne Leerzeichen eingeben, mit Groß- oder
  Kleinbuchstaben.`,

  message3:
    'Wenn der Schlüssel als Datei vorliegt kannst du die Datei hier auswählen.',

  textPrivateKeyLabel: 'Schlüssel eingeben',
  textPrivateKeyRequired: 'Privater Schlüssel muss eingegeben werden.',
  textPrivateKeyValidationError:
    'Der private Schlüssel darf nur Zahlen und Buchstaben von A - F beinhalten.',

  filePrivateKeyLabel: 'Schüsseldatei auswählen',
  filePrivateKeyRequired: 'Schlüssel auswählen.',

  submitTextPrivateKeyError:
    'Dein privater Schlüssel konnte nicht eingelesen werden. Bitte kontrolliere ihn nochmal. ',
  submitTextPrivateKeyValidationError:
    'Dein privater Schlüssel ist nicht korrekt.',

  submitButtonText: 'Speichern',
}

const en: typeof de = {
  or: 'or',

  message1:
    'Please enter your private key that you wrote down during registration',

  message2: `It contains only numbers from 0 - 9 and letters from A - F. You
  can enter it with or without spaces, with upper or lower case
  lowercase letters.`,

  message3: 'If the key is available as a file you can select the file here.',

  textPrivateKeyLabel: 'Enter key',
  textPrivateKeyRequired: 'Private key must be entered',
  textPrivateKeyValidationError:
    'Private key must contain only numbers and letters from A - F.',

  filePrivateKeyLabel: 'Select key file',
  filePrivateKeyRequired: 'Select key file',

  submitTextPrivateKeyError:
    'Your private key could not be read. Please check it again. ',
  submitTextPrivateKeyValidationError: 'Your private key is not correct.',

  submitButtonText: 'Save',
}

export default { de, en }
