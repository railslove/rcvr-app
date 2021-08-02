import * as React from 'react'

import { Text, Box, Button } from '~ui/core'
import { ModalBase, ModalBaseProps } from '~ui/blocks/ModalBase'
import { useRouter } from 'next/router'

interface Props {
  returnUrl: string
  title: string
  text: string
}
type MProps = ModalBaseProps & Props

export const RedirectModal: React.FC<MProps> = (props) => {
  const router = useRouter()
  return (
    <ModalBase {...props} maxWidth={400} title={props.title}>
      <Text>
        <p> {props.text} </p>
      </Text>
      <Box height={6} />
      <Button
        onClick={() => router.push(props.returnUrl)}
        css={{ width: '100%' }}
      >
        Okay
      </Button>
    </ModalBase>
  )
}
