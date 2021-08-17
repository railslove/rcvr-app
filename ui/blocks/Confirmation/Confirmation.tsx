import * as React from 'react'

import { Button, Box, Text, Card, List, ListItem } from '~ui/core'
import { ArrowsRight } from '~ui/anicons'
import useLocaleObject from '~locales/useLocaleObject'
import ConfirmationLocales from '~ui/blocks/Confirmation/Confirmation.locales'

type ConfirmationProps = {
  onSubmit: () => void
}

export const Confirmation: React.FC<ConfirmationProps> = ({ onSubmit }) => {
  const { t } = useLocaleObject(ConfirmationLocales)

  return (
    <Card variant="form" mx={-4}>
      <Text variant="h3" as="h3">
        {t('headline')}
      </Text>
      <Box height={5} />
      <Text>
        <p>{t('message1')}</p>
        <p>{t('message2')}</p>

        <p>{t('symptomsListHeader')}:</p>

        <List>
          <ListItem>{t('symptom1')}</ListItem>
          <ListItem>{t('symptom2')}</ListItem>
          <ListItem>{t('symptom3')}</ListItem>
          <ListItem>{t('symptom4')}</ListItem>
          <ListItem>{t('symptom5')}</ListItem>
          <ListItem>{t('symptom6')}</ListItem>
          <ListItem>{t('symptom7')}</ListItem>
        </List>
      </Text>
      <Box height={5} />
      <Button
        type="button"
        onClick={onSubmit}
        css={{ width: '100%' }}
        right={<ArrowsRight color="green" />}
      >
        {t('continueButtonText')}
      </Button>
    </Card>
  )
}
