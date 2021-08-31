import validatorsLocalesDE from '~lib/validators/validatorsLocales.de'
import validatorsLocalesEN from '~lib/validators/validatorsLocales.en'
import { PDF_TYPE } from '~ui/whitelabels'

export const de = {
  ...validatorsLocalesDE,

  or: 'oder',

  titleNew: 'Neuer Betrieb',
  titleEdit: 'Betrieb ändern',
  buttonNew: 'Hinzufügen',
  buttonEdit: 'Speichern',

  menuPDFRequired: 'Es können nur pdf-Dateien hochgeladen werden.',

  companyTypeLabel: 'Art des Betriebes',

  needShowCoronaTestLabel:
    'Gäste müssen einen negative Corona-Test oder einen Nachweis zur Impfung oder Genesung vorzeigen',

  checkInWithCWALabel: 'Checkin mit der Corona-Warn-App anbieten',

  checkInWithCWAHint:
    'Biete deinen Gästen einen zusätzlichen Checkin mit der Corona-Warn-App an. So werden sie noch schneller über Risikobegegnungen informiert. Die QR-Codes müssen nach der Aktivierung neu ausgedruckt werden.',

  checkInWithCWAHintEnabled:
    'Deine Gäste können nun nach dem Checkin mit recover ganz einfach zusätzlich mit der Corona-Warn-App einchecken.',

  privacyPolicyLabel: 'Datenschutzerklärung als Link',

  menuAliasLabel: 'Name der Zustatzinformationen-Sektion',

  menuLinkLabel: `${PDF_TYPE} als Link`,

  menuFileLabel: `${PDF_TYPE} als PDF`,
  menuFileHint: 'Es können nur pdf-Dateien hochgeladen werden.',
}

export const en: typeof de = {
  ...validatorsLocalesEN,

  or: 'or',

  titleNew: 'New operation',
  titleEdit: 'Change operation',
  buttonNew: 'Add',
  buttonEdit: 'Save',

  menuPDFRequired: 'Only pdf files can be uploaded',

  companyTypeLabel: 'Type of company',

  needShowCoronaTestLabel:
    'Guests must show a negative corona test or proof of vaccination or recovery',

  checkInWithCWALabel: 'Provide checkin with the Corona warning app',

  checkInWithCWAHint:
    'Offer your guests an additional checkin with the Corona warning app. This way they will be informed even faster about risk encounters. QR codes will need to be re-printed after activation.',

  checkInWithCWAHintEnabled:
    'Your guests can now easily check in additionally with the Corona alert app after checking in with recover.',

  privacyPolicyLabel: 'Privacy policy as a link',

  menuAliasLabel: 'name of the state information section',

  menuLinkLabel: `${PDF_TYPE} as link`,

  menuFileLabel: `${PDF_TYPE} as PDF`,
  menuFileHint: `Only pdf files can be uploaded`,
}

export default { de, en }
