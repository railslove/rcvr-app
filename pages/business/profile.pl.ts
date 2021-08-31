import { isFormal } from '~lib/config'
import validatorsLocalesDE from '~lib/validators/validatorsLocales.de'

import de from './profile.de'

const pl: typeof de = {
  ...validatorsLocalesDE,

  pageTitle: 'Mój profil',
  editProfile: 'Edycja profilu',
  myMembership: 'My Membership',
  hasNoCompaniesMessage: `${
    isFormal ? 'Musisz' : 'Musisz'
  } najpierw utwórz firmę`,
  writeEmailMessage:
    'Jeśli chcesz nadal korzystać z recovery, napisz do nas maila',
  writeEmailButtonText: 'Napisz wiadomość e-mail',
  upgradeNow: 'Uaktualnij teraz',

  pricingInfo_care: `Możesz bezpłatnie przez 14 dni testować odzyskiwanie
  Po tym okresie członkostwo kosztuje 29,90€ z VAT miesięcznie i
  placówka opiekuńcza. Z członkostwa można zrezygnować w dowolnym momencie
  do końca miesiąca`,

  pricingInfo_health1: `Możesz przetestować odzyskiwanie przez 14 dni za darmo. Następnie
  członkostwo dla wszystkich szpitali o wielkości do 199 łóżek koszty
  199 miesięcznie, dla wszystkich szpitali o wielkości od 200 do
  499 łóżek 349 EUR miesięcznie i dla wszystkich szpitali o wielkości
  500 łóżek 449€ za miesiąc przy minimalnym okresie 6 miesięcy.
  6 miesięcy.`,

  pricingInfo_health2: ` Jeśli masz jakiekolwiek pytania dotyczące cen, zawsze możesz skontaktować się z naszym zespołem pomocy technicznej pod adresem
  na stronie team@recoverapp.de w dowolnym momencie`,

  pricingInfo_fresenius1: `Możesz poddać odzyskiwanie przez 14 dni bezpłatnym testom.`,
  pricingInfo_fresenius2: `Po tym członkostwo kosztuje 15€ z VAT na miesiąc i firmę.
  Z członkostwa można zrezygnować w dowolnym momencie na koniec miesiąca`,
  pricingInfo_fresenius3: `Jeśli jesteś uprawniony do bezpłatnego lub ograniczonego korzystania z usług
  Recover App, prosimy o kontakt z naszym zespołem pomocy technicznej, abyśmy mogli sprawdzić i
  sprawdź i aktywuj swój sklep`,

  pricingInfo_rcvr1: `możesz umieścić odzyskać przez jego wysiłki bezpłatnie przez 14 dni`,
  pricingInfo_rcvr2: `Po tym członkostwo kosztuje 15€ z VAT za miesiąc i sklep.
  Z członkostwa można zrezygnować w dowolnym momencie na koniec miesiąca`,
  pricingInfo_rcvr3: `Jeśli jesteś uprawniony do bezpłatnego lub ograniczonego korzystania z
  Recover App, prosimy o kontakt z naszym zespołem pomocy technicznej, abyśmy mogli sprawdzić i
  sprawdź i aktywuj swój sklep`,
  pricingInfo_rcvr4: `Czy chcesz płacić według faktury? Nie ma problemu, prosimy o kontakt z naszym działem wsparcia
  nasze wsparcie, a my zorganizujemy je dla Ciebie`,

  pricingInfoEmailSubject_rcvr: `Chciałbym zapłacić za Recover fakturą`,

  hasSubscriptionNotForFreeCardTitle1: 'Zmień metodę płatności',
  hasSubscriptionNotForFreeCardTitle2: 'Zarządzaj członkostwem',

  hasSubscriptionNotForFreeMessage: `Możesz zmienić swoje Członkostwo w każdej chwili na koniec miesiąca. `,

  logout: 'Wylogowanie',

  /**
   * subscriptions start
   */
  freeSub1: `Można`,
  freeSub2: 'odzyskać za darmo',
  freeSub3: 'use',

  trialing1: `Jesteś w okresie próbnym swojego
  członkostwo`,
  trialing2: `po tym czasie, Twoje członkostwo zostanie automatycznie odnowione`,

  trialing_internal1: `Możesz używać recover aż do`,

  trialing_internal2: `spróbuj za darmo`,

  incomplete: `Twój Płatność w trakcie przetwarzania...`,

  incomplete_expired1: `Twój
  Płatność nie mogła zostać zrealizowana.
  Nie zainicjowano żadnych płatności.`,

  incomplete_expired2: `Proszę spróbować ponownie.`,

  unpaid: `Twój
  Ostatni rachunek nie został jeszcze zapłacony.`,

  cancelled: `Anulowałeś swoje członkostwo unieważniony`,

  /**
   * subscriptions end
   */

  checkoutSelectionModalTitle: 'Metoda płatności',
  checkoutSelectionModalSepaButtonText: 'SEPA Direct Debit',
  checkoutSelectionModalStripeButtonText: 'Karta kredytowa',

  ownerModalSubmitButton: 'Save',
}

export default pl
