import qrPage from '~pages/qr.de'
import coronaPage from '~pages/corona.de'
import errorPage from '~pages/_error.de'
import deIndexPage from '~pages/index.de'
import checkinPage from '~pages/checkin.de'
import error404Page from '~pages/404.de'
import deMyCheckinsPage from '~pages/my-checkins.de'

import indexPage from '~pages/index.de.ts'

import businessIndex from '~pages/business/index.de'
import businessLogin from '~pages/business/login.de'
import businessLogout from '~pages/business/logout.de'
import businessProfile from '~pages/business/profile.de'
import businessDashboard from '~pages/business/dashboard.de'

export type LocaleResources = {
  qr: typeof qrPage
  index: typeof deIndexPage
  error: typeof errorPage
  corona: typeof coronaPage
  checkin: typeof checkinPage
  error404: typeof error404Page
  myCheckins: typeof deMyCheckinsPage
  businessIndex: typeof businessIndex
  businessLogin: typeof businessLogin
  businessLogout: typeof businessLogout
  businessProfile: typeof businessProfile
  businessDashboard: typeof businessDashboard
}

export type LocaleLanguages = 'de' // | 'en' | 'pl'

declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom resources type
    resources: LocaleResources
  }
}
