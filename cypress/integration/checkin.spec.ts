/// <reference types="cypress" />

import { decrypt } from '../../lib/crypto'

const privateKey = 'KVITtyAWMy0fKTRyqTAm2r05+FkyibXVSnlsI5v0XqQ='
const publicKey = '5ki/YAX91GQ0ABSyBTsOXBO7tBl6ZJat+OzxnbZCjVM='
const areaId = '5ac34aab-81f8-4f4d-bc24-97ba8d21eb7b'

context('Checkin', () => {
  beforeEach(() => {
    indexedDB.deleteDatabase('RcvrDatabase')

    cy.clock(Date.parse('2020-05-11T12:30:00.000Z'), ['Date'])

    cy.intercept('GET', `https://api.local/areas/${areaId}`, {
      id: areaId,
      name: 'Test Tisch',
      menuLink: null,
      companyId: 'some-uuid',
    })

    cy.intercept('POST', `https://api.local/tickets`, {
      companyName: 'Testlokal',
      enteredAt: '2020-05-11T12:30:00.000Z',
    }).as('createTicket')
  })

  it('has a working checkin', () => {
    cy.visit(`/checkin?a=${areaId}&k=${encodeURIComponent(publicKey)}`)

    cy.get('#name').clear().type('John Doe')
    cy.get('#phone').clear().type('0221 12312312')
    cy.get('#address').clear().type('ExampleStreet 1')
    cy.get('#postalCode').clear().type('12345')
    cy.get('#city').clear().type('Example')

    cy.get('#rememberMe').then((elem) => {
      if (!elem.prop('checked')) {
        cy.get('label[for="rememberMe"]').click()
      }
    })

    cy.get('button[type="submit"]').click()

    cy.wait('@createTicket').should(({ request }) => {
      expect(request.body.ticket.id).to.match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      )
      expect(request.body.ticket.area_id).to.be.eq(areaId)
      expect(request.body.ticket.public_key).to.be.eq(publicKey)
      expect(request.body.ticket.entered_at).to.be.eq(
        '2020-05-11T12:30:00.000Z'
      )
      const decrypted = decrypt(
        request.body.ticket.encrypted_data,
        publicKey,
        privateKey
      )
      expect(decrypted).to.eq(
        '"John Doe","0221 12312312","ExampleStreet 1, 12345 Example",'
      )
    })

    cy.location('pathname', { timeout: 20000 }).should(
      'include',
      '/my-checkins'
    )
  })

  it('validates the phone number', () => {
    cy.visit(`/checkin?a=${areaId}&k=${encodeURIComponent(publicKey)}`)

    cy.get('#name').clear().type('John Doe')
    cy.get('#address').clear().type('ExampleStreet 1')
    cy.get('#postalCode').clear().type('12345')
    cy.get('#city').clear().type('Example')
    cy.get('#phone').clear().type('wrong')

    cy.get('button[type="submit"]').click()

    cy.contains('Telefonnummer ist nicht im richtigen Format')

    cy.get('#phone').clear().type('01599 7823424')

    cy.get('button[type="submit"]').click()
    cy.wait('@createTicket')
    cy.location('pathname', { timeout: 20000 }).should(
      'include',
      '/my-checkins'
    )
  })
})
