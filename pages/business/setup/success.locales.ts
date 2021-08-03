import { isFormal } from '~lib/config'

const de = {
  title: 'Account erstellt',
  headline: isFormal ? ' Ihr privater Schlüssel.' : ' Dein privater Schlüssel.',
}

const en: typeof de = {
  title: 'Account created',
  headline: ' Your private key.',
}

export default { de, en }
