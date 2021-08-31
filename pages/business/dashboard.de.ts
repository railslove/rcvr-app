import { isCareEnv } from '~lib/config'

export default {
  title: 'Meine Betriebe',
  actionTitle: 'Betrieb anlegen...',

  pdfType: isCareEnv ? 'Hygienevorschriften' : 'Zusatz-Informationen',

  editButtonText: 'Ändern',
  menuPdfLinkText: 'PDF Anhang',

  logout: 'Logout',
}
