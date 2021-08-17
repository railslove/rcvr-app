import * as React from 'react'
import { useStripe } from '@stripe/react-stripe-js'

import SepaForm from './SepaForm'
import { postSepaSubscription } from '~lib/api'
import { useRouter } from 'next/router'
import { Card, Box, Text } from '~ui/core'
import { Loading } from '~ui/blocks/Loading'
import useLocaleAsync from '~locales/useLocaleAsync'

interface SepaPaymentProps {
  intent: string
}

const SepaPayment: React.FC<SepaPaymentProps> = ({ intent }) => {
  const { t } = useLocaleAsync('ui/blocks/SepaPayment')
  const stripe = useStripe()

  const router = useRouter()
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async ({ name, email, iban }) => {
    setLoading(true)
    try {
      const result = await stripe.confirmSepaDebitSetup(intent, {
        payment_method: {
          sepa_debit: { iban },
          billing_details: {
            name,
            email,
          },
        },
      })
      if (result.error) {
        setError(result.error)
      } else {
        await postSepaSubscription({
          token: result.setupIntent?.payment_method,
        })
        await router.replace('/business/profile?success=true')
        // no idea how to do it properly :S
        // owner changed and I have no idea how to force a reload
        location.reload()
      }
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Loading show={loading} />
      {error && (
        <Card mx={-4} p={6}>
          <Text variant="h3" as="h1" color="red.500">
            {t('title')}
          </Text>
          <Text>{error.message}</Text>
          <Box height={4} />
        </Card>
      )}
      <SepaForm onSubmit={handleSubmit} disabled={!stripe} />
    </>
  )
}
export default SepaPayment
