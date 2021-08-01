import deErrorPage from './deErrorPage'
import deIndexPage from './deIndexPage'
import deScanQRPage from './deScanQRPage'
import deCoronaPage from './deCoronaPage'
import deCheckinPage from './deCheckinPage'
import deError404Page from './deError404Page'
import deMyCheckinsPage from './deMyCheckinsPage'

export const de = {
  indexPage: deIndexPage,
  errorPage: deErrorPage,
  scanQRPage: deScanQRPage,
  coronaPage: deCoronaPage,
  checkinPage: deCheckinPage,
  error404Page: deError404Page,
  myCheckinsPage: deMyCheckinsPage,
}

export const en: typeof de = {
  ...de,
}
