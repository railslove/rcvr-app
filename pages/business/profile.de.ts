import { isFormal } from '~lib/config'

export default {
  pageTitle: 'Mein Profil',
  editProfile: 'Profil bearbeiten',
  myMembership: 'Meine Mitgliedschaft',
  hasNoCompaniesMessage: `${
    isFormal ? 'Sie müssen' : 'Du musst'
  } zuerst einen Betrieb anlegen.`,
  writeEmailMessage:
    'Wenn sie recover weiter nutzen möchten, schreiben sie uns eine E-Mail.',
  writeEmailButtonText: 'Email schreiben',
  upgradeNow: 'Jetzt upgraden',

  pricingInfo_care: `Sie können recover 14 Tage lang kostenlos auf Herz und Nieren testen.
  Danach kostet die Mitgliedschaft 29.90€ inkl. USt. pro Monat und
  Pflegeeinrichtung. Die Mitgliedschaft kann jederzeit zum Monatsende
  gekündigt werden.`,

  pricingInfo_health1: `Sie können recover 14 Tage lang kostenlos testen. Danach kostet die
  Mitgliedschaft für alle Krankenhäuser mit einer Größe bis 199 Betten
  199€ pro Monat, für alle Krankenhäuser mit einer Größe von 200 bis
  499 Betten 349€ pro Monat und für alle Krankenhäuser mit einer Größe
  von 500 Betten 449€ pro Monat bei einer jeweiligen Mindestlaufzeit
  von 6 Monaten.`,

  pricingInfo_health2: ` Bei Fragen zum Pricing können Sie sich jederzeit bei unserem Support
  unter team@recoverapp.de melden.`,

  pricingInfo_fresenius1: `Du kannst recover 14 Tage lang kostenlos auf Herz und Nieren testen.`,
  pricingInfo_fresenius2: `Danach kostet die Mitgliedschaft 15€ inkl. USt. pro Monat und Betrieb.
  Die Mitgliedschaft kann jederzeit zum Monatsende gekündigt werden.`,
  pricingInfo_fresenius3: `Wenn Du Anspruch auf eine kostenlose oder reduzierte Nutzung von der
  Recover App hast, melde Dich gerne bei unserem Support, damit wir
  Deinen Laden überprüfen und freischalten können`,

  pricingInfo_rcvr1: `Du kannst recover 14 Tage lang kostenlos auf Herz und Nieren testen.`,
  pricingInfo_rcvr2: `Danach kostet die Mitgliedschaft 15€ inkl. USt. pro Monat und Betrieb.
  Die Mitgliedschaft kann jederzeit zum Monatsende gekündigt werden.`,
  pricingInfo_rcvr3: `Wenn Du Anspruch auf eine kostenlose oder reduzierte Nutzung von der
  Recover App hast, melde Dich gerne bei unserem Support, damit wir
  Deinen Laden überprüfen und freischalten können`,
  pricingInfo_rcvr4: `Willst Du per Rechnung bezahlen? Kein Problem, melde Dich gerne bei
  unserem Support und wir organiseren das für Dich`,

  pricingInfoEmailSubject_rcvr: `Ich würde gerne für Recover auf Rechnung bezahlen`,
}
