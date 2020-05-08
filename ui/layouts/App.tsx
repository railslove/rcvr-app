import * as React from 'react'
import { Box } from '@ui/base'

type AppLayoutProps = {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Box maxWidth="500px" mx="auto">
      {children}
    </Box>
  )
}

export default AppLayout
