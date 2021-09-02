import { isFormal } from '~lib/config'
import indexDe from '~pages/business/company/[companyId]/index.de'

const en: typeof indexDe = {
  backLink: 'My Businesses',

  pageHeadline: 'Areas',

  manageArea: 'Manage Areas',
  manageCheckins: 'Current Checkins',

  plausabilityCheckHeadline: 'plausibility check regulatory office',
  plausabilityCheckText1: 'Requests for customer contact data for',
  plausabilityCheckText2: `${
    isFormal ? 'visitors' : 'guests'
  } present can be made here automatically.`,

  dataRequestButtonText: 'Ask',

  askHealthOfficeHeadline: 'Request Health Office',
  askHealthOfficeText1: `Requests for customer contact data you can by email to`,

  askHealthOfficeText2: `make a request. We will get back to you as soon as possible.`,

  releasedOn: 'Released on',
  notYetReleased: 'Not yet released',
}

export default en
