import { isFormal } from '~lib/config'

const de = {
  title: 'Automatische Datenabfrage',

  reasonHint: 'z.B. Name des/r Mitarbeiters:in',
  reasonLabel: 'Grund für die Abfrage',
  reasonRequired: isFormal
    ? 'Sie müssen einen Grund für die Abfrage angeben.'
    : 'Du musst einen Grund für die Abfrage angeben.',

  submitError: 'Es ist zu einem Fehler gekommen: ',

  request: 'Abfragen',
}

const en: typeof de = {
  title: 'Automatic data request',

  reasonHint: 'e.g. name of employee:in',
  reasonLabel: 'Reason for the request',
  reasonRequired: 'You must specify a reason for the request.',

  submitError: 'An error has occurred: ',

  request: 'request',
}

export default { de, en }
