import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { queryCache, useMutation } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { checkin as checkinAction } from '~lib/actions'
import { updateCurrentGuest } from '~lib/actions/updateGuest'
import { Checkin } from '~lib/db'
import { Guest } from '~lib/db/guest'
import { useArea } from '~lib/hooks'
import { ArrowsLeft, ArrowsRight, Check, Circle, Thumb } from '~ui/anicons'
import { CheckinDates } from '~ui/blocks/CheckinDates'
import { Loading } from '~ui/blocks/Loading'
import { Onboarding } from '~ui/blocks/Onboarding'
import { Box, Button, Text } from '~ui/core'

interface Props {
  checkins: Checkin[]
  onCheckout: (checkins: Checkin[]) => void
}

export const LastCheckins: React.FC<Props> = ({ checkins, onCheckout }) => {
  const checkin = checkins[0]
  const area = useArea(checkins[0].areaId).data
  const checkedOut = !!checkin.leftAt
  const idRef = React.useRef<string>(uuidv4())
  const [showProxyCheckin, setShowProxyCheckin] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [showEditData, setShowEditData] = React.useState(false)

  const [checkinFn] = useMutation(checkinAction, {
    throwOnError: true,
  })

  const handleEditGuest = (guest, _opts) => {
    setLoading(true)
    updateCurrentGuest(guest).then((_checkin) => {
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

        await checkinFn({ ticket, guest })

        idRef.current = uuidv4() // add a new one for the next
        await queryCache.refetchQueries('checkins')
        setShowProxyCheckin(false)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    },
    [checkin, checkinFn, setShowProxyCheckin, area]
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
      <Text variant="h2">{checkedOut ? 'Checked out' : 'Welcome'}</Text>
      <Box height={1} />
      <Text variant="h4">{checkin.business}</Text>
      {checkins.length > 1 && (
        <>
          <Box height={1} />
          <Text variant="h4">{checkins.length} Personen</Text>
        </>
      )}
      <Box height={4} />
      <CheckinDates from={checkin.enteredAt} to={checkin.leftAt} />
      <Box height={2} />
      {checkins
        .map(({ guest }) => guest)
        .filter((guest) => guest != null)
        .map((guest, index) => (
          <GuestDetails key={index}>
            {index > 0 && <Box height={2} />}
            <Text variant="label" as="label">
              Name{' '}
              <Text variant="regular" as="span">
                {guest.name}
              </Text>
            </Text>
            <Box height={1} />
            <Text variant="label" as="label">
              Anschrift{' '}
              <Text variant="regular" as="span">
                {guest.address}, {guest.postalCode}&nbsp;{guest.city}
              </Text>
            </Text>
            <Box height={1} />
            <Text variant="label" as="label">
              Telefon{' '}
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
            >
              Check out
            </Button>
            <Box height={4} />
            <Button
              css={{ width: '100%' }}
              onClick={() => setShowEditData(!showEditData)}
            >
              Deine Daten ändern
            </Button>
            <Box height={4} />
            {showEditData && (
              <Onboarding
                prefilledGuest={checkin.guest}
                onSubmit={handleEditGuest}
                hideRememberMe={true}
                submitButtonValue="Speichern"
              />
            )}
            <Loading show={isLoading} />
            <Box height={8} />
            {showProxyCheckin ? (
              <>
                <Box height={4} />
                <Text variant="h3">Wen willst du mit dir einchecken?</Text>
                <Box height={2} />
                <Onboarding
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
                Person hinzufügen
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
                {area.menuAlias || 'Zusatz-Informationen'}
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
