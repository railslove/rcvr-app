import * as React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useQueryClient } from 'react-query'

import { isFormal } from '~lib/config'
import { postAutoDataRequest } from '~lib/api'
import { Text, Box, Button, Input, Callout } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'

interface Props {
  companyId?: string
}
type MProps = ModalBaseProps & Props

const DataRequestSchema = Yup.object().shape({
  reason: Yup.string().required(
    isFormal
      ? 'Sie müssen einen Grund für die Abfrage angeben.'
      : 'Du musst einen Grund für die Abfrage angeben.'
  ),
})

export const AutoDataRequestModal: React.FC<MProps> = ({
  companyId,
  ...baseProps
}) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = React.useCallback(
    async ({ reason }, bag) => {
      try {
        setLoading(true)
        await postAutoDataRequest(reason, companyId)
        queryClient.invalidateQueries('dataRequests')
        baseProps.onClose()
      } catch (error) {
        bag.setFieldError(
          'reason',
          'Es ist zu einem Fehler gekommen: ' + error.toString()
        )
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [baseProps, companyId, queryClient]
  )
  return (
    <ModalBase
      {...baseProps}
      maxWidth={400}
      loading={loading}
      title="Automatischen Datenabfrage"
    >
      <Formik
        initialValues={{ reason: '' }}
        validationSchema={DataRequestSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Callout variant="danger">
            <Text>
              {isFormal ? 'Sie dürfen' : 'Du darfst'} diese Abfrage nur einmal
              am Tag stellen.
            </Text>
          </Callout>
          <Box height={6} />
          <Input
            name="reason"
            label="Grund für die Abfrage"
            hint="z.B. Namen und Dienstausweisnummer vom Mitarbeiter"
            autoFocus
          />
          <Box height={4} />
          <Button type="submit" css={{ width: '100%' }}>
            Abfragen
          </Button>
        </Form>
      </Formik>
    </ModalBase>
  )
}
