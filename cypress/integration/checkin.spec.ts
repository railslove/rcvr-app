/// <reference types="cypress" />

import { decrypt } from '../../lib/crypto'

const privateKey = 'KVITtyAWMy0fKTRyqTAm2r05+FkyibXVSnlsI5v0XqQ='
const publicKey = '5ki/YAX91GQ0ABSyBTsOXBO7tBl6ZJat+OzxnbZCjVM='

context('Checkin', () => {
  beforeEach(() => {
    indexedDB.deleteDatabase('RcvrDatabase')
  })

  it('has a working checkin', () => {
    const areaId = '5ac34aab-81f8-4f4d-bc24-97ba8d21eb7b'
    cy.clock(Date.parse('2020-05-11T12:30:00.000Z'), ['Date'])

    cy.intercept('GET', `https://api.local/areas/${areaId}`, {
      id: areaId,
      name: 'Test Tisch',
      menuLink: null,
      companyId: 'some-uuid',
      companyNeedToShowCoronaTest: false,
    })

    cy.intercept('POST', `https://api.local/tickets`, {
      companyName: 'Testlokal',
      enteredAt: '2020-05-11T12:30:00.000Z',
    }).as('createTicket')

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
        '"John Doe","0221 12312312","ExampleStreet 1, 12345 Example",,'
      )
    })

    cy.location('pathname', { timeout: 20000 }).should(
      'include',
      '/my-checkins'
    )
  })

  it('validates the phone number', () => {
    const areaId = '5ac34aab-81f8-4f4d-bc24-97ba8d21eb9bd'
    cy.clock(Date.parse('2020-05-11T12:30:00.000Z'), ['Date'])

    cy.intercept('GET', `https://api.local/areas/${areaId}`, {
      id: areaId,
      name: 'Test Tisch',
      menuLink: null,
      companyId: 'some-uuid',
      companyNeedToShowCoronaTest: false,
    })

    cy.intercept('POST', `https://api.local/tickets`, {
      companyName: 'Testlokal',
      enteredAt: '2020-05-11T12:30:00.000Z',
    }).as('createTicket')

    cy.visit(`/checkin?a=${areaId}&k=${encodeURIComponent(publicKey)}`)

    cy.get('#name').clear().type('John Doe')
    cy.get('#address').clear().type('ExampleStreet 1')
    cy.get('#postalCode').clear().type('12345')
    cy.get('#city').clear().type('Example')
    cy.get('#phone').clear().type('wrong')

    cy.get('button[type="submit"]').click()

    cy.contains('Telefonnummer ist nicht im richtigen Format')

    cy.get('#phone').clear().type('01599 7823424')

    cy.contains('Telefonnummer ist nicht im richtigen Format').should(
      'not.exist'
    )

    cy.get('#phone').clear().type('+49 1599 7823424')

    cy.contains('Telefonnummer ist nicht im richtigen Format').should(
      'not.exist'
    )

    cy.get('button[type="submit"]').click()
    cy.wait('@createTicket')
    cy.location('pathname', { timeout: 20000 }).should(
      'include',
      '/my-checkins'
    )
  })

  it('requires the negative test checkbox if the company demands it', () => {
    const areaId = '5ac34aab-81f8-4f4d-bc24-97ba8d21eb77'

    cy.clock(Date.parse('2020-05-11T12:35:00.000Z'), ['Date'])

    cy.intercept('GET', `https://api.local/areas/${areaId}`, {
      id: areaId,
      name: 'Test Tisch',
      menuLink: null,
      companyId: 'some-uuid',
      companyNeedToShowCoronaTest: true,
    })

    cy.intercept('POST', `https://api.local/tickets`, {
      companyName: 'Testlokal',
      enteredAt: '2020-05-11T12:30:00.000Z',
    }).as('createTicketWithTesting')

    cy.visit(`/checkin?a=${areaId}&k=${encodeURIComponent(publicKey)}`)

    cy.get('#name').clear().type('John Doe')
    cy.get('#phone').clear().type('0221 12312312')
    cy.get('#address').clear().type('ExampleStreet 1')
    cy.get('#postalCode').clear().type('12345')
    cy.get('#city').clear().type('Example')

    cy.get('button[type="submit"]').click()

    cy.contains('Du musst entweder getestet, genesen oder geimpft sein.')

    cy.get('label[for="TESTED"]').click()

    cy.get('button[type="submit"]').click()
    cy.wait('@createTicketWithTesting').should(({ request }) => {
      expect(request.body.ticket.id).to.match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      )
      expect(request.body.ticket.area_id).to.be.eq(areaId)
      expect(request.body.ticket.public_key).to.be.eq(publicKey)
      expect(request.body.ticket.entered_at).to.be.eq(
        '2020-05-11T12:35:00.000Z'
      )
      const decrypted = decrypt(
        request.body.ticket.encrypted_data,
        publicKey,
        privateKey
      )
      expect(decrypted).to.eq(
        '"John Doe","0221 12312312","ExampleStreet 1, 12345 Example",,"TESTED"'
      )
    })
    cy.location('pathname', { timeout: 20000 }).should(
      'include',
      '/my-checkins'
    )
  })

  it('shows the CWA checkin link if the company has it enabled', () => {
    const areaId = '5ac34aab-81f8-4f4d-bc24-97ba8d21eb77'

    cy.clock(Date.parse('2020-05-11T12:35:00.000Z'), ['Date'])

    cy.intercept('GET', `https://api.local/areas/${areaId}`, {
      id: areaId,
      name: 'Test Tisch',
      menuLink: null,
      companyId: 'some-uuid',
      companyNeedToShowCoronaTest: false,
    })

    cy.intercept('POST', `https://api.local/tickets`, {
      companyName: 'Testlokal',
      companyCwaLinkEnabled: true,
      enteredAt: '2020-05-11T12:30:00.000Z',
    }).as('createTicketWithTesting')

    cy.visit(
      `/checkin?a=${areaId}&k=${encodeURIComponent(
        publicKey
      )}&cwa=u0DcUHT8Q6f33RP6DoIt7g==`
    )
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen') // 'spy' vs 'stub' lets the new tab still open if you are visually watching it
    })

    cy.get('#name').clear().type('John Doe')
    cy.get('#phone').clear().type('0221 12312312')
    cy.get('#address').clear().type('ExampleStreet 1')
    cy.get('#postalCode').clear().type('12345')
    cy.get('#city').clear().type('Example')

    cy.get('button[type="submit"]').click()

    cy.wait('@createTicketWithTesting').should(({ request }) => {
      expect(request.body.ticket.id).to.match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      )
    })
    cy.location('pathname', { timeout: 20000 }).should(
      'include',
      '/my-checkins'
    )

    cy.get('button[name="cwaCheckinUrl"]').click()
    cy.get('@windowOpen').should(
      'be.calledWith',
      'https://e.coronawarn.app/?v=1#CAESDQgBEglUZXN0bG9rYWwadggBEmCDAszMTXne1DAA5/YxmhRdd/NZN2VKl9L32Jl9+ZybE4b2eNIrhFOKYU4XAOHq3RPLDxdHTW6ANiO24rCOO4rj06HzcVZy3pel58+L1KSPG+/PneL2BoyZQRz3qlu2hoAaELtA3FB0/EOn990T+g6CLe4iBAgBGAA=',
      '_blank',
      'noopener=yes'
    )
  })

  it('does not crash the app if auto checkout does not find the ticket', () => {
    const areaId = '5ac34aab-81f8-4f4d-bc24-97ba8d21eb7b'
    cy.clock(Date.parse('2020-05-11T12:30:00.000Z'), ['Date'])

    cy.intercept('GET', `https://api.local/areas/${areaId}`, {
      id: areaId,
      name: 'Test Tisch',
      menuLink: null,
      companyId: 'some-uuid',
      companyNeedToShowCoronaTest: false,
    })

    cy.intercept('POST', `https://api.local/tickets`, {
      companyName: 'Testlokal',
      enteredAt: '2020-05-11T12:30:00.000Z',
    }).as('createTicket')

    cy.visit(`/checkin?a=${areaId}&k=${encodeURIComponent(publicKey)}`)

    cy.get('#name').clear().type('John Doe')
    cy.get('#phone').clear().type('0221 12312312')
    cy.get('#address').clear().type('ExampleStreet 1')
    cy.get('#postalCode').clear().type('12345')
    cy.get('#city').clear().type('Example')

    cy.get('button[type="submit"]').click()

    cy.location('pathname', { timeout: 20000 }).should(
      'include',
      '/my-checkins'
    )

    cy.intercept('GET', `https://api.local/areas/${areaId}`, {
      id: areaId,
      name: 'Test Tisch',
      menuLink: null,
      companyId: 'some-uuid',
      companyNeedToShowCoronaTest: false,
    })

    cy.intercept('POST', `https://api.local/tickets`, {
      companyName: 'Testlokal',
      enteredAt: '2020-05-11T12:30:00.000Z',
    }).as('createTicket')

    cy.intercept(`https://api.local/tickets/**`, {
      statusCode: 404,
    }).as('createTicket')

    cy.visit(`/checkin?a=${areaId}&k=${encodeURIComponent(publicKey)}`)
    cy.visit(`/checkin?a=${areaId}&k=${encodeURIComponent(publicKey)}`)

    cy.get('#name').clear().type('John Doe')
    cy.get('#phone').clear().type('0221 12312312')
    cy.get('#address').clear().type('ExampleStreet 1')
    cy.get('#postalCode').clear().type('12345')
    cy.get('#city').clear().type('Example')

    cy.get('button[type="submit"]').click()

    cy.location('pathname', { timeout: 20000 }).should(
      'include',
      '/my-checkins'
    )
  })
})
