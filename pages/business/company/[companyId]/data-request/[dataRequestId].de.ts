import { isFormal } from '~lib/config'

export default {
  loading: 'Lade...',

  acceptedAt1: `${isFormal ? 'Sie' : 'Du'} hast diese Daten noch nicht für das
  Gesundheitsamt freigegeben. Sobald${' '}
  ${isFormal ? 'sie diese Daten freigeben' : 'du diese Daten freigibst'}
  , werden diese verschlüsselt an das Gesundheitsamt gesendet.`,

  acceptedAt2: 'Anfragende Behörde:',
  acceptedAt3: 'Grund der Anfrage:',
  acceptedAt4: 'Daten freigeben',

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

  approveRequestModalText: 'Die Kontaktdaten wurden erfolgreich übermittelt',
  approveRequestModalTitle: 'Anfrage vom Gesundheitsamt',
}
