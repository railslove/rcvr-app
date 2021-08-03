import { isFormal } from '~lib/config'

const de = {
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

const en: typeof de = {
  ...de,

  loading: 'Loading...',

  acceptedAt: 'The data for this period has not yet been released for you.',

  enterKeyMessage: isFormal
    ? 'Your private key is no longer stored on your device. To decrypt the data, you need to re-enter it.'
    : 'Your private key is no longer stored on your device. To decrypt the data, you must re-enter it.',

  enterKeyButtonText: 'Enter key',

  checkinsDecoded: 'Checkins decoded.',
  checkinsErrorCountText: 'Checkins could not be decrypted.',
  checkinsErrorCountMessage:
    'No data could be decoded. Probably your private key is not correct. Please enter it again.',

  enterNewKeyButtonText: 'Reenter key',

  downloadAsExcel: 'Download as Excel',

  contactsFromLastHours:
    'Contact details for the last 2 hours for the regulatory office',
  olderContactRequests:
    'Older contact details for queries of the health department',

  contactData: 'Contact details',
  customerContactData: 'Customer contact data',
  customerContactDataFrom: 'Customer contact data from',

  headerFrom: 'From',
  headerUntil: 'Until',
  headerPhone: 'Phone',
  headerLeftAt: 'Checked out at',
  headerAddress: 'Address',
  headerAreaName: 'Area',
  headerEnteredAt: 'Checked in at',
  headerResidents: 'Residents',
  headerProvidedHealthDocument: 'Submitted document',

  stillEncrypted: 'still encripted',
  notDecodable: 'not decodable',

  tested: 'Tested',
  vaccinated: 'Vaccinated',
  recovering: 'Recovering',
}

export default { de, en }
