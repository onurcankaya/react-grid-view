import { useEffect } from 'react'
import { CgClose } from 'react-icons/cg'
import styled from 'styled-components'

type ModalProps = {
  children: React.ReactElement
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}

export const Modal = ({ children, showModal, setShowModal }: ModalProps) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    if (showModal) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  })

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  const closeModal = (): void => {
    setShowModal(false)
  }

  return (
    <>
      <Backdrop onClick={closeModal} />
      <Wrapper>
        <StyledModal>
          {children}
          <CloseButton onClick={closeModal}>
            <CgClose />
          </CloseButton>
        </StyledModal>
      </Wrapper>
    </>
  )
}

const Backdrop = styled.div`
  background-color: var(--grey-900);
  opacity: 0.5;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
`
const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`
const StyledModal = styled.div`
  width: 80vw;
  height: 80vh;
  background: var(--white);
  z-index: 3;
  border-radius: var(--borderRadius);
  box-shadow: var(--boxShadow);
  display: flex;
  align-items: center;
  justify-content: center;
`
const CloseButton = styled.button`
  font-size: 2rem;
  color: var(--primary-600);
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--borderRadius);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  &:hover {
    border: 1px solid var(--primary-600);
    transition: 0.3s ease-in border;
  }
`
