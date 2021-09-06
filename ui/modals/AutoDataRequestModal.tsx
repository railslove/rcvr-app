import * as React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useQueryClient } from 'react-query'

import { Box, Button, Input } from '~ui/core'
import { postAutoDataRequest } from '~lib/api'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import useLocaleObject from '~locales/useLocaleObject'
import autoDataRequestModalLocales from '~ui/modals/AutoDataRequestModal.locales'

interface Props {
  companyId?: string
}
type MProps = ModalBaseProps & Props

export const AutoDataRequestModal: React.FC<MProps> = ({
  companyId,
  ...baseProps
}) => {
  const { t } = useLocaleObject(autoDataRequestModalLocales)
  const queryClient = useQueryClient()
  const [loading, setLoading] = React.useState(false)

  const DataRequestSchema = Yup.object().shape({
    reason: Yup.string().required(),
  })

  const handleSubmit = React.useCallback(
    async ({ reason }, bag) => {
      try {
        setLoading(true)
        await postAutoDataRequest(reason, companyId)
        queryClient.invalidateQueries('dataRequests')
        baseProps.onClose()
      } catch (error) {
        bag.setFieldError('reason', t('submitError') + error.toString())
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [t, baseProps, companyId, queryClient]
  )
  return (
    <ModalBase
      {...baseProps}
      maxWidth={400}
      loading={loading}
      title={t('title')}
    >
      <Formik
        initialValues={{ reason: '' }}
        validationSchema={DataRequestSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input
            name="reason"
            label={t('reasonLabel')}
            hint={t('reasonHint')}
            autoFocus
          />
          <Box height={4} />
          <Button type="submit" css={{ width: '100%' }}>
            {t('request')}
          </Button>
        </Form>
      </Formik>
    </ModalBase>
  )
}
