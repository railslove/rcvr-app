import * as React from 'react'
import Head from 'next/head'
import { isFormal } from '~lib/config'
import { WithOwnerProps, withValidPrivateKey } from '~lib/pageWrappers'

import { Text, Box, ButtonLink, Button } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import { MobileApp } from '~ui/layouts/MobileApp'
import { KeyViewer } from '~ui/blocks/KeyViewer'

const SetupKeysPage: React.FC<WithOwnerProps> = ({ owner }) => {
  const { privateKey } = owner
  const css_inl = '@media print { .no-print{ display: none !important;} }'
  return (
    <MobileApp>
      <Head>
        <title key="title">
          {isFormal ? 'Ihr' : 'Dein'} Schlüssel | recover
        </title>
      </Head>
      <Text as="h2" variant="h2">
        {isFormal ? 'Ihr' : 'Dein'} geheimer Schlüssel
      </Text>
      <Box height={6} />
      <>
        <Text>
          <p>
            <strong>
              {isFormal
                ? 'Es ist sehr wichtig, dass Sie diesen Schlüssel notieren.'
                : 'Es ist sehr wichtig, dass Du diesen Schlüssel notierst.'}
            </strong>
          </p>
          <p className="no-print">
            {isFormal
              ? 'Notieren Sie sich den Schlüssel zum Beispiel auf einem Zettel und verwahren Sie diesen sorgfältig. Sie können auch einen Screenshot machen und diesen abspeichern. Oder Sie speichern den Schlüssel in einem Passwortmanager.'
              : 'Schreib den Schlüssel zum Beispiel auf einen Zettel und verwahre ihn sorgfältig. Oder mach einen Screenshot davon und speichere ihn sicher. Du kannst ihn auch in einem Passwortmanager speichern.'}
          </p>
        </Text>
        <Box height={4} />

        <Box mx={-6}>
          <KeyViewer value={privateKey} />
        </Box>

        <Box height={6} />
        <Text>
          <p className="no-print">
            {isFormal
              ? 'Im nächsten Schritt müssen Sie den Schlüssel eingeben. Damit gehen wir sicher, dass Sie ihn korrekt notiert haben.'
              : 'Im nächsten Schritt musst Du den Schlüssel eingeben. Damit gehen wir sicher, dass Du ihn korrekt notiert hast.'}
          </p>
        </Text>
        <Box height={6} />

        <ButtonLink
          className="no-print"
          href="/business/setup/verify-key-manually"
          right={<ArrowsRight color="green" />}
        >
          Schlüssel prüfen
        </ButtonLink>
        <Button className="no-print" onClick={window.print}>
          Schlüssel drucken
        </Button>
      </>
      <style>{css_inl}</style>
    </MobileApp>
  )
}

export default withValidPrivateKey()(SetupKeysPage)
