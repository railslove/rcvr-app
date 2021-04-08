import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import fetchMock from 'fetch-mock-jest'
import MockDate from 'mockdate'
import * as React from 'react'
import { decrypt } from '~lib/crypto'
import { withTestRouter } from '~lib/testing/withTestRouter'
import Checkin from '../pages/checkin'

const privateKey = 'KVITtyAWMy0fKTRyqTAm2r05+FkyibXVSnlsI5v0XqQ='
const publicKey = '5ki/YAX91GQ0ABSyBTsOXBO7tBl6ZJat+OzxnbZCjVM='
const areaId = '5ac34aab-81f8-4f4d-bc24-97ba8d21eb7b'

const route = {
  pathname: '/checkin',
  query: { a: areaId, k: publicKey },
  replace: jest.fn(async () => true),
}

beforeEach(async () => {
  MockDate.set('2020-05-11T12:30:00.000Z')

  fetchMock.get(`path:/areas/${areaId}`, {
    id: areaId,
    name: 'Test Tisch',
    menuLink: null,
    companyId: 'some-uuid',
  })

  fetchMock.post('path:/tickets', {
    companyName: 'Testlokal',
    enteredAt: '2020-05-11T12:30:00.000Z',
  })
})

it('encrypts guest data and sends checkin to api', async () => {
  render(withTestRouter(<Checkin />, route))

  await screen.findByLabelText('Name')

  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'Donnie' },
  })
  fireEvent.change(screen.getByLabelText('Telefon'), {
    target: { value: '+11880' },
  })
  fireEvent.change(screen.getByLabelText('Anschrift (Straße und Hausnummer)'), {
    target: { value: 'Täststr. 3' },
  })
  fireEvent.change(screen.getByLabelText('Postleitzahl'), {
    target: { value: '50667' },
  })
  fireEvent.change(screen.getByLabelText('Ort'), {
    target: { value: 'Köln' },
  })
  fireEvent.click(screen.getByText('Check in'))

  await waitFor(() => {
    expect(route.replace).toHaveBeenCalledWith('/my-checkins')
  })

  const reqBodyStr: any = await fetchMock.lastOptions().body
  const reqBody: any = JSON.parse(reqBodyStr)

  // ensure request body was sent correctly
  expect(reqBody.ticket.id).toMatch(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  )
  expect(reqBody.ticket.area_id).toBe(areaId)
  expect(reqBody.ticket.public_key).toBe(publicKey)
  expect(reqBody.ticket.entered_at).toBe('2020-05-11T12:30:00.000Z')

  // ensure encrypted_data is decryptable
  const decrypted = decrypt(
    reqBody.ticket.encrypted_data,
    publicKey,
    privateKey
  )
  expect(decrypted).toBe('"Donnie","+11880","Täststr. 3, 50667 Köln",')
})
