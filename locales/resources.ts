import indexPageDE from './de/indexPage'
import checkingPageDE from './de/checkinPage'

import indexPageEN from './en/indexPage'
import checkingPageEN from './en/checkinPage'

export const de = {
  indexPage: indexPageDE,
  checkinPage: checkingPageDE,
}

export const en: typeof de = {
  indexPage: indexPageEN,
  checkinPage: checkingPageEN,
}
