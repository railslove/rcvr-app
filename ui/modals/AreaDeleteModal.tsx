import * as React from 'react'

import { Text, Box, Button } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import RecoverTeamEmailLink from '~ui/core/Link/RecoverTeamEmailLink'
import useLocaleObject from '~locales/useLocaleObject'

import areaDeleteModalLocales from './AreaDeleteModal.locales'

export const AreaDeleteModal: React.FC<ModalBaseProps> = (props) => {
  const { t } = useLocaleObject(areaDeleteModalLocales)

  return (
    <ModalBase {...props} maxWidth={400} title={t('title')}>
      <Text>
        <p>
          {t('message')} <RecoverTeamEmailLink />.
        </p>
      </Text>
      <Box height={6} />
      <Button onClick={props.onClose} css={{ width: '100%' }}>
        {t('close')}
      </Button>
    </ModalBase>
  )
}
