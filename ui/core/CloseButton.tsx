import * as React from 'react'
import styled from '@emotion/styled'
import { Icon } from './Icon'
import { css } from '@styled-system/css'
import { Close } from '~ui/svg'

interface CloseButtonProps {
  onClose?: () => void
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <CloseContainer>
      <CloseIcon icon={Close} size={5} onClick={onClose} />
    </CloseContainer>
  )
}

const CloseContainer = styled('div')(
  css({
    position: 'relative',
  })
)

const CloseIcon = styled(Icon)(
  css({
    position: 'absolute',
    right: 0,
  })
)
