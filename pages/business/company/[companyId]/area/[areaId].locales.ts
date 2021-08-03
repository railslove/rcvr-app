const de = {
  backLinkText: 'Checkins',

  lastCheckins:
    'Checkins der letzten 24 Stunden. Aktualisiert sich automatisch.',

  checkedIn: 'eingecheckt',
  checkedOut: 'ausgecheckt',
}

const en: typeof de = {
  ...de,
  lastCheckins: 'Checkins in the last 24 hours. Updates automatically.',
  checkedIn: 'checked in',
  checkedOut: 'checked out',
}

export default { de, en }
