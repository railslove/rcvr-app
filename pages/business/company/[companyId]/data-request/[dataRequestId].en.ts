import { isFormal } from '~lib/config'
import dataRequestIdDe from '~pages/business/company/[companyId]/data-request/[dataRequestId].de'

const en: typeof dataRequestIdDe = {
  ...dataRequestIdDe,

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

export default en
