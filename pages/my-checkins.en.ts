import { isCareEnv } from '~lib/config'
import de from './my-checkins.de'

const en: typeof de = {
  pageTitle: 'Meine Checkins',
  noCheckinsYet: isCareEnv
    ? "You don't have any checkins yet"
    : "You don't have checkins yet",
  couldNotCheckin: 'We could not check you out',
  couldNotCheckinNoInternet:
    "We couldn't check you out. Do you have no internet right now?",
  couldNotCheckinWellCheckYouOut:
    "If the problem persists, don't worry: we'll check you out automatically later.",
}

export default en
