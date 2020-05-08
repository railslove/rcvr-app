import styled from '@emotion/styled'
import { Box } from '@ui/base'

type FlexProps = {
  direction?: 'row' | 'column'
  align?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch'
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
}

const Flex = styled(Box)((props: FlexProps) => ({
  display: 'flex',
  flexDirection: props.direction,
  alignItems: props.align,
  justifyContent: props.justify,
  flexWrap: props.wrap,
}))

export default Flex
