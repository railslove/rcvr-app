import { isFormal } from '~lib/config'
import de from './[dataRequestId].de'

const pl: typeof de = {
  loading: 'Loading...',

  acceptedAt1: `${
    isFormal ? 'you' : 'you'
  } nie udostępniły jeszcze tych danych dla
  Departamentu Zdrowia. Once${' '}
  ${isFormal ? 'oni udostępniają te dane' : 'ty udostępniasz te dane'}
  '}, zostaną one wysłane w zaszyfrowanej formie do departamentu zdrowia'}`,

  acceptedAt2: 'organ wnioskujący:',
  acceptedAt3: 'Powód żądania:',
  acceptedAt4: 'uwolnić dane',

  enterKeyMessage: isFormal
    ? 'Twój klucz prywatny nie jest już przechowywany na Twoim urządzeniu. Aby odszyfrować dane, musisz go ponownie wprowadzić'
    : 'Twój klucz prywatny nie jest już przechowywany na Twoim urządzeniu. Aby odszyfrować dane, musisz wprowadzić go ponownie.',

  enterKeyButtonText: 'Wprowadź klucz',

  checkinsDecoded: 'Checkins decoded.',
  checkinsErrorCountText: 'Checkins could not be decrypted.',
  checkinsErrorCountMessage:
    'No data could be decoded. Prawdopodobnie Twój klucz prywatny jest nieprawidłowy. Proszę wpisać go ponownie.',

  enterNewKeyButtonText: 'Wprowadź ponownie klucz',

  downloadAsExcel: 'Pobierz jako Excel',

  contactsFromLastHours:
    'Dane kontaktowe z ostatnich 2 godzin dla urzędu regulacyjnego',
  olderContactRequests:
    'Starsze dane kontaktowe dla zapytań departamentu zdrowia',

  contactData: 'Dane kontaktowe',
  customerContactData: 'Dane kontaktowe klienta',
  customerContactDataFrom: 'Dane kontaktowe klienta od',

  headerName: 'Nazwa',
  headerFrom: 'Od',
  headerUntil: 'Do',
  headerPhone: 'Telefon',
  headerLeftAt: 'Checked out at',
  headerAddress: 'Address',
  headerAreaName: 'Area',
  headerEnteredAt: 'Checked in at',
  headerResidents: 'Residents',
  headerProvidedHealthDocument: 'Złożony dokument',

  stillEncrypted: 'still encripted',
  notDecodable: 'nie do rozkodowania',

  tested: 'Przetestowany',
  vaccinated: 'zaszczepiony',
  recovering: 'odzyskujący zdrowie',

  approveRequestModalText:
    'The contact details have been successfully submitted',
  approveRequestModalTitle: 'Prośba z wydziału zdrowia',
}

export default pl
