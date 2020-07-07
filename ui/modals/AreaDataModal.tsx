import * as React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { queryCache } from 'react-query'

import { patchArea, postArea } from '~lib/api'
import { Box, Input, Button, Text } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'

interface Props {
  type: 'new' | 'edit'
  name?: string
  areaId?: string
  companyId?: string
}
type MProps = ModalBaseProps & Props

const AreaSchema = Yup.object().shape({
  name: Yup.string().required('Sie müssen einen Namen angeben.'),
})

export const AreaDataModal: React.FC<MProps> = ({
  type = 'new',
  name,
  areaId,
  companyId,
  ...baseProps
}) => {
  const title = { new: 'Neuer Bereich', edit: 'Bereich ändern' }[type]
  const button = { new: 'Hinzufügen', edit: 'Speichern' }[type]
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = React.useCallback(
    async ({ name }, bag) => {
      try {
        setLoading(true)
        if (type === 'edit') {
          await patchArea(areaId, { name })
        }
        if (type === 'new') {
          await postArea({ name, companyId })
        }
        queryCache.refetchQueries('areas')
        queryCache.refetchQueries('companies')
        baseProps.onClose()
      } catch (error) {
        bag.setFieldError(
          'name',
          'Es ist zu einem Fehler gekommen: ' + error.toString()
        )
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [type, areaId, baseProps, companyId]
  )

  return (
    <ModalBase {...baseProps} maxWidth={400} loading={loading} title={title}>
      <Formik
        initialValues={{ name: name || '' }}
        validationSchema={AreaSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Text>
            Der Name des Bereichs wird über dem QR Code angezeigt. Falls Sie
            bereits einen Saalplan haben, können Sie die Nummerierung in gleicher
            Weise abbilden.
          </Text>
          <Box height={6} />
          <Input
            name="name"
            label="Name des Bereichs"
            hint='z.B. "Tisch 1" oder "Theke"'
            autoFocus
          />
          <Box height={4} />
          <Button type="submit" css={{ width: '100%' }}>
            {button}
          </Button>
        </Form>
      </Formik>
    </ModalBase>
  )
}
