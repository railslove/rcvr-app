import { isFormal } from '~lib/config'
import de from '~pages/qr.de'

const pl: typeof de = {
  pageTitle: 'Cyfrowy checkin poprzez kod QR.',
  scanCode: 'Skanowanie kodu QR.',
  scanCodeArea: isFormal
    ? 'Zeskanuj kod QR w strefie wejściowej.'
    : 'Zeskanuj kod QR, który znajdziesz na tablicach firm uczestniczących w programie.',
  invalidQRCode:
    'Ostrzeżenie. Ten kod QR nie jest częścią RecoverApp. Możesz otworzyć tę stronę, ale wszystkie dane, które tam wpiszesz, zostaną wysłane do {{hostname}}.',
}

export default pl
