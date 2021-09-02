import { isCareEnv } from './../lib/config'
import de from './my-checkins.de'

const pl: typeof de = {
  people: 'Ludzie',
  pageTitle: 'My Checkins',
  noCheckinsYet: isCareEnv
    ? 'Nie masz jeszcze żadnych zameldowań'
    : 'Nie masz jeszcze żadnych zameldowań',
  couldNotCheckin: 'Nie mogliśmy Cię wymeldować',
  couldNotCheckinNoInternet:
    'Nie mogliśmy cię sprawdzić. Czy nie masz teraz internetu?',
  couldNotCheckinWellCheckYouOut:
    'Jeśli problem będzie się utrzymywał, nie martw się: później sprawdzimy cię automatycznie',
}

export default pl
