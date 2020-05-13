import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { parse, unparse } from 'papaparse'
import FileSaver from 'file-saver'
import { useOwner, updateOwner } from '@lib/db'
import { decrypt, hexToBase64 } from '@lib/crypto'
import { Box, Text, Card, Button, Callout } from '@ui/base'
import KeyInput from '@ui/blocks/KeyInput'
import BusinessLayout from '@ui/layouts/Business'

type DecryptProps = {}

type DecryptionResult = {
  data: string[][]
  correct: number
  wrong: number
}

const Decrypt: React.FC<DecryptProps> = () => {
  const { owner, refetch } = useOwner()
  const [encrypted, setEncrypted] = React.useState('')
  const [result, setResult] = React.useState<DecryptionResult | undefined>()
  const [tmpPrivateKey, setTmpPrivateKey] = React.useState('')

  const handleKeyInputChange = React.useCallback((value) => {
    setTmpPrivateKey(value)
  }, [])

  const onDrop = React.useCallback((acceptedFiles) => {
    if (acceptedFiles.length < 1) {
      alert(
        'Du musst die .csv Datei auswählen, die wir dir geschickt haben. Du kannst nur eine Datei gleichzeitig auswählen.'
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
      setResult(undefined)
      setEncrypted(reader.result as string)
    }

    reader.readAsText(file, 'UTF-8')
  }, [])

  const handleDecrypt = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setResult(undefined)
    const { data: rows } = parse(encrypted, { delimiter: ',' })
    const privateKey =
      owner.privateKey || hexToBase64(tmpPrivateKey.replace(/\s/g, ''))
    let correctCount = 0
    let wrongCount = 0

    const decryptedRows = rows.map((row) => {
      const encrypted = row[row.length - 1]
      let decrypted
      try {
        decrypted = decrypt(encrypted, owner.publicKey, privateKey)
      } catch (error) {
        console.error(error)
      }

      let newRow = [...row]

      if (!decrypted) {
        wrongCount++
        newRow[row.length - 1] = 'Nicht lesbar, Schlüssel falsch'
      } else {
        correctCount++
        const { data: decryptedCsv } = parse(decrypted, { delimiter: ',' })
        newRow[row.length - 1] = decryptedCsv[0]
        newRow = newRow.flat()
      }

      return newRow
    })

    if (correctCount === 0 && wrongCount > 0) {
      // key was most likely wrong
    } else {
      setEncrypted('')
    }

    setResult({
      data: decryptedRows,
      correct: correctCount,
      wrong: wrongCount,
    })
  }, [encrypted, tmpPrivateKey, owner])

  const handleSafe = React.useCallback(() => {
    const fileContents = unparse(result.data)
    const blob = new Blob([fileContents], { type: 'text/plain;charset=utf-8' })
    FileSaver.saveAs(blob, `recover_data_${new Date().toISOString()}.txt`)
  }, [result])

  const handleStoreKey = React.useCallback(async () => {
    const b64privateKey = hexToBase64(tmpPrivateKey.replace(/\s/g, ''))
    await updateOwner(owner.id, { privateKey: b64privateKey })
    await refetch()
    alert('Schlüssel wurde gespeichert.')
  }, [owner, tmpPrivateKey, refetch])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  return (
    <BusinessLayout title="Daten entschlüsseln">
      <Text>
        Wenn du von uns ein Datenpaket bekommen hast, kannst du es hier
        entschlüsseln.
      </Text>
      <Box mt={3} />
      {!encrypted && (
        <Card {...getRootProps()} mb={3}>
          <input {...getInputProps()} />
          {isDragActive ? 'Hier fallen lassen' : 'Datenpaket auswählen (*.csv)'}
        </Card>
      )}
      {result && (
        <>
          <Card mb={3}>
            <Text>{result.correct} Checkins entschlüsselt</Text>
            <Text>
              {result.wrong} Checkins konnten nicht entschlüsselt werden
            </Text>
          </Card>
          {result.correct === 0 && result.wrong > 0 && (
            <Callout variant="danger" mb={3}>
              Scheinbar konnten keine Checkins entschlüsselt werden. Dein
              privater Schlüssel scheint nicht richtig zu sein. Bitte
              kontrolliere ihn auf Richtigkeit und versuche es erneut.
            </Callout>
          )}
          <Box mb={3}>
            <Button title="Liste speichern" onClick={handleSafe} />
          </Box>
          {result.correct > 0 && !owner.privateKey && (
            <Box mb={3}>
              <Text mb={3}>
                Dein Schlüssel ist nicht auf deinem Gerät gespeichert. Möchtest
                du ihn speichern? Dann musst du ihn beim nächsten Mal nicht
                nochmal eingeben.
              </Text>
              <Button title="Schlüssel speichern" onClick={handleStoreKey} />
            </Box>
          )}
        </>
      )}
      {encrypted && (
        <Card mb={3}>
          <Text>
            {encrypted.split('\n').length} verschlüsselte Einträge geladen
          </Text>
        </Card>
      )}
      {encrypted && !owner.privateKey && (
        <>
          <Box>
            <Text>
              Dein privater Schlüssel ist nicht mehr auf deinem Gerät
              gespeichert. Bitte gib ihn jetzt ein:
            </Text>
          </Box>
          <Box mt={3} mb={4} mx={-4}>
            <KeyInput onChange={handleKeyInputChange} />
          </Box>
        </>
      )}
      {encrypted && (
        <Button
          title="Jetzt entschlüsseln"
          disabled={!owner.privateKey && !tmpPrivateKey}
          onClick={handleDecrypt}
        />
      )}
      {result && result.data && (
        <>
          <Text as="h2" fontSize="m" my={3}>
            Entschlüsselter Inhalt
          </Text>
          <ul>
            {result.data.map((row, i) => (
              <Box as="li" key={i} py={2} borderBottom="input">
                {row.join(', ')}
              </Box>
            ))}
          </ul>
        </>
      )}
    </BusinessLayout>
  )
}

export default Decrypt
