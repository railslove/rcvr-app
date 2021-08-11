import { privacyUrl } from '~ui/whitelabels'
import { isFormal, isFreseniusEnv, isCareEnv, isHealthEnv } from '~lib/config'
import avvDe from '~pages/business/setup/avv.de'

const en: typeof avvDe = {
  message1: `By pressing the button ${
    isFormal ? 'you aggree' : 'I agree'
  } with the`,

  privacyPolicyLink: isFreseniusEnv
    ? privacyUrl
    : 'https://railslove.com/privacy/',

  privacyPolicyText: 'privacy policy',

  message2: 'and the',
  message3: 'agree',

  avvLink: isCareEnv
    ? '/avv/2021_AVV_recover.care.pdf'
    : isHealthEnv
    ? '/avv/AVV_recover.health.pdf'
    : '/avv/AVV_recover.pdf',

  avvLinkText: 'order processing agreement',
}

export default en
