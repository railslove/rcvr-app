import { AreaRes, CoronaTestOptions, CoronaTestOptionsValues } from '~lib/api'

export const getAreaCoronaTestOption = (
  area: Partial<AreaRes> = {}
): CoronaTestOptionsValues | null => {
  const { companyNeedToShowCoronaTest: value } = area

  switch (value) {
    case 0:
    case 1:
    case 24:
    case 48: {
      return CoronaTestOptions[value]
    }
    default: {
      return null
    }
  }
}

export const getAreaShouldAskForTest = (area: Partial<AreaRes>): boolean => {
  const option = getAreaCoronaTestOption(area)

  return option === '24_HOUR_TEST_NEEDED' || option === '48_HOUR_TEST_NEEDED'
}
