import * as React from 'react'

type CheckProps = {}

const Check: React.FC<CheckProps> = ({ ...rest }) => {
  return (
    <svg
      width="57"
      height="53"
      viewBox="0 0 57 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle
        cx="25.3222"
        cy="25.3222"
        r="24.3222"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.3825 25.8397C16.0724 25.1497 17.191 25.1497 17.8809 25.8397L23.6269 31.5857C24.3169 32.2756 24.3169 33.3942 23.6269 34.0841C22.937 34.774 21.8184 34.774 21.1285 34.0841L15.3825 28.3381C14.6926 27.6482 14.6926 26.5296 15.3825 25.8397Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.227 21.2715C34.9169 21.9614 34.9169 23.08 34.227 23.7699L23.7699 34.227C23.0799 34.9169 21.9613 34.9169 21.2714 34.227C20.5815 33.5371 20.5815 32.4185 21.2714 31.7286L31.7285 21.2715C32.4185 20.5815 33.537 20.5815 34.227 21.2715Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Check
