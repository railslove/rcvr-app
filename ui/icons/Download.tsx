import * as React from 'react'
import { Box, BoxProps } from '@ui/base'

type DownloadProps = BoxProps

const Download: React.FC<DownloadProps> = (props) => {
  return (
    <Box
      as="svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      display="block"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Box>
  )
}

export default Download
