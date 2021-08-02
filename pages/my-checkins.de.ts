import { isCareEnv } from '~lib/config'

export default {
  noCheckinsYet: isCareEnv
    ? 'Sie haben noch keine Checkins'
    : 'Du hast noch keine Checkins.',
  couldNotCheckin: 'Wir konnten Dich nicht auschecken.',
  couldNotCheckinNoInternet:
    'Wir konnten Dich nicht auschecken. Hast du vielleicht gerade kein Internet?',
  couldNotCheckinWellCheckYouOut:
    'Sollte das Problem weiterhin bestehen, keine Sorge: wir checken Dich später automatisch aus.',
}
