import { isFormal } from '~lib/config'

export default {
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
