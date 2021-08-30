import React from 'react'

export const RECOVER_TEAM_EMAIL = 'team@recoverapp.de'

export type RecoverTeamEmailLinkProps = Partial<{
  subject: string
}>

const RecoverTeamEmailLink: React.FC<RecoverTeamEmailLinkProps> = ({
  subject,
  children = RECOVER_TEAM_EMAIL,
}) => {
  return (
    <a
      href={`mailto:${RECOVER_TEAM_EMAIL}${
        subject ? `?subject=${subject}` : ''
      }`}
    >
      {children}
    </a>
  )
}

export default RecoverTeamEmailLink
