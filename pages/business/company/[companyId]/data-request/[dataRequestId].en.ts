import { isFormal } from '~lib/config'
import de from '~pages/business/company/[companyId]/data-request/[dataRequestId].de'

const en: typeof de = {
  loading: 'Loading...',

  acceptedAt1: `${
    isFormal ? 'you' : 'you'
  } have not yet released this data for the
  Health Department. Once${' '}
  ${isFormal ? 'they release this data' : 'you release this data'}
  '}, it will be sent in encrypted form to the health department'}`,

  acceptedAt2: 'requesting authority:',
  acceptedAt3: 'Reason for request:',
  acceptedAt4: 'release data',

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

  headerName: 'Name',
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

  approveRequestModalText:
    'The contact details have been successfully submitted',
  approveRequestModalTitle: 'Request from health department',
}

export default en
