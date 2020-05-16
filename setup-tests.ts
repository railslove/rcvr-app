import 'fake-indexeddb/auto'
import '@testing-library/jest-dom/extend-expect'
import MockDate from 'mockdate'

require('jest-fetch-mock').enableMocks()

afterEach(() => {
  jest.clearAllMocks()
  MockDate.reset()
})
