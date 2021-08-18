import areaIdDe from '~pages/business/company/[companyId]/area/[areaId].de'

const en: typeof areaIdDe = {
  ...areaIdDe,
  lastCheckins: 'Checkins in the last 24 hours. Updates automatically.',
  checkedIn: 'checked in',
  checkedOut: 'checked out',
}

export default en
