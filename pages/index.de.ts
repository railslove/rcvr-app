import { isFormal, isCareEnv, isHealthEnv } from '~lib/config'

const de = {
  title1: 'Checkins per QR-Code.',
  title2: 'Ohne App, einfach für alle.',

  indexIntro: `recover ist die digitale Kontaktdatenliste für ${
    isCareEnv
      ? 'Pflegeeinrichtungen'
      : isHealthEnv
      ? 'Krankenhäuser'
      : 'Betriebe'
  }, deren Besucher und Gäste. Einfach, sicher, schnell.`,

  forVisitorsAndGuests: isFormal ? 'Für Besucher und Gäste' : 'Für Gäste',

  rcvrProtectsData: isFormal
    ? 'recover schützt Ihre Daten besser als Papier'
    : 'recover schützt Deine Daten besser als jedes Papier',

  scanCode: 'QR-Code scannen',

  forYourCompany: isFormal ? 'Für Ihre Einrichtung' : 'Für Deinen Betrieb',

  yourTickets: isFormal ? 'Ihre Tickets' : 'Deine Tickets',

  goodbyePaperwork: isFormal
    ? 'Tschüss, Zettelwirtschaft! recover ist die digitale Kontaktdatenliste Ihrer Besucher und Gäste. Einfach, sicher, schnell.'
    : 'Tschüss, Zettelwirtschaft! recover ist die digitale Kontaktdatenliste deiner Gäste. Einfach, sicher, schnell.',

  recoverForCompanies: isFormal
    ? 'Recover für Einrichtungen'
    : 'Recover für Betriebe',

  whatIsRecoverLink: isCareEnv
    ? 'https://recovercare.de/'
    : isHealthEnv
    ? 'https://www.recover-health.de'
    : 'https://www.recoverapp.de/',

  whatIsRecoverLinkText: 'Was ist recover?',
}

export default de
