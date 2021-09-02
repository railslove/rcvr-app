import { isCareEnv } from '~lib/config'
import de from '~pages/business/dashboard.de'

const en: typeof de = {
  title: 'My Businesses',
  actionTitle: 'Create business...',

  pdfType: isCareEnv ? 'Hygiene rules' : 'Additional information',

  editButtonText: 'Modify',
  menuPdfLinkText: 'PDF attachment',

  logout: 'Logout',
}

export default en
