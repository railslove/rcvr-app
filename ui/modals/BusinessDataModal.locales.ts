import { CompanyTypeOptions } from '~lib/api'
import { isCareEnv } from '~lib/config'
import validatorsLocalesDE from '~lib/validators/validatorsLocales.de'
import validatorsLocalesEN from '~lib/validators/validatorsLocales.en'

export const de = {
  ...validatorsLocalesDE,
  ...CompanyTypeOptions,

  coronaTestSelectOptions0: 'Kein Nachweis notwendig',
  coronaTestSelectOptions24: 'Genesen, Geimpt oder Getested (24 Stunden)',
  coronaTestSelectOptions48: 'Genesen, Geimpt oder Getested (48 Stunden)',
  coronaTestSelectOptionsRecovered: 'Genesen oder Geimpt',

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

  menuLinkLabel: isCareEnv
    ? `Hygienevorschriften als link`
    : `Zusatz-Informationen als link`,

  menuFileLabel: isCareEnv
    ? `Hygienevorschriften als PDF`
    : `Zusatz-Informationen als PDF`,

  menuFileHint: 'Es können nur pdf-Dateien hochgeladen werden.',
}

export const en: typeof de = {
  ...validatorsLocalesEN,

  or: 'or',

  titleNew: 'New business',
  titleEdit: 'Change business',
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

  menuAliasLabel: 'Name of the state information section',

  menuLinkLabel: isCareEnv
    ? `Hygiene regulations as link`
    : `Additional information as link`,

  menuFileLabel: isCareEnv
    ? `Hygiene regulations as PDF`
    : `Additional information as PDF`,

  menuFileHint: `Only pdf files can be uploaded`,

  craft: 'craft enterprise',
  other: 'other',
  retail: 'retail trade',
  workplace: 'place of work',
  food_service: 'food service establishment',
  public_building: 'public building',
  educational_institution: 'educational institution',

  coronaTestSelectOptions0: 'No proof required',
  coronaTestSelectOptions24:
    'Proof of recovery, Vaccination or test (24 hours)',
  coronaTestSelectOptions48:
    'Proof of recovery, Vaccination or test (48 hours)',
  coronaTestSelectOptionsRecovered: 'Proof of recovery or vaccination',
}

export default { de, en }
