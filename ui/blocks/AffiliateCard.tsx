import * as React from 'react'
import { Affiliate, findAffiliateByCode } from '~lib/api/affiliates'
import { Card } from '~ui/core'

interface Props {
  code: string
}

export const AffiliateCard: React.FC<Props> = ({ code }) => {
  const [affiliate, setAffiliate] = React.useState<Affiliate>(null)

  React.useEffect(() => {
    if (code === undefined) return
    findAffiliateByCode(code)
      .then((affiliate) => setAffiliate(affiliate))
      .catch(() => {
        setAffiliate(null)
      })
  }, [code])

  return affiliate ? (
    <Card style={{ padding: '1em' }}>
      <a href={affiliate.logoLink} target="_blank" rel="noreferrer noopener">
        <img
          alt="affilitate logo"
          style={{ maxWidth: '100%' }}
          src={affiliate.logoUrl}
        ></img>
      </a>
    </Card>
  ) : (
    <></>
  )
}
