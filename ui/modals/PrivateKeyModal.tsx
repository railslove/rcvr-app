import * as React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { queryCache } from 'react-query'

import { hexToBase64 } from '~lib/crypto'
import { updateOwner } from '~lib/db'
import { Box, Input, Button, Text } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'

interface Props {
  ownerId?: number
}
type MProps = ModalBaseProps & Props

const PrivateKeySchema = Yup.object().shape({
  hexPrivateKey: Yup.string()
    .required('Privater Schlüssel muss eingegeben werden.')
    .matches(
      /^[A-Fa-f0-9\s]+$/,
      'Der private Schlüssel darf nur Zahlen und Buchstaben von A - F beinhalten.'
    ),
})

export const PrivateKeyModal: React.FC<MProps> = ({
  ownerId,
  ...baseProps
}) => {
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = React.useCallback(
    async ({ hexPrivateKey }, bag) => {
      try {
        setLoading(true)
        const privateKey = hexToBase64(hexPrivateKey)
        await updateOwner({ id: ownerId, privateKey })
        queryCache.refetchQueries('owner')
        baseProps.onClose()
      } catch (error) {
        bag.setFieldError(
          'hexPrivateKey',
          'Dein privater Schlüssel konnte nicht eingelesen werden. Bitte kontrolliere ihn nochmal. ' +
            error.toString()
        )
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [baseProps, ownerId]
  )

  return (
    <ModalBase
      {...baseProps}
      maxWidth={400}
      loading={loading}
      title="Dein privater Schlüssel"
    >
      <Formik
        initialValues={{ hexPrivateKey: '' }}
        validationSchema={PrivateKeySchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Text>
            <p>
              Bitte gib deinen privaten Schlüssel ein, den du während der
              Registrierung notiert hast.
            </p>
            <p>
              Er enthält nur Zahlen von 0 - 9 und Buchstaben von A - F. Du
              kannst ihn mit oder ohne Leerzeichen eingeben, mit Groß- oder
              Kleinbuchstaben.
            </p>
          </Text>
          <Box height={6} />
          <Input
            name="hexPrivateKey"
            label="Dein privater Schlüssel"
            multiline
            autoFocus
          />
          <Box height={4} />
          <Button type="submit" css={{ width: '100%' }}>
            Speichern
          </Button>
        </Form>
      </Formik>
    </ModalBase>
  )
}
