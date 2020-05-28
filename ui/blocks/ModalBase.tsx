import * as React from 'react'
import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'
import { css } from '@styled-system/css'
import { useClickAway } from 'react-use'

import { Text, Box, Icon } from '~ui/core'
import { Loading } from '~ui/blocks/Loading'
import { Close } from '~ui/svg'

interface Props {
  maxWidth?: string | number
  loading?: boolean
  title?: string
}
export interface ModalBaseProps {
  open?: boolean
  onClose: () => void
  children: React.ReactNode
}

export const ModalBase: React.FC<ModalBaseProps & Props> = ({
  open,
  onClose,
  children,
  maxWidth,
  loading,
  title,
  ...rest
}) => {
  const ref = React.useRef()
  const close = React.useCallback(() => {
    if (loading) return
    onClose()
  }, [loading, onClose])
  useClickAway(ref, close)

  React.useEffect(() => {
    if (open) document.body.classList.add('no-scroll')
    if (!open) document.body.classList.remove('no-scroll')
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          css={{ pointerEvents: open ? 'initial' : 'none' }}
        >
          <ModalBox
            ref={ref}
            {...rest}
            css={{ maxWidth }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <Loading show={loading} />
            <Box
              as="button"
              display="flex"
              position="absolute"
              left={5}
              top={5}
              size={6}
              alignItems="center"
              justifyContent="center"
              onClick={close}
            >
              <Icon icon={Close} size={5} color="bluegrey.300" />
            </Box>
            {title && (
              <Box px={10}>
                <Text variant="h3" textAlign="center">
                  {title}
                </Text>
                <Box height={6} />
              </Box>
            )}
            {children}
          </ModalBox>
        </Overlay>
      )}
    </AnimatePresence>
  )
}

const Overlay = styled(motion.div)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  zIndex: 500,
  backdropFilter: 'blur(2px)',
  overflow: 'auto',
})

const ModalBox = styled(motion.div)(
  css({
    width: '100%',
    maxWidth: '600px',
    position: 'relative',
    m: 3,
    mt: [5, 20],
    p: 6,
    bg: 'white',
    borderColor: 'bluegrey.300',
    boxShadow:
      '0px 1px 3px 0px rgba(0,0,0,0.1) , 0px 1px 2px 0px rgba(0,0,0,0.06)',
    borderRadius: '12px',
    overflow: 'hidden',
  })
)
