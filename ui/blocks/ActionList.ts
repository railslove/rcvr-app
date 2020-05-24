import styled from '@emotion/styled'
import { css } from '@styled-system/css'

interface Props {
  grid?: boolean
}
type ActionListHTMLProps = React.HTMLAttributes<any>
type ALProps = ActionListHTMLProps & Props

export const ActionList: React.FC<ALProps> = styled('div')((props: Props) =>
  css({
    display: 'grid',
    gridTemplateColumns: props.grid
      ? 'repeat(auto-fit, minmax(200px, 1fr))'
      : '1fr',
    gridGap: 3,

    '> *': {
      minWidth: 0,
    },
  })
)
