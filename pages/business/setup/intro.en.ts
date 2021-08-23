import { isFreseniusEnv } from '~lib/config'
import de from '~pages/business/setup/intro.de'

const en: typeof de = {
  pageTitle: 'For companies',
  instruction: isFreseniusEnv
    ? 'How to use recover for your business'
    : 'Create an account',
  letsGo: "Let's go",

  setupIntro1: `Since Corona, many companies and institutions are required,
  to record contact information. Save yourself the paperwork! With recover
  you keep this list digitally. To protect the data of your guests,
  they are encrypted by the app. During the onboarding
  you create a digital key pair in a few steps`,

  setupIntro2: `After onboarding, you can contact us to verify the authenticity of your data with our
  our team to verify the authenticity of your data`,

  setupIntro3: `The setup of recover takes about 10 min. Are you ready? Then let's start,`,

  setupIntro1_care: `With recover you keep the contact list of your visitors digitally.
  To protect the data, the app encrypts it.`,

  setupIntro2_care: `The setup of recover takes about 10 min.`,
}

export default en
