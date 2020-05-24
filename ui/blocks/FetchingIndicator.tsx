import * as React from 'react'
import { css } from '@styled-system/css'
import { useIsFetching } from 'react-query'
import { motion, AnimatePresence } from 'framer-motion'
import styled from '@emotion/styled'

import { Icon } from '@ui/core'
import ArrowRefresh from '@ui/svg/arrow-refresh.svg'

export const FetchingIndicator: React.FC<{}> = () => {
  const isFetching = useIsFetching()

  return (
    <AnimatePresence>
      {isFetching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Base
            animate={{ rotate: -360 }}
            transition={{ loop: Infinity, ease: 'linear', duration: 0.8 }}
          >
            <Icon size={4} color="white" icon={ArrowRefresh} />
          </Base>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Base = styled(motion.div)(
  css({
    bg: 'bluegrey.400',
    size: 6,
    my: -3,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
)
