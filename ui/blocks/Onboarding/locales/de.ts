import { isFormal } from '~lib/config'
import validatorsLocalesDE from '~lib/validators/validatorsLocales.de'

export default {
  ...validatorsLocalesDE,

  residentLabel: 'Bewohnername',
  hadCoronaLabel:
    'Genesen: Ich bestätige eine Dokumentation über meine Genesung von einer Corona-Erkrankung vorweisen zu können und diese im Prüffall vorweisen zu können',
  vaccinatedLabel:
    'Geimpft: Ich bestätige eine Dokumentation (Impfpass) über meine Impfung gegen eine Infektion mit dem Coronavirus vorweisen zu können und diese im Prüffall vorweisen zu können',
  rememberMeLabel: 'Daten auf meinem Handy speichern',

  residentRequired: 'Bewohnername muss angegeben werden.',
  healthDocRequired: isFormal
    ? 'Sie müssen entweder getestet, genesen oder geimpft sein.'
    : 'Du musst entweder getestet, genesen oder geimpft sein.',

  provideTestLabel1: 'Getestet: Ich bestätige ein negatives, nicht länger als',
  provideTestLabel2:
    'Stunden zurückliegendes, Testergebnis vorliegen zu haben und dieses im Prüffall vorweisen zu können',

  abortButtonText: 'Abbrechen',
  aggreeFineprint:
    'Mit dem betätigen des Buttons erkläre ich mich einverstanden, dass meine Daten zur Erfüllung der Verpflichtung der Hygiene- und Infektionsschutzstandards für 4 Wochen gespeichert werden.',
  submitButtonFallbackText: 'Check in',
}
