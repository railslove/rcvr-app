import * as React from 'react'

type UseDelayedLoading = [boolean, (newState: boolean) => void]

export function useDelayedLoading(initial: boolean): UseDelayedLoading {
  const [state, setState] = React.useState(initial)
  const timer = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    return () => clearTimeout(timer.current)
  }, [])

  const setDelayedState = React.useCallback((newState: boolean) => {
    if (newState === true) {
      timer.current = setTimeout(() => setState(newState), 400)
    } else {
      setState(newState)
      clearTimeout(timer.current)
    }
  }, [])

  return [state, setDelayedState]
}
