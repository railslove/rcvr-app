import 'fake-indexeddb/auto'
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import MockDate from 'mockdate'
import { queryCache, setConsole } from 'react-query'
import fetchMock from 'fetch-mock-jest'

const noop = () => void 1
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })

declare global {
  interface SVGElement {
    getTotalLength(): number
  }
}

if (!SVGElement.prototype.getTotalLength) {
  SVGElement.prototype.getTotalLength = () => 1
}

beforeEach(() => {
  queryCache.clear()
  setConsole({ log: noop, warn: noop, error: noop })
})

afterEach(() => {
  cleanup()
  fetchMock.mockReset()
  jest.clearAllMocks()
  MockDate.reset()
})
