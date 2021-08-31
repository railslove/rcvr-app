import { isFormal } from '~lib/config'

export default {
  pageTitle: 'QR-Code scannen',
  scanCode: 'Scan QR code',

  invalidQRCode1:
    'Warnung, dieser QR code ist nicht Teil der RecoverApp. Sie können diese Seite öffnen, aber alle Daten, die Sie dort eingeben, werden an ',

  invalidQRCode2: ' geschickt.',

  scanCodeArea: isFormal
    ? 'Scannen Sie den QR-Code im Eingangsbereich.'
    : 'Scanne den QR-Code, den Du auf dem Tisch teilnehmender Betriebe findest.',
}
