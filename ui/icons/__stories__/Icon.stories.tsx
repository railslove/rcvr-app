import * as React from 'react'
import * as Icon from '@ui/icons'

export default {
  component: Icon,
  title: 'Icons',
  decorators: [
    (story) => (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {story()}
      </div>
    ),
  ],
}

export const CircleCheck = () => <Icon.CircleCheck />
