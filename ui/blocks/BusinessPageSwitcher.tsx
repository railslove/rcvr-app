import * as React from 'react'
import Link from 'next/link'
import { Flex, Box, Text } from '@ui/base'

type BusinessPageSwitcherProps = {
  companyId: string
  active: 'areas' | 'tickets'
}

const BusinessPageSwitcher: React.FC<BusinessPageSwitcherProps> = ({
  companyId,
  active,
}) => {
  return (
    <Flex mb={4}>
      <Box mr={2}>
        <Link
          href="/business/company/[companyId]/areas"
          as={`/business/company/${companyId}/areas`}
        >
          <a>
            <Text
              as="span"
              fontWeight={active === 'areas' && 'bold'}
              borderBottom={active === 'areas' && 'activePage'}
              p={1}
            >
              Bereiche verwalten
            </Text>
          </a>
        </Link>
      </Box>

      <Box>
        <Link
          href="/business/company/[companyId]/tickets"
          as={`/business/company/${companyId}/tickets`}
        >
          <a>
            <Text
              as="span"
              fontWeight={active === 'tickets' && 'bold'}
              borderBottom={active === 'tickets' && 'activePage'}
              p={1}
            >
              Daten anfragen
            </Text>
          </a>
        </Link>
      </Box>
    </Flex>
  )
}

export default BusinessPageSwitcher
