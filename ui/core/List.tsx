import styled from '@emotion/styled'
import { css } from '@styled-system/css'

export const List = styled('ul')(
  css({
    padding: '20px',
    listStyleType: 'disc',
  })
)

export const ListItem = styled('li')(
  css({
    padding: '5px',
  })
)
