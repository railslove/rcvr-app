/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
  const value: React.FC<JSX.IntrinsicElements['svg']>
  export default value
}
