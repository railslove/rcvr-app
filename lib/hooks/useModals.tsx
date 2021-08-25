import * as React from 'react'

interface CommonModalProps {
  open: boolean
  onClose: () => void
}
type ModalDefs = {
  [key: string]: React.FC<CommonModalProps & any>
}

export function useModals<T extends ModalDefs, K extends keyof T>(
  modalDefs: T
) {
  const [activeModal, setActiveModal] = React.useState<K | 'none'>('none')
  const [modalData, setModalData] = React.useState<Record<string, unknown>>({})

  const openModal = React.useCallback(
    (name: K, data: Record<string, unknown> = {}) => {
      setActiveModal(name)
      setModalData(data)
    },
    []
  )

  const closeModal = React.useCallback(() => {
    setActiveModal('none')
    setModalData({})
  }, [])

  const modals = React.useMemo(() => {
    return (
      <>
        {Object.keys(modalDefs).map((modalName) => {
          const Modal = modalDefs[modalName]
          const isActive = activeModal === modalName
          return (
            <Modal
              key={modalName}
              open={isActive}
              onClose={closeModal}
              {...(isActive ? modalData : {})}
            />
          )
        })}
      </>
    )
  }, [modalDefs, modalData, activeModal, closeModal])

  return { modals, openModal }
}
