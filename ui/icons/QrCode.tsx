import * as React from 'react'
import { Box, BoxProps } from '@ui/base'

type QrCodeProps = BoxProps

const QrCode: React.FC<QrCodeProps> = (props) => {
  return (
    <Box
      as="svg"
      width="24px"
      height="24px"
      viewBox="0 0 512 512"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0v170h170V0H0zm130 130H40V40h90v90z" />
      <path d="M65 65h40v40H65z" />
      <path d="M342 0v170h170V0H342zm130 130h-90V40h90v90z" />
      <path d="M407 65h40v40h-40z" />
      <path d="M0 342v170h170V342H0zm130 130H40v-90h90v90z" />
      <path d="M65 407h40v40H65z" />
      <path d="M40 197h40v40H40z" />
      <path d="M120 277v-40H80v40h39v40h40v-40z" />
      <path d="M280 77h40v40h-40z" />
      <path d="M200 40h40v77h-40z" />
      <path d="M240 0h40v40h-40z" />
      <path d="M240 117v40h-40v40h80v-80z" />
      <path d="M280 355v-39h-40v-79h-40v80h40v39h40v39h80v-40z" />
      <path d="M280 197h40v80h-40z" />
      <path d="M472 236v-39h-73v40h-39v40h40v39h112v-80h-40zm0 40h-72v-39h72v39z" />
      <path d="M472 355h40v80h-40z" />
      <path d="M320 277h40v40h-40z" />
      <path d="M360 395h40v40h-40z" />
      <path d="M400 355h40v40h-40z" />
      <path d="M400 435v77h40v-37h32v-40z" />
      <path d="M200 356h40v76h-40z" />
      <path d="M320 472v-40h-80v80h40v-40h39v40h40v-40z" />
      <path d="M120 197h80v40h-80z" />
      <path d="M0 237h40v80H0z" />
    </Box>
  )
}

export default QrCode
