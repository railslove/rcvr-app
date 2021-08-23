import { isCareEnv, isHealthEnv } from '~lib/config'

const de = {
  coronaTabText: 'Corona',
  dataPrivacyTabText: 'Datenschutz',
  finePrintText: isCareEnv || isHealthEnv ? 'Checkins' : 'Tickets',
}

const en: typeof de = {
  ...de,
  dataPrivacyTabText: 'Data privacy',
}

const pl: typeof de = {
  ...de,
  dataPrivacyTabText: 'Ochrona danych',
}

export default { pl, en, de }
