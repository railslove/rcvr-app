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

const en: typeof de = {
  title1: 'Checkins via QR code.',
  title2: 'Without app, easy for everyone.',

  intro: isCareEnv
    ? 'Due to the current Corona regulations, you have to deposit your contact details if you are in a business that is obliged to take protective measures, such as care facilities. The app can also be used voluntarily to assist with tracking.'
    : isHealthEnv
    ? 'Due to the current Corona regulations, if you are in an establishment that is required to take protective measures, such as hospitals, you must store your contact information. The app can also be used voluntarily to assist with tracking.'
    : 'is the digital contact list for businesses and their guests. Simple, secure, fast.',

  forVisitorsAndGuests: isFormal ? 'For visitors and guests' : 'For guests',

  rcvrProtectsData: isFormal
    ? 'recover protects your data better than paper'
    : 'recover protects your data better than any paper',

  scanCode: 'scan QR code',

  forYourCompany: isFormal ? 'for your institution' : 'for your company',

  yourTickets: isFormal ? 'Your tickets' : 'Your tickets',

  goodbyePaperwork: isFormal
    ? 'Goodbye, paperwork! recover is the digital contact list of your visitors and guests. Simple, secure, fast.'
    : 'Bye, paperwork! recover is the digital contact data list of your guests. Simple, secure, fast.',

  recoverForCompanies: isFormal
    ? 'Recover for establishments'
    : 'Recover for establishments',

  whatIsRecoverLink: isCareEnv
    ? 'https://recovercare.de/'
    : isHealthEnv
    ? 'https://www.recover-health.de'
    : 'https://www.recoverapp.de/',

  whatIsRecoverLinkText: 'What is recover?',
}

export default { de, en }
