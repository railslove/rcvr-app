import { isFormal } from '~lib/config'
import indexDe from '~pages/business/company/[companyId]/index.de'

const en: typeof indexDe = {
  backLink: 'my businesses',

  pageHeadline: 'Areas',

  manageArea: 'Manage Areas',
  manageCheckins: 'Current Checkins',

  plausabilityCheckHeadline: 'plausibility check regulatory office',
  plausabilityCheckText1: 'Customer contact data requests for present',
  plausabilityCheckText2: `${
    isFormal ? 'Visitors can you' : 'Guests can you'
  } here automatically `,

  dataRequestButtonText: 'ask',

  askHealthOfficeHeadline: 'Request Health Office',
  askHealthOfficeText1: `requests for customer contact data you can by email to`,

  askHealthOfficeText2: `make a request. We will get back to you as soon as possible you.`,

  releasedOn: 'Released on',
  notYetReleased: 'Not yet released',
}

export default en
