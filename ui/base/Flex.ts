import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { Box } from '@ui/base'

type FlexProps = {
  flexDir?: 'row' | 'column'
  align?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch'
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
}

const Flex = styled(Box, { shouldForwardProp })((props: FlexProps) => ({
  display: 'flex',
  flexDirection: props.flexDir,
  alignItems: props.align,
  justifyContent: props.justify,
  flexWrap: props.wrap,
}))

export default Flex
