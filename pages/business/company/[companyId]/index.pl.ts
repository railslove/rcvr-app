import { isFormal } from './../../../../lib/config'
import de from './index.de'

const pl: typeof de = {
  backLink: 'moje firmy',

  pageHeadline: 'Obszary',

  manageArea: 'Zarządzaj obszarami',
  manageCheckins: 'Bieżące sprawdzenia',

  plausabilityCheckHeadline: 'Urząd regulacyjny kontroli wiarygodności',
  plausabilityCheckText1:
    'Prośba o podanie danych kontaktowych klienta w chwili obecnej',
  plausabilityCheckText2: `${
    isFormal ? 'Odwiedzający mogą' : 'Goście mogą'
  } tutaj automatycznie `,

  dataRequestButtonText: 'ask',

  askHealthOfficeHeadline: 'Zapytaj o Urząd Zdrowia',
  askHealthOfficeText1: `prośba o dane kontaktowe klientów, które można za pomocą poczty elektronicznej do`,

  askHealthOfficeText2: `złożyć wniosek. We will get back to you as soon as possible you.`,

  releasedOn: 'Wydano w dniu',
  notYetReleased: 'Jeszcze nie wydany',
}

export default pl
