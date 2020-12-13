/* eslint-disable @typescript-eslint/camelcase */
import React from 'react'
import { useStripe, useElements, IbanElement } from '@stripe/react-stripe-js'

import IbanForm from './IbanForm'

export default function PaymentSetupForm(props) {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const iban = elements.getElement(IbanElement)

    // For brevity, this example is using uncontrolled components for
    // the accountholder's name and email. In a real world app you will
    // probably want to use controlled components.
    // https://reactjs.org/docs/uncontrolled-components.html
    // https://reactjs.org/docs/forms.html#controlled-components

    const accountholderName = event.target['accountholder-name']
    const email = event.target.email

    const result = await stripe.confirmSepaDebitSetup(props.intent, {
      payment_method: {
        sepa_debit: iban,
        billing_details: {
          name: accountholderName.value,
          email: email.value,
        },
      },
    })

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message)
    } else {
      debugger
      // Show a confirmation message to your customer.
      // The SetupIntent is in the 'succeeded' state.
    }
  }

  return <IbanForm onSubmit={handleSubmit} disabled={!stripe} />
}
