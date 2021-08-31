import * as React from 'react'

import { Text, Box, Button, Row } from '~ui/core'
import { Circle, Check } from '~ui/anicons'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import useLocaleObject from '~locales/useLocaleObject'
import SubscribedModalLocales from '~ui/modals/SubscribedModal.locales'

export const SubscribedModal: React.FC<ModalBaseProps> = (props) => {
  const { t } = useLocaleObject(SubscribedModalLocales)

  return (
    <ModalBase {...props} maxWidth={400} title={t('title')}>
      <Text>
        <p>{t('message1')}</p>
        <Row justifyContent="center" my={8}>
          <Circle animated delay={0.5} color="green">
            <Check delay={0.8} css={{ position: 'relative', top: 2 }} />
          </Circle>
        </Row>
        <p>{t('message2')}</p>
      </Text>
      <Box height={6} />
      <Button onClick={props.onClose} css={{ width: '100%' }}>
        {t('close')}
      </Button>
    </ModalBase>
  )
}
