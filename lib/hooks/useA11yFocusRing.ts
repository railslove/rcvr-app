import * as React from 'react'

export function useA11yFocusRing(): void {
  React.useEffect(() => {
    function handleFirstTab(e: KeyboardEvent) {
      if (e.keyCode === 9) {
        document.body.classList.add('user-is-tabbing')
      }
    }

    function handleMouseDown() {
      document.body.classList.remove('user-is-tabbing')
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('keydown', handleFirstTab)

    return () => {
      window.removeEventListener('keydown', handleFirstTab)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])
}
