import { isFormal } from '~lib/config'

const de = {
  backLink: 'Meine Betriebe',

  pageHeadline: 'Bereiche',

  manageArea: 'Bereiche verwalten',
  manageCheckins: 'Aktuelle Checkins',

  plausabilityCheckHeadline: 'Plausibiltätsprüfung Ordnungsamt',
  plausabilityCheckText1: 'Anfragen zu Kundenkontaktdaten für anwesende',
  plausabilityCheckText2: `${
    isFormal ? 'Besucher können Sie' : 'Gäste kannst Du'
  } hier automatisch stellen.`,

  dataRequestButtonText: 'Abfragen',

  askHealthOfficeHeadline: 'Anfrage Gesundheitsamt',
  askHealthOfficeText1: `Anfragen zu Kundenkontaktdaten ${
    isFormal ? 'können Sie' : 'kannst Du'
  } per Email an`,

  askHealthOfficeText2: `stellen. Wir melden uns dann schnellstmöglich bei ${
    isFormal ? 'Ihnen' : 'Dir'
  }.`,

  releasedOn: 'Freigegeben am',
  notYetReleased: 'Noch nicht freigegeben',
}

const en: typeof de = {
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

export default { de, en }
