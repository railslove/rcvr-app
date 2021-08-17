import { isCareEnv, isHealthEnv } from '~lib/config'

export default {
  coronaTabText: 'Corona',
  dataPrivacyTabText: 'Datenschutz',
  finePrintText: isCareEnv || isHealthEnv ? 'Checkins' : 'Tickets',
}
