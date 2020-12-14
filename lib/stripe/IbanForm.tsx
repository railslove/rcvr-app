import React from 'react'
import { IbanElement } from '@stripe/react-stripe-js'

import { Button } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'

// Custom styling can be passed as options when creating an Element.
const IBAN_STYLE = {
  base: {
    color: '#32325d',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4',
    },
    ':-webkit-autofill': {
      color: '#32325d',
    },
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
    ':-webkit-autofill': {
      color: '#fa755a',
    },
  },
}

const IBAN_ELEMENT_OPTIONS = {
  supportedCountries: ['SEPA'],
  // Elements can use a placeholder as an example IBAN that reflects
  // the IBAN format of your customer's country. If you know your
  // customer's country, we recommend that you pass it to the Element as the
  // placeholderCountry.
  placeholderCountry: 'DE',
  style: IBAN_STYLE,
}

export default function IbanForm({ onSubmit, disabled }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-row inline">
        <div className="col">
          <label>
            Name
            <input
              name="accountholder-name"
              placeholder="Jenny Rosen"
              required
            />
          </label>
        </div>

        <div className="col">
          <label>
            Email Address
            <input
              name="email"
              type="email"
              placeholder="jenny.rosen@example.com"
              required
            />
          </label>
        </div>
      </div>

      <div className="form-row">
        <label>
          IBAN
          <IbanElement options={IBAN_ELEMENT_OPTIONS} />
        </label>
      </div>

      <Button
        type="submit"
        disabled={disabled}
        right={<ArrowsRight color="pink" />}
      >
        SEPA Lastschriftverfahren bestätigen
      </Button>

      {/* Display mandate acceptance text. */}
      <div className="mandate-acceptance">
        By providing your payment information and confirming this payment, you
        you authorise (A) Rocketship Inc and Stripe, our payment service
        provider, to send instructions to your bank to debit your account and
        (B) your bank to debit your account in accordance with those
        instructions. As part of your rights, you are entitled to a refund from
        your bank under the terms and conditions of your agreement with your
        bank. A refund must be claimed within 8 weeks starting from the date on
        which your account was debited. Your rights are explained in a statement
        that you can obtain from your bank. You agree to receive notifications
        for future debits up to 2 days before they occur.
      </div>
    </form>
  )
}
