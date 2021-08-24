import { Form, Formik } from 'formik'
import * as React from 'react'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { hexToBase64, validatePrivateKey } from '~lib/crypto'
import { updateOwner } from '~lib/db'
import { readTextFile } from '~lib/file'
import { useOwner } from '~lib/hooks'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { Box, Button, FileInput, Input, Text } from '~ui/core'

interface Props {
  ownerId?: number
}
type MProps = ModalBaseProps & Props

const PrivateKeySchema = Yup.object()
  .shape({
    textPrivateKey: Yup.string()
      .trim()
      .matches(
        /^[A-Fa-f0-9\s]+$/,
        'Der private Schlüssel darf nur Zahlen und Buchstaben von A - F beinhalten.'
      ),
    filePrivateKey: Yup.mixed(),
  })
  // WHAT A MESS...SORRY....I don't understand yup...i want the user to fill out ONE of the fields
  .test('check1', 'check1', function (value) {
    if (
      !value ||
      ((!value.textPrivateKey || value.textPrivateKey.length === 0) &&
        !value.filePrivateKey)
    ) {
      return this.createError({
        path: 'textPrivateKey',
        message: 'Privater Schlüssel muss eingegeben werden.',
      })
    }
    return true
  })
  .test('check2', 'check2', function (value) {
    if (
      !value ||
      ((!value.textPrivateKey || value.textPrivateKey.length === 0) &&
        !value.filePrivateKey)
    ) {
      return this.createError({
        path: 'filePrivateKey',
        message: 'Schlüssel auswählen.',
      })
    }
    return true
  })

export const PrivateKeyModal: React.FC<MProps> = ({
  ownerId,
  ...baseProps
}) => {
  const [loading, setLoading] = React.useState(false)
  const queryClient = useQueryClient()
  const { data: owner } = useOwner()

  const handleSubmit = React.useCallback(
    async (values, bag) => {
      try {
        let hexPrivateKey
        if (values.filePrivateKey) {
          hexPrivateKey = await readTextFile(values.filePrivateKey)
        } else {
          hexPrivateKey = values.textPrivateKey
        }
        setLoading(true)
        const privateKey = hexToBase64(hexPrivateKey)

        if (validatePrivateKey(owner.publicKey, privateKey)) {
          await updateOwner({ id: ownerId, privateKey })
          queryClient.invalidateQueries('owner')
          baseProps.onClose()
        } else {
          bag.setFieldError(
            'textPrivateKey',
            'Dein privater Schlüssel ist nicht korrekt.'
          )
        }
      } catch (error) {
        bag.setFieldError(
          'textPrivateKey',
          'Dein privater Schlüssel konnte nicht eingelesen werden. Bitte kontrolliere ihn nochmal. ' +
            error.toString()
        )
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [baseProps, ownerId, owner.publicKey, queryClient]
  )

  return (
    <ModalBase
      {...baseProps}
      maxWidth={400}
      loading={loading}
      title="Dein privater Schlüssel"
    >
      <Formik
        initialValues={{ textPrivateKey: '', filePrivateKey: undefined }}
        validationSchema={PrivateKeySchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Text>
            <p>
              Bitte gib Deinen privaten Schlüssel ein, den du während der
              Registrierung notiert hast.
            </p>
            <p>
              Er enthält nur Zahlen von 0 - 9 und Buchstaben von A - F. Du
              kannst ihn mit oder ohne Leerzeichen eingeben, mit Groß- oder
              Kleinbuchstaben.
            </p>
            <p>
              Wenn der Schlüssel als Datei vorliegt kannst du die Datei hier
              auswählen.
            </p>
          </Text>
          <Box height={6} />
          <FileInput
            name="filePrivateKey"
            type="file"
            label="Schüsseldatei auswählen"
            accept="text/plain"
          />
          <Box height={3} />
          <Text>
            <p>oder</p>
          </Text>
          <Box height={3} />
          <Input
            name="textPrivateKey"
            label="Schlüssel eingeben"
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
