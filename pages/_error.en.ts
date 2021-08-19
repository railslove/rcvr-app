import _errorDe from './_error.de'

const en: typeof _errorDe = {
  title: "Sorry, that didn't work...",
  message1:
    'In the interest of data economy, errors are not automatically transmitted to us.',
  message2:
    'If you think this error should not have happened, or you see this error often, please mail us at',

  message3:
    'To help us help you better, also send us the following error details:',

  defaultErrorMessage: 'Sorry, an unexpected error has occurred',

  invalidPubkeyEncodingText1:
    'Apparently your QR code scanner is not working correctly.',

  invalidPubkeyEncodingText2:
    'Most phone cameras can scan QR codes without an additional app. Or use our QR code scanner',

  scanQR: 'Scan QR code',
}

export default en
