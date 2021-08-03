const de = {
  pageTitle: 'QR-Code scannen',
  scanCode: 'scan QR code',
  invalidQRCode:
    'Warnung, dieser QR code ist nicht Teil der RecoverApp. Sie können diese Seite öffnen, aber alle Daten, die Sie dort eingeben, werden an {{hostname}} geschickt.',
  scanCodeArea:
    'Scanne den QR-Code, den Du auf dem Tisch teilnehmender Betriebe findest.',
  scanCodeArea_formal: 'Scannen Sie den QR-Code im Eingangsbereich.',
}

const en: typeof de = {
  pageTitle: 'scan QR code',
  scanCode: 'scan QR code',
  invalidQRCode:
    'Warning, this QR code is not part of the RecoverApp. You can open this page, but any data you enter there will be sent to {{hostname}}',
  scanCodeArea:
    'Scan the QR code you find on the table of participating establishments',
  scanCodeArea_formal: 'Scan the QR code found in the entrance area.',
}

export default { de, en }
