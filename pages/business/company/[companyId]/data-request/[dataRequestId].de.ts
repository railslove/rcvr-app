import { isFormal } from '~lib/config'

export default {
  loading: 'Lade...',

  acceptedAt: `Die Daten für diesen Zeitraum wurden noch nicht für ${
    isFormal ? 'Sie' : 'Dich'
  } freigegeben.`,

  enterKeyMessage: isFormal
    ? 'Ihr privater Schlüssel ist nicht mehr auf Ihrem Gerät gespeichert. Um die Daten zu entschlüsseln, müssen Sie ihn neu eingeben.'
    : 'Dein privater Schlüssel ist nicht mehr auf deinem Gerät gespeichert. Um die Daten zu entschlüsseln, musst du ihn neu eingeben.',

  enterKeyButtonText: 'Schlüssel eingeben',

  checkinsDecoded: 'Checkins entschlüsselt.',
  checkinsErrorCountText: 'Checkins konnten nicht entschlüsselt werden.',
  checkinsErrorCountMessage: `Keine Daten konnten entschlüsselt werden. Wahrscheinlich ist
  ${isFormal ? 'Ihre' : 'dein'} privater Schlüssel nicht korrekt.
  Bitte ${isFormal ? 'geben Sie' : 'gib'} ihn neu ein.`,

  enterNewKeyButtonText: 'Schlüssel neu eingeben',

  downloadAsExcel: 'Download als Excel',

  contactsFromLastHours:
    'Kontaktdaten der letzten 2 Stunden für das Ordnungsamt',
  olderContactRequests: 'Ältere Kontaktdaten für Abfragen des Gesundheitsamt',

  contactData: 'Kontaktdaten',
  customerContactData: 'Kundenkontaktdaten',
  customerContactDataFrom: 'Kundenkontaktdaten vom',

  headerFrom: 'Von',
  headerName: 'Name',
  headerUntil: 'Bis',
  headerPhone: 'Telefon',
  headerLeftAt: 'Ausgecheckt um',
  headerAddress: 'Adresse',
  headerAreaName: 'Bereich',
  headerEnteredAt: 'Eingecheckt um',
  headerResidents: 'Bewohner',
  headerProvidedHealthDocument: 'Vorgelegtes Dokument',

  stillEncrypted: 'noch verschlüsselt',
  notDecodable: 'nicht entschlüsselbar',

  tested: 'Getested',
  vaccinated: 'Geimpft',
  recovering: 'Genesen',
}
