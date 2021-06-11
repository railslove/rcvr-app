import { Form, Formik } from 'formik'
import area from 'pages/business/company/[companyId]/area'
import * as React from 'react'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { patchArea, postArea } from '~lib/api'
import { isCareEnv, isFormal, isHealthEnv } from '~lib/config'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { Box, Button, Input, Text, Checkbox } from '~ui/core'

interface Props {
  type: 'new' | 'edit'
  name?: string
  testExemption?: string
  areaId?: string
  companyId?: string
}
type MProps = ModalBaseProps & Props

const AreaSchema = Yup.object().shape({
  name: Yup.string().required(
    isFormal
      ? 'Sie müssen einen Namen angeben'
      : 'Du musst einen Namen angeben.'
  ),
})

export const AreaDataModal: React.FC<MProps> = ({
  type = 'new',
  name,
  testExemption,
  areaId,
  companyId,
  ...baseProps
}) => {
  const queryClient = useQueryClient()
  const title = { new: 'Neuer Bereich', edit: 'Bereich ändern' }[type]
  const button = { new: 'Hinzufügen', edit: 'Speichern' }[type]
  const [loading, setLoading] = React.useState(false)

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
        initialValues={{
          name: name || '',
          testExemption: String(testExemption) == 't' ? true : false,
        }}
        validationSchema={AreaSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Text>
            Der Name des Bereichs wird über dem QR Code angezeigt. Falls{' '}
            {isFormal
              ? 'Sie bereits Lage-, Stationspläne oder ähnliches haben, können Sie'
              : 'du bereits einen Übersichtsplan hast, kannst du'}{' '}
            die Benennung in gleicher Weise abbilden.
          </Text>
          <Box height={6} />
          <Input
            name="name"
            label="Name des Bereichs"
            hint={
              isCareEnv || isHealthEnv
                ? 'z.B "Eingangsbereich" oder "Station 1"'
                : 'z.B. "Tisch 1" oder "Theke"'
            }
            autoFocus
          />
          <Checkbox
            name="testExemption"
            label="Dieser Bereich benötigt KEINE nachweise von impfung, test oder genesung (Betriebsunabhängig)"
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
