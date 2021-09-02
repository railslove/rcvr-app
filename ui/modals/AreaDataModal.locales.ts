import { isCareEnv, isFormal, isHealthEnv } from '~lib/config'

const de = {
  titleNew: 'Neuer Bereich',
  titleEdit: 'Bereich ändern',

  buttonNew: 'Hinzufügen',
  buttonEdit: 'Speichern',

  message1: `Der Name des Bereichs wird über dem QR Code angezeigt. Falls ${
    isFormal
      ? 'Sie bereits Lage-, Stationspläne oder ähnliches haben, können Sie'
      : 'du bereits einen Übersichtsplan hast, kannst du'
  } die Benennung in gleicher Weise abbilden.`,

  nameHint:
    isCareEnv || isHealthEnv
      ? 'z.B "Eingangsbereich" oder "Station 1"'
      : 'z.B. "Tisch 1" oder "Theke"',
  nameLabel: 'Name des Bereichs',
  nameRequired: isFormal
    ? 'Sie müssen einen Namen angeben'
    : 'Du musst einen Namen angeben.',

  testExemptionLabel:
    'Dieser Bereich benötigt KEINE nachweise von impfung, test oder genesung (Betriebsunabhängig)',

  submitError: 'Es ist zu einem Fehler gekommen: ',
}

const en: typeof de = {
  titleNew: 'New Area',
  titleEdit: 'Change Area',

  buttonNew: 'Add',
  buttonEdit: 'Save',

  message1: `The name of the area is displayed above the QR code. If ${
    isFormal
      ? 'you already have site plans, station plans or similar, you can'
      : 'you already have a general plan, you can'
  } map the naming in the same way.`,

  nameHint:
    isCareEnv || isHealthEnv
      ? 'e.g. "Entrance Area" or "Ward 1"'
      : 'e.g. "table 1" or "counter"',
  nameLabel: 'name of the area',
  nameRequired: 'You must specify a name',

  testExemptionLabel:
    'This section does NOT require proof of vaccination, testing or recovery (business independent)',

  submitError: 'An error has occurred: ',
}

export default { de, en }
