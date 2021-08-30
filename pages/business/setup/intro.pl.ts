import { isFreseniusEnv } from '~lib/config'
import de from './intro.de'

const pl: typeof de = {
  pageTitle: 'Dla przedsiębiorstw',

  instruction: isFreseniusEnv
    ? 'Jak wykorzystać recover dla swojej firmy'
    : 'Załóż konto',
  letsGo: 'Zaczynamy',

  setupIntro1: `Od czasu Corony wiele firm i placówek jest zobowiązanych
  aby zapisać dane kontaktowe. Oszczędź sobie papierkowej roboty! Z odzysku
  przechowujesz tę listę w formie cyfrowej. Aby chronić dane swoich gości,
  są one szyfrowane przez aplikację. Podczas wprowadzania na rynek
  tworzysz cyfrową parę kluczy w zaledwie kilku krokach`,

  setupIntro2: `Po onboardingu możesz skontaktować się z nami, aby zweryfikować autentyczność swoich danych z naszym zespołem.
  zespół do sprawdzania autentyczności danych`,

  setupIntro3: `Ustawienie odzyskiwania trwa około 10 minut. Czy jesteś gotowy? Następnie
  zaczynajmy`,

  setupIntroCareHealth1: `Z odzysku przechowujesz listę danych kontaktowych swoich gości w formie cyfrowej.
  Aby chronić dane, aplikacja szyfruje je.`,

  setupIntroCareHealth2: `Ustawienie odzyskiwania trwa około 10 min.`,
}

export default pl
