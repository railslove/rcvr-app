import { isFormal, isCareEnv, isHealthEnv } from '~lib/config'

const de = {
  title1: 'Checkins per QR-Code.',
  title2: 'Ohne App, einfach für alle.',

  intro: isCareEnv
    ? 'Durch die aktuellen Corona-Verordnungen müssen Sie Ihre Kontaktdaten hinterlegen, wenn Sie in einem Betrieb sind der zu Schutzmaßnahmen verpflichtet ist, wie z.B Pflegeeinrichtungen. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.'
    : isHealthEnv
    ? 'Durch die aktuellen Corona-Verordnungen müssen Sie Ihre Kontaktdaten hinterlegen, wenn Sie in einem Betrieb sind der zu Schutzmaßnahmen verpflichtet ist, wie z.B Krankenhäuser. Die App kann auch freiwillig genutzt werden, um die Nachverfolgung zu unterstützen.'
    : 'ist die digitale Kontaktdatenliste für Betriebe und deren Gäste. Einfach, sicher, schnell.',

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
