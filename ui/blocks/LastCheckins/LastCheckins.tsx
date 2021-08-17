import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { checkin as checkinAction } from '~lib/actions'
import { updateCurrentGuest } from '~lib/actions/updateGuest'
import { generateCwaLink } from '~lib/cwa/generateCwaLink'
import { Checkin } from '~lib/db'
import { Guest } from '~lib/db/guest'
import { useArea } from '~lib/hooks'
import { ArrowsLeft, ArrowsRight, Check, Circle, Thumb } from '~ui/anicons'
import { CheckinDates } from '~ui/blocks/CheckinDates'
import { Loading } from '~ui/blocks/Loading'
import { Onboarding } from '~ui/blocks/Onboarding/Onboarding'
import { Box, Button, ButtonLink, Text } from '~ui/core'
import CwaLogo from '~ui/svg/logo-cwa.svg'

import useLocaleObject from '~locales/useLocaleObject'
import LastCheckinsLocales from '~ui/blocks/LastCheckins/LastCheckins.locales'

interface Props {
  checkins: Checkin[]
  onCheckout: (checkins: Checkin[]) => void
}

export const LastCheckins: React.FC<Props> = ({ checkins, onCheckout }) => {
  const [checkin] = checkins

  const { t } = useLocaleObject(LastCheckinsLocales)
  const area = useArea(checkins[0].areaId).data
  const checkedOut = !!checkin.leftAt
  const idRef = React.useRef<string>(uuidv4())
  const [showProxyCheckin, setShowProxyCheckin] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [showEditData, setShowEditData] = React.useState(false)

  const queryClient = useQueryClient()

  const mutation = useMutation(checkinAction)

  const handleEditGuest = (guest, _opts) => {
    setLoading(true)
    updateCurrentGuest(queryClient, guest).then((_checkin) => {
      setLoading(false)
      setShowEditData(false)
    })
  }

  const proxyCheckin = React.useCallback(
    async (guest: Guest) => {
      const id = idRef.current

      try {
        setLoading(true)

        const ticket = {
          ...checkin,
          id,
          publicKey: area.publicKey,
          encryptedData: null,
          proxyCheckin: true,
          enteredAt: new Date(),
        }

        await mutation.mutateAsync({ ticket, guest })

        idRef.current = uuidv4() // add a new one for the next
        await queryClient.invalidateQueries('checkins')
        setShowProxyCheckin(false)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    },
    [checkin, setShowProxyCheckin, area, queryClient, mutation]
  )

  return (
    <Container>
      <Box height={16} />
      <Circle animated delay={0.5} color={checkedOut ? 'pink' : 'green'}>
        {checkedOut ? (
          <Thumb delay={0.8} />
        ) : (
          <Check delay={0.8} css={{ position: 'relative', top: 2 }} />
        )}
      </Circle>
      <Box height={4} />
      <Text variant="h2">
        {checkedOut ? t('header_checkedOut') : t('header')}
      </Text>
      <Box height={1} />
      <Text variant="h4" data-wfd-location={checkin.business}>
        {checkin.business}
      </Text>
      {checkins.length > 1 && (
        <>
          <Box height={1} />
          <Text variant="h4">
            {checkins.length} {t('people')}
          </Text>
        </>
      )}
      <Box height={4} />
      <CheckinDates from={checkin.enteredAt} to={checkin.leftAt} />
      {!checkedOut && checkin.cwaLinkEnabled && checkin.cwaSeed && (
        <>
          <Box height={4} />
          <ButtonLink
            href={generateCwaLink(checkin)}
            target="_blank"
            name="cwaCheckinUrl"
          >
            <CwaLink>
              <CwaLogo width="24" height="24" />
              {t('CWALinkText')}
            </CwaLink>
          </ButtonLink>
          <Box height={4} />
        </>
      )}
      <Box height={2} />
      {checkins
        .map(({ guest }) => guest)
        .filter((guest) => guest != null)
        .map((guest, index) => (
          <GuestDetails key={index}>
            {index > 0 && <Box height={2} />}
            <Text variant="label" as="label">
              {t('name')}{' '}
              <Text variant="regular" as="span">
                {guest.name}
              </Text>
            </Text>
            <Box height={1} />
            <Text variant="label" as="label">
              {t('address')}{' '}
              <Text variant="regular" as="span">
                {guest.address}, {guest.postalCode}&nbsp;{guest.city}
              </Text>
            </Text>
            <Box height={1} />
            <Text variant="label" as="label">
              {t('telephone')}{' '}
              <Text variant="regular" as="span">
                {guest.phone}
              </Text>
            </Text>
            <Box height={1} />
          </GuestDetails>
        ))}
      <AnimatePresence>
        {!checkin.leftAt && (
          <motion.div
            css={{ width: '100%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box height={8} />
            <Button
              css={{ width: '100%' }}
              left={<ArrowsRight color="pink" />}
              right={<ArrowsLeft color="pink" />}
              onClick={() => onCheckout(checkins)}
              dataAttributes={{ 'wfd-action': 'check-out' }}
            >
              {t('checkOutButtonText')}
            </Button>
            <Box height={4} />
            <Button
              css={{ width: '100%' }}
              onClick={() => setShowEditData(!showEditData)}
            >
              {t('changeYourDataButtonText')}
            </Button>
            <Box height={4} />
            {showEditData && (
              <Onboarding
                area={area}
                onSubmit={handleEditGuest}
                hideRememberMe={true}
                prefilledGuest={checkin.guest}
                submitButtonValue={t('onboardingButtonText')}
              />
            )}
            <Loading show={isLoading} />
            <Box height={8} />
            {showProxyCheckin ? (
              <>
                <Box height={4} />
                <Text variant="h3">{t('checkInMorePeopleHeadline')}</Text>
                <Box height={2} />
                <Onboarding
                  area={area}
                  prefilledGuest={{
                    address: checkin.guest?.address,
                    postalCode: checkin.guest?.postalCode,
                    city: checkin.guest?.city,
                    phone: checkin.guest?.phone,
                  }}
                  hideRememberMe={true}
                  onSubmit={proxyCheckin}
                  onAbort={() => setShowProxyCheckin(false)}
                />
              </>
            ) : (
              <Button
                css={{ width: '100%', marginTop: '10px' }}
                onClick={() => setShowProxyCheckin(true)}
              >
                {t('addPersonButtonText')}
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!checkin.leftAt && area?.menuLink && (
          <motion.div
            css={{ width: '100%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box height={4} />
            <a href={area.menuLink} target="_blank" rel="noopener noreferrer">
              <Button as="div" css={{ width: '100%' }}>
                {area.menuAlias || t('additionalInfoLinkText')}
              </Button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  )
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const GuestDetails = styled.div({
  width: '100%',
})

const CwaLink = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})
