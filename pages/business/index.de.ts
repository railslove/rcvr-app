import { isFormal } from '~lib/config'

export default {
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
  register: 'Registrieren',
}
