import { isFormal } from '~lib/config'
import coronaDe from '~pages/corona.de'

const en: typeof coronaDe = {
  ...coronaDe,

  title: 'What should I do if I am a contact?',
  pageTitle: 'Corona, what now?',
  description1: 'First and foremost: stay calm',
  description2: `If you are a confirmed contact the health department will contact you by telephone within 48 hours`,
  description3: [
    `If you already have typical symptoms such as fever,`,
    `you should, as a precaution, stay in domestic quarantine and inform the health department.`,
  ].join(' '),

  hotlineTitle: 'Corona virus hotline',

  moreQuestionsTitle: 'Any questions?',
  moreQuestionsText1:
    'A variety of constantly updated information is available on the website of the Federal Ministry of Health:',

  moreQuestionsText2:
    'There you will also find, in particular, links to the information provided by the Federal Center for Health Education and the Robert Koch Institute.',
}

export default en
