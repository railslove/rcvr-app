import React from 'react'
import { isCareEnv, isFormal, isHealthEnv, isRcvrEnv } from '~lib/config'

export default {
  title: 'Checkins per QR-Code.',
  subtitle: 'Ohne App, einfach für alle.',
  forVisitorsAndGuests: 'Für Gäste',
  forVisitorsAndGuests_f: 'Für Besucher und Gäste',
  rcvrProtectsData: 'recover schützt Deine Daten besser als jedes Papier.',
  rcvrProtectsData_f: 'recover schützt Ihre Daten besser als Papier',
  scanCode: 'QR-Code scannen',
  yourTickets: 'Deine Tickets',
  yourTickets_f: 'Ihre Tickets',
  forYourCompany: 'Für Deinen Betrieb',
  forYourCompany_f: 'Für Ihre Einrichtung',
  goodbyePaperwork:
    'Tschüss, Zettelwirtschaft! recover ist die digitale Kontaktdatenliste deiner Gäste. Einfach, sicher, schnell.',
  goodbyePaperwork_f:
    'Tschüss, Zettelwirtschaft! recover ist die digitale Kontaktdatenliste Ihrer Besucher und Gäste. Einfach, sicher, schnell.',
  recoverForCompanies: 'Recover für Betriebe',
  recoverForCompanies_f: 'Recover für Einrichtungen',
  whatIsRecover: 'Was ist Recover?',
  invalidQRCode:
    'Warnung, dieser QR code ist nicht Teil der RecoverApp. Sie können diese Seite öffnen, aber alle Daten, die Sie dort eingeben, werden an {{hostname}} geschickt.',
  scanCodeArea: isFormal
    ? 'Scannen Sie den QR-Code im Eingangsbereich.'
    : 'Scanne den QR-Code, den Du auf dem Tisch teilnehmender Betriebe findest.',

  welcome: 'Willkommen!',

  address: isFormal
    ? 'So kann das Gesundheitsamt Sie anrufen, wenn es notwendig ist.'
    : 'So kann das Gesundheitsamt Dich anrufen, wenn es notwendig ist.',

  coronaRegulations:
    'Durch die aktuellen Corona-Verordnungen musst du Deine Kontaktdaten hinterlegen, wenn Du in einem Betrieb bist der zu Schutzmaßnahmen verpflichtet ist, wie z.B. Restaurants. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.',

  dataProtection: [
    'Datenschutz ist uns dabei sehr wichtig!',
    isRcvrEnv
      ? '<b>recover</b> speichert Deine Daten verschlüsselt und sicher.'
      : 'Ihre Daten werden verschlüsselt und sicher gespeichert.',
    'Ihre Daten werden verschlüsselt und sicher gespeichert.',
  ].join(' '),

  ownerIsBlockedMessage: [
    'Die Kontaktdatenerfassung mit recover ist für diesen Betrieb leider nicht mehr aktiv. Bitte',
    isFormal ? 'fragen Sie' : 'frag',
    'vor Ort nach einer anderen Art der Kontaktdatenerfassung.',
  ].join(' '),

  introText: '',

  checkinError: isFormal
    ? 'Wir konnten keine Verbindung herstellen. Haben Sie vielleicht gerade kein Internet?'
    : 'Wir konnten keine Verbindung herstellen. Hast du vielleicht gerade kein Internet?',

  privacyPolicyLink: 'Datenschutzerklärung von {{companyName}}',

  howDoesItWorkText: 'Wie funktioniert recover?',

  howDoesItWorkLink: isCareEnv
    ? 'https://www.recovercare.de/fur-besucher'
    : isHealthEnv
    ? 'https://www.recover-health.de/fur-besucher'
    : 'https://www.recoverapp.de/fuer-gaeste',
}
