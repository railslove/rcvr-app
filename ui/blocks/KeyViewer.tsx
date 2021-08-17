import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'

import { base64ToHex } from '~lib/crypto'
import { Text, Box } from '~ui/core'
import useLocaleAsync from '~locales/useLocaleAsync'

interface Props {
  value: string
}

export const KeyViewer: React.FC<Props> = ({ value }) => {
  const hex = React.useMemo(() => base64ToHex(value), [value])
  const groups = React.useMemo(() => hex.match(/.{1,2}/g), [hex])
  const { t } = useLocaleAsync('ui/blocks/KeyViewer')

  return (
    <div>
      <Box px={6} mb={4}>
        <Text>
          {t('yourKeyIs')}{' '}
          <strong>
            {hex.length} {t('characters')}
          </strong>{' '}
          {t('long')}.
          <br />
          {t('itCointains')} <strong>{t('0to9')}</strong> {t('andLettersFrom')}{' '}
          <strong>{t('AtoF')}</strong>.
        </Text>
      </Box>
      <RowGrid>
        {groups.map((group, i) => (
          <Cell key={i}>
            {group}
            <Small>{i + 1}</Small>
          </Cell>
        ))}
      </RowGrid>
    </div>
  )
}

const RowGrid = styled('div')(
  css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  })
)

const Cell = styled('div')(
  css({
    position: 'relative',
    px: 6,
    pt: 4,
    pb: 8,
    fontFamily: 'monospace',
    fontSize: '18px',
    bg: 'white',
    borderColor: 'bluegrey.50',
    borderWidth: 0,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderStyle: 'solid',
  })
)

const Small = styled('div')(
  css({
    fontSize: 'xs',
    fontWeight: 'regular',
    color: 'bluegrey.100',
    userSelect: 'none',
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
    textAlign: 'center',
  })
)
