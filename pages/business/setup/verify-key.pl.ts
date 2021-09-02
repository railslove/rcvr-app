import { isFormal } from '~lib/config'
import de from './verify-key.de'

const pl: typeof de = {
  pageTitle: `Twój klucz`,
  headline: 'Klucz do pobierania',
  createAccountStep: 'utwórz konto',

  downloadKeyButtonText: 'Pobierz klucz',

  privateKeyInputHint: 'Jeśli nie masz tego pliku, możesz go pobrać powyżej',
  privateKeyInputLabel: 'Tutaj wstawić plik klucza',
  privateKeyInputMessage: `Teraz proszę utworzyć kopię zapasową poprzez wydrukowanie
  wydrukowanie pliku klucza, przeniesienie go do pamięci USB lub
  lub zapisanie zawartości w menedżerze haseł. `,

  privateKeyPrintButton: 'Drukuj klucz',
  privateKeySecureQuestion: isFormal
    ? 'Klucz przechowywany bezpiecznie i dostępny? Teraz mogą rozpocząć swoją działalność'
    : 'Klucz przechowywany w sposób bezpieczny i dostępny? Teraz możesz rozpocząć swoją działalność.',

  continueButtonText: 'continue',

  youWillNeedKey1:
    'Będzie pan potrzebował tego klucza ponownie, gdy zadzwoni wydział zdrowia.',

  youWillNeedKey2:
    'Proszę przechowywać ten klucz w bezpiecznym, ale łatwo dostępnym dla nich miejscu.',

  verifyPrivateKeyError: 'Plik klucza nie pasuje.',

  verifyKeyExp1:
    'Będziesz potrzebował pliku rcvr_secret_key.txt ponownie, gdy zadzwoni departament zdrowia.',
  verifyKeyExp2:
    'Aby potwierdzić, że otrzymałeś klucz, prześlij go ponownie tutaj.',

  verifyKeyExp1_fresenius:
    'Będziesz potrzebował pliku rcvr_secret_key.txt ponownie, gdy zadzwoni departament zdrowia',

  verifyKeyExp2_fresenius:
    'Dlatego prześlij plik klucza ponownie tutaj w celu potwierdzenia',

  verifyKeyExpCareHealth:
    'Proszę przesłać tutaj plik klucza rcvr_geheimer_schluessel.txt w celu potwierdzenia',
}

export default pl
