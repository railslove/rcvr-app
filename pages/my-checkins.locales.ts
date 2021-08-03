import { isCareEnv } from '~lib/config'

const de = {
  noCheckinsYet: isCareEnv
    ? 'Sie haben noch keine Checkins'
    : 'Du hast noch keine Checkins.',
  couldNotCheckin: 'Wir konnten Dich nicht auschecken.',
  couldNotCheckinNoInternet:
    'Wir konnten Dich nicht auschecken. Hast du vielleicht gerade kein Internet?',
  couldNotCheckinWellCheckYouOut:
    'Sollte das Problem weiterhin bestehen, keine Sorge: wir checken Dich später automatisch aus.',
}

const en: typeof de = {
  noCheckinsYet: isCareEnv
    ? "You don't have any checkins yet"
    : "You don't have checkins yet",
  couldNotCheckin: 'We could not check you out',
  couldNotCheckinNoInternet:
    "We couldn't check you out. Do you have no internet right now?",
  couldNotCheckinWellCheckYouOut:
    "If the problem persists, don't worry: we'll check you out automatically later.",
}

export default { de, en }
