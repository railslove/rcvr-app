import { isFormal } from '~lib/config'

const de = {
  title: 'QR-Code wurde heruntergeladen!',

  message1: isFormal
    ? 'Der QR-Code wurde in Ihren Downloads gespeichert. Drucken Sie ihn am besten zusammen mit einer kurzen Erklärung zum Checkin aus.'
    : 'Der QR-Code wurde in Deinen Downloads gespeichert. Drucke ihn am besten zusammen mit einer kurzen Erklärung zum Checkin aus.',

  message11: `${
    isFormal ? 'Sie können' : 'Du kannst'
  } auch einfach unsere Vorlage nutzen:`,

  listMessage1: `Scannen Sie diesen QR-Code mit Ihrer Kamera. Sollte Ihre Kamera den Code nicht erkennen, geben Sie`,

  listMessage11: `in Ihren Browser ein.`,

  listMessage2:
    'Scanne diesen QR-Code mit Deiner Kamera. Sollte Deine Kamera den Code nicht erkennen, gib',

  listMessage22: `in deinem Browser ein.`,

  listMessage3: 'Beim ersten Checkin',

  listMessage33: `${isFormal ? 'geben Sie Ihren' : 'gibst Du Deinen'} Namen,
  Telefonnummer und Adresse an. ${isFormal ? 'Ihre' : 'Deine'} Daten
  legen wir natürlich verschlüsselt und sicher ab!`,

  listMessage4: `Wenn ${isFormal ? 'Sie gehen' : 'Du gehst'}`,
  listMessage44: `${
    isFormal ? 'können Sie sich auf Ihrem' : 'kannst Du Dich auf deinem'
  } Handy wieder auschecken. So können wir noch besser herausfinden, ob${' '}
  ${isFormal ? 'Sie' : 'Du'} im Zweifel eine mögliche Kontaktperson${' '}
  ${isFormal ? 'sind' : 'bist'} oder nicht.`,

  close: 'Schließen',
}

const en: typeof de = {
  title: 'QR code has been downloaded!',

  message1: isFormal
    ? "The QR code has been saved in your downloads. It's best to print it along with a brief explanation of the checkin."
    : 'The QR code has been saved in your downloads. Print it out best together with a short explanation about the checkin.',

  message11: `'You can also just use our template:`,

  listMessage1: `Scan this QR code with your camera. If your camera does not recognize the code, type`,

  listMessage11: `into your browser`,

  listMessage2: `Scan this QR code with your camera. If your camera does not recognize the code, enter`,

  listMessage22: `enter in your browser.`,

  listMessage3: 'At first checkin',

  listMessage33: `enter your name, phone number and your address data. We store encrypted and secure, of course!`,

  listMessage4: `When you go`,
  listMessage44: `you can go on your phone and check out again. This way we can find out even better if you are in doubt a possible contact or not.`,

  close: 'close',
}

export default { de, en }
