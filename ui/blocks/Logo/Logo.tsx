import React from 'react'
import { isCareEnv, isFreseniusEnv, isHealthEnv } from '~lib/config'

import LogoRcvr from '~ui/svg/logo-rcvr.svg'
import LogoCare from '~ui/svg/logo-care.svg'
import LogoHealth from '~ui/svg/logo-health.svg'
import LogoFresenius from '~ui/svg/logo-fresenius.svg'

export type LogoDimenisions = {
  logoSmallWidth: string
  logoBigWidth: string
  logoBigHeight: string
  logoSmallHeight: string
}

export const LOGO_DIMENSIONS: LogoDimenisions = (isCareEnv && {
  logoSmallWidth: '184px',
  logoSmallHeight: '35px',
  logoBigWidth: '240px',
  logoBigHeight: '40px',
}) ||
  (isHealthEnv && {
    logoSmallWidth: '184px',
    logoSmallHeight: '35px',
    logoBigWidth: '240px',
    logoBigHeight: '40px',
  }) ||
  (isFreseniusEnv && {
    logoSmallWidth: '150px',
    logoSmallHeight: '66px',
    logoBigWidth: '300px',
    logoBigHeight: '130px',
  }) || {
    logoSmallWidth: '122px',
    logoSmallHeight: '35px',
    logoBigWidth: '182px',
    logoBigHeight: '40px',
  }

const Logo: React.FC = () =>
  (isCareEnv && LogoCare) ||
  (isHealthEnv && LogoHealth) ||
  (isFreseniusEnv && LogoFresenius) ||
  LogoRcvr

export default Logo
