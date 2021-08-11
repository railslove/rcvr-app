import { isFormal } from '~lib/config'
import keysDe from '~pages/business/setup/keys.de'

const en: typeof keysDe = {
  pageTitle: `Your key`,
  title: `Your secret key`,
  message1: 'It is very important that you write down this key.',
  message2: isFormal
    ? 'For example, write down the key on a piece of paper and keep it carefully. You can also take a screenshot and save it. Or save the key in a password manager.'
    : 'For example, write the key on a piece of paper and store it carefully. Or take a screenshot of it and save it safely. You can also save it in a password manager.',
  message3: isFormal
    ? 'In the next step you need to enter the key. This will make sure that you have written it down correctly.'
    : 'In the next step you have to enter the key. With this we make sure that you have noted it correctly',

  submitButtonText: 'Check key',
}

export default en
