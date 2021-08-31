import { isCareEnv } from '~lib/config'
import de from './dashboard.de'

const pl: typeof de = {
  title: 'Moje firma',
  actionTitle: 'Utwórz firmy...',
  editButtonText: 'Zmień',
  menuPdfLinkText: 'Załącznik PDF',
  logout: 'Wyloguj',
  pdfType: isCareEnv ? 'Zasady higieny' : 'Dodatkowe informacje',
}

export default pl
