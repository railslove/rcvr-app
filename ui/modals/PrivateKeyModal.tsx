import { Form, Formik } from 'formik'
import * as React from 'react'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { hexToBase64, validatePrivateKey } from '~lib/crypto'
import { updateOwner } from '~lib/db'
import { readTextFile } from '~lib/file'
import { useOwner } from '~lib/hooks'
import useLocaleObject from '~locales/useLocaleObject'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { Box, Button, FileInput, Input, Text } from '~ui/core'
import PrivateKeyModalLocales from '~ui/modals/PrivateKeyModal.locales'

interface Props {
  ownerId?: number
}
type MProps = ModalBaseProps & Props

export const PrivateKeyModal: React.FC<MProps> = ({
  ownerId,
  ...baseProps
}) => {
  const { t } = useLocaleObject(PrivateKeyModalLocales)
  const [loading, setLoading] = React.useState(false)
  const queryClient = useQueryClient()
  const { data: owner } = useOwner()

  const PrivateKeySchema = Yup.object()
    .shape({
      textPrivateKey: Yup.string()
        .trim()
        .matches(/^[A-Fa-f0-9\s]+$/, t('textPrivateKeyValidationError')),
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
          message: t('textPrivateKeyRequired'),
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
          message: t('filePrivateKeyRequired'),
        })
      }
      return true
    })

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
            t('submitTextPrivateKeyValidationError')
          )
        }
      } catch (error) {
        bag.setFieldError(
          'textPrivateKey',
          t('submitTextPrivateKeyError') + error.toString()
        )
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [baseProps, ownerId, owner?.publicKey, queryClient]
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
            <p>{t('message1')}</p>
            <p>{t('message2')}</p>
            <p>{t('message3')}</p>
          </Text>
          <Box height={6} />
          <FileInput
            name="filePrivateKey"
            type="file"
            label={t('filePrivateKeyLabel')}
            accept="text/plain"
          />
          <Box height={3} />
          <Text>
            <p>{t('or')}</p>
          </Text>
          <Box height={3} />
          <Input
            name="textPrivateKey"
            label={t('textPrivateKeyLabel')}
            multiline
            autoFocus
          />
          <Box height={4} />
          <Button type="submit" css={{ width: '100%' }}>
            {t('submitButtonText')}
          </Button>
        </Form>
      </Formik>
    </ModalBase>
  )
}
