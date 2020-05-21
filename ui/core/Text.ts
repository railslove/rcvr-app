import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { css } from '@styled-system/css'
import type { TypographyProps, ColorProps } from 'styled-system'
import { compose, color, typography, variant } from 'styled-system'
import type { As } from './'

interface ExtraProps {
  variant?:
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'regular'
    | 'label'
    | 'fineprint'
    | 'link'
  htmlFor?: string
}

type TextHTMLProps = React.HTMLAttributes<any>
type StyledSystemProps = TypographyProps & ColorProps

type TextProps = As & TextHTMLProps & StyledSystemProps & ExtraProps

export const Text: React.FC<TextProps> = styled('div', { shouldForwardProp })(
  variant({
    variants: {
      h2: {
        fontSize: 'lg',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: 'md',
        fontWeight: 'bold',
      },
      h4: {
        fontSize: 'md',
        fontWeight: 'regular',
      },
      h5: {
        fontSize: 'sm',
        fontWeight: 'bold',
      },
      regular: {
        fontSize: 'sm',
        fontWeight: 'regular',
        lineHeight: 1.4,
      },
      label: {
        fontSize: 'sm',
        fontWeight: 'semibold',
      },
      fineprint: {
        fontSize: 'xs',
        fontWeight: 'regular',
        lineHeight: 1.3,
      },
      link: {
        fontSize: 'xs',
        fontWeight: 'xbold',
        textDecoration: 'underline',
        textTransform: 'uppercase',
      },
    },
  }),
  compose(typography, color),
  css({
    '> p + p': {
      marginTop: '1em',
    },
    '> p a': {
      color: '#226EEC',
      fontWeight: 'semibold',
      textDecoration: 'underline',
    },
  })
)

Text.defaultProps = {
  variant: 'regular',
}
