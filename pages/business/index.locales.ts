import { isFormal } from '~lib/config'

const de = {
  title: isFormal ? 'Für Einrichtungen' : 'Für Betriebe',

  subtitle: isFormal
    ? 'Seit Ausbruch der Corona-Pandemie sind auch Krankenhausbetreiber und Betreiber von Gesundheitseinrichtungen verpflichtet die Kontaktdaten Ihrer Besucher zu erfassen. Ersparen Sie sich die Zettelwirtschaft! recover ist die einfachste Lösung für Sie und die sicherste für Ihre Besucher.'
    : 'Seit Corona sind viele Betriebe und Einrichtungen verpflichtet, Kontaktdaten zu erfassen. Erspar Dir die Zettelwirtschaft! recover ist die einfachste Lösung für Dich und die sicherste für Deine Besucher oder Gäste.',

  registerTitle: isFormal ? 'Einrichtung registrieren' : 'Betrieb registrieren',

  registerMessage: isFormal
    ? 'Mit recover sind Sie startklar in 10 Minuten.'
    : 'Mit recover bist Du startklar in 10 Minuten.',

  alreadyRegisteredTitle: 'Schon registriert?',
  alreadyRegisteredMessage:
    'Verwalte Deine Betriebe, drucke QR Codes aus und sehe aktuelle Checkins.',
  alreadyRegisteredMessage_formal:
    'Hier können Sie ihre Einrichtungen verwalten, QR Codes ausdrucken und aktuelle Checkins sehen.',

  login: 'Einloggen',
}

const en: typeof de = {
  title: isFormal ? 'For facilities' : 'For businesses',

  subtitle: isFormal
    ? 'Since the outbreak of the Corona pandemic, hospital and healthcare facility operators are also required to record the contact details of their visitors. Save yourself the paperwork! recover is the easiest solution for you and the safest for your visitors.'
    : 'Since Corona, many businesses and facilities are required to collect contact information. Save yourself the paperwork! recover is the easiest solution for you and the safest for your visitors or guests.',

  registerTitle: isFormal ? 'Register facility' : 'Register operation',

  registerMessage: isFormal
    ? 'With recover you are ready to go in 10 minutes'
    : "With recover, you'll be ready to go in 10 minutes",

  alreadyRegisteredTitle: 'Already registered?',
  alreadyRegisteredMessage:
    'Manage your businesses, print QR codes and see current checkins.',
  alreadyRegisteredMessage_formal:
    'Manage your establishments, print QR codes and see current checkins here',

  login: 'Login',
}

export default { de, en }
