import styled from '@emotion/styled'

export const SRText: React.FC<{ children: React.ReactNode }> = styled('div')({
  position: 'absolute',
  height: 1,
  width: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(100%)',
  whiteSpace: 'nowrap',
})
