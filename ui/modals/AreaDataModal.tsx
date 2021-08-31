import { Form, Formik } from 'formik'
import * as React from 'react'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { patchArea, postArea } from '~lib/api'
import { isCareEnv, isFormal, isHealthEnv } from '~lib/config'
import useLocaleObject from '~locales/useLocaleObject'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { Box, Button, Input, Text, Checkbox } from '~ui/core'
import AreaDataModalLocales from '~ui/modals/AreaDataModal.locales'

interface Props {
  type: 'new' | 'edit'
  name?: string
  testExemption?: boolean
  areaId?: string
  companyId?: string
}
type MProps = ModalBaseProps & Props

export const AreaDataModal: React.FC<MProps> = ({
  type = 'new',
  name,
  testExemption,
  areaId,
  companyId,
  ...baseProps
}) => {
  const { t } = useLocaleObject(AreaDataModalLocales)

  const queryClient = useQueryClient()
  const title = { new: t('titleNew'), edit: t('titleEdit') }[type]
  const button = { new: t('buttonNew'), edit: t('buttonEdit') }[type]
  const [loading, setLoading] = React.useState(false)

  const AreaSchema = Yup.object().shape({
    name: Yup.string().required(t('nameRequired')),
  })

  const handleSubmit = React.useCallback(
    async ({ name, testExemption }, bag) => {
      try {
        setLoading(true)
        if (type === 'edit') {
          await patchArea(areaId, { name, testExemption })
        }
        if (type === 'new') {
          await postArea({ name, companyId, testExemption })
        }
        queryClient.invalidateQueries('areas')
        queryClient.invalidateQueries('companies')
        baseProps.onClose()
      } catch (error) {
        bag.setFieldError('name', t('submitError') + error.toString())
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [type, areaId, baseProps, companyId, queryClient]
  )

  return (
    <ModalBase {...baseProps} maxWidth={400} loading={loading} title={title}>
      <Formik
        initialValues={{
          name: name || '',
          testExemption: testExemption,
        }}
        validationSchema={AreaSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Text>{t('message1')}</Text>
          <Box height={6} />
          <Input
            name="name"
            label={t('nameLabel')}
            hint={t('nameHint')}
            autoFocus
          />
          <Checkbox name="testExemption" label={t('testExemptionLabel')} />
          <Box height={4} />
          <Button type="submit" css={{ width: '100%' }}>
            {button}
          </Button>
        </Form>
      </Formik>
    </ModalBase>
  )
}
