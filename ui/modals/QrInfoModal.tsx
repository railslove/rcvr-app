import * as React from 'react'
import { isFormal } from '~lib/config'
import useLocaleObject from '~locales/useLocaleObject'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { Box, Button, Text } from '~ui/core'

import QrInfoModalLocales from './QrInfoModal.locales'

export const QrInfoModal: React.FC<ModalBaseProps> = (props) => {
  const { t } = useLocaleObject(QrInfoModalLocales)
  return (
    <ModalBase {...props} maxWidth={400} title={t('title')}>
      <Text>
        <p>{t('message1')}</p>
        <p>{t('message11')}</p>
      </Text>
      <Box height={4} />
      <Box as="ol" css={{ listStyle: 'decimal' }} pl={5}>
        <Text as="li">
          {isFormal ? (
            <>
              {t('listMessage1')} <strong>care.rcvr.app/qr</strong>{' '}
              {t('listMessage11')}
            </>
          ) : (
            <>
              {t('listMessage2')} <strong>rcvr.app/qr</strong>{' '}
              {t('listMessage22')}
            </>
          )}
          <Box height={2} />
        </Text>
        <Text as="li">
          <strong>{t('listMessage3')}</strong> {t('listMessage33')}
          <Box height={2} />
        </Text>
        <Text as="li">
          <strong>{t('listMessage4')}</strong>, {t('listMessage44')}
          <Box height={2} />
        </Text>
      </Box>
      <Box height={6} />
      <Button onClick={props.onClose} css={{ width: '100%' }}>
        {t('close')}
      </Button>
    </ModalBase>
  )
}
