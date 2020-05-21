import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import type { TypographyProps, ColorProps } from 'styled-system'
import { compose, color, typography, variant } from 'styled-system'
import type { As } from './'

interface ExtraProps {
  variant?: 'h2' | 'h3' | 'regular' | 'label' | 'fineprint'
  htmlFor?: string
}

type TextHTMLProps = React.HTMLAttributes<any>
type StyledSystemProps = TypographyProps & ColorProps

type TextProps = As & TextHTMLProps & StyledSystemProps & ExtraProps

export const Text: React.FC<TextProps> = styled('div', { shouldForwardProp })(
  compose(typography, color),
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
    },
  }),
  {
    '> p + p': {
      marginTop: '1em',
    },
  }
)

Text.defaultProps = {
  variant: 'regular',
}
