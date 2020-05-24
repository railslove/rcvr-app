import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { Icon, Text, Row, Box } from '@ui/core'

interface Props {
  icon: React.FC
  color?: string
  title?: string
}

type IB = React.FC<JSX.IntrinsicElements['button'] & Props>

export const IconButton: IB = ({ icon, color = 'black', title, ...rest }) => {
  return (
    <ButtonBase {...rest} css={css({ color })}>
      <Row alignItems="center">
        {title && (
          <>
            <Text fontSize="xs" fontWeight="semibold">
              {title}
            </Text>
            <Box width={[2, 2, 1]} />
          </>
        )}
        <Icon size={4} color={color} icon={icon} />
      </Row>
    </ButtonBase>
  )
}

const ButtonBase = styled('button')(
  css({
    p: [3, 3, 2],
    bg: 'bluegrey.10',
    borderRadius: '4px',
    transition: 'all 170ms',

    '&:hover': {
      bg: 'bluegrey.50',
    },
  })
)
