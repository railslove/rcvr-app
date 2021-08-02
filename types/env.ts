// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace NodeJS {
  interface Process {
    readonly browser: boolean
  }

  interface ProcessEnv {
    readonly NEXT_PUBLIC_BUILD_VARIANT: 'rcvr' | 'health' | 'care'
  }
}
