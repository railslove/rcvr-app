import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { unparse } from 'papaparse'
import FileSaver from 'file-saver'

import { base64ToHex, hexToBase64 } from '~lib/crypto'
import { decrypt } from '~lib/actions'
import { withOwner, WithOwnerProps } from '~lib/pageWrappers'
import { Box, Text, Button, Input, Table } from '~ui/core'
import { OwnerApp, BackLink } from '~ui/layouts/OwnerApp'

const DecryptionSchema = Yup.object().shape({
  hexPrivateKey: Yup.string()
    .required('Privater Schlüssel muss eingegeben werden.')
    .matches(
      /^[A-Fa-f0-9\s]+$/,
      'Der private Schlüssel darf nur Zahlen und Buchstaben von A - F beinhalten.'
    ),
})

const DecryptPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const [fileContents, setFileContents] = React.useState<string>()
  const [decrypted, setDecrypted] = React.useState<string[][]>()
  const [decryptedMeta, setDecryptedMeta] = React.useState({
    success: 0,
    failed: 0,
  })

  const initialPrivateKey = React.useMemo(() => {
    if (!owner.privateKey) return ''
    try {
      return base64ToHex(owner.privateKey)
    } catch (error) {
      return ''
    }
  }, [owner])

  const onDrop = React.useCallback((acceptedFiles) => {
    if (acceptedFiles.length < 1) {
      alert(
        'Du musst die .csv Datei auswählen, die wir dir geschickt haben.' +
          ' Du kannst nur eine Datei gleichzeitig auswählen.'
      )
      return
    }

    const [file] = acceptedFiles
    const reader = new FileReader()

    reader.onabort = (): void => {
      alert('Einlesen der Datei wurde abgebrochen.')
    }
    reader.onerror = (): void => {
      alert('Einlesen der Datei ist fehlgeschlagen.')
    }

    reader.onload = (): void => {
      setFileContents(reader.result as string)
    }

    reader.readAsText(file, 'UTF-8')
  }, [])

  const handleSubmit = React.useCallback(
    async ({ hexPrivateKey }, bag) => {
      if (!fileContents) {
        alert('Du hast noch keine Datei ausgewählt.')
        return
      }

      let privateKey
      try {
        privateKey = hexToBase64(hexPrivateKey.toUpperCase().replace(/\s/g, ''))
      } catch (_e) {
        bag.setFieldError(
          'hexPrivateKey',
          'Dein privater Schlüssel kann nicht eingelesen werden.' +
            ' Bitte wende dich an den Support.'
        )
        return
      }

      const { data, success, failed } = await decrypt(
        fileContents,
        privateKey,
        owner
      )

      setDecryptedMeta({ success, failed })
      setDecrypted(data)
    },
    [owner, fileContents]
  )

  const handleDownload = React.useCallback(() => {
    const text = unparse(decrypted)
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    FileSaver.saveAs(
      blob,
      `recover_kontaktdaten_${new Date().toISOString()}.txt`
    )
  }, [decrypted])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  return (
    <OwnerApp title="Daten entschlüsseln">
      <BackLink href="/business/dashboard">Meine Betriebe</BackLink>
      <Text variant="shy">
        Wenn Du ein Datenpaket mit verschlüsselten Kundenkontaktdaten von uns
        bekommen hast, kannst du es hier entschlüsseln.
      </Text>

      <Box mt={6}>
        <Button as="div" {...getRootProps()} css={{ display: 'inline-block' }}>
          <input {...getInputProps()} />
          {fileContents
            ? 'Datei ausgewählt'
            : isDragActive
            ? 'Hier fallen lassen'
            : 'Datenpaket auswählen (*.csv)'}
        </Button>
      </Box>

      <Formik
        initialValues={{ hexPrivateKey: initialPrivateKey }}
        validationSchema={DecryptionSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form>
          <Box height={6} />
          {!owner.privateKey && (
            <Box mb={4}>
              <Text variant="h3" as="h3">
                Dein privater Schlüssel
              </Text>
              <Box height={4} />
              <Text>
                <p>
                  Dein privater Schlüssel ist nicht mehr auf Deinem Gerät
                  gespeichert. Zum Entschlüsseln musst du ihn eingeben.
                </p>
                <p>
                  Dein Schlüssel beinhaltet nur Zahlen von 0 - 9 und Buchstaben
                  von A - F. Du kannst ihn mit oder ohne Leerzeichen eingeben,
                  mit Groß- oder Kleinbuchstaben.
                </p>
              </Text>
              <Box height={4} />
              <Input
                name="hexPrivateKey"
                label="Privater Schlüssel"
                multiline
              />
            </Box>
          )}
          <Button type="submit">Jetzt entschlüsseln</Button>
        </Form>
      </Formik>

      {decrypted && (
        <Box mt={10}>
          <Text variant="h2" as="h3">
            Entschlüsselte Daten
          </Text>
          <Box height={6} />
          <Text>Erfolgreich entschlüsselt: {decryptedMeta.success}</Text>
          {decryptedMeta.failed > 0 && (
            <Text>Nicht entschlüsselbar: {decryptedMeta.failed}</Text>
          )}
          {decryptedMeta.failed > 0 && decryptedMeta.success === 0 && (
            <Text color="red.500" fontWeight="bold">
              Keine Einträge konnten entschlüsselt werden. Dein privater
              Schlüssel passt nicht zu den verschlüsselten Daten. Bitte gib
              deinen privaten Schlüssel neu ein und prüfe, dass du die richtige
              Datei ausgewählt hast.
            </Text>
          )}
          <Box height={6} />
          <Button type="button" onClick={handleDownload}>
            Herunterladen
          </Button>
          <Box mx={-4} p={4} css={{ overflow: 'scroll' }}>
            <Table css={{ maxWidth: '100%' }}>
              <tbody>
                {decrypted.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, k) => (
                      <td key={k}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </Box>
      )}
    </OwnerApp>
  )
}

export default withOwner()(DecryptPage)
