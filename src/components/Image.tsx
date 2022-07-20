import { KeyboardEvent, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { Image as ImageProps } from '../types'

import { Modal } from './'

/**
 * Setting span height to a small value like 10 to not over allocate too many rows
 * to an individual image, so that images in the grid system can fit together more nicely.
 */
const SPAN_HEIGHT = 10

type StyledImageProps = {
  spans?: number
}

export const Image = ({ description, imagePath }: ImageProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false)
  const [spans, setSpans] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)

  /** Adding an event listener on load to calculate each image height. */
  useLayoutEffect(() => {
    imageRef.current?.addEventListener('load', handleSetSpans)
    return () => {
      imageRef.current?.removeEventListener('load', handleSetSpans)
    }
  })

  /**
   * Calculating the height of each image and then calculating the number of spans
   * for each image using the image height and the span height to make `grid-row-end`
   * span styling more dynamic.
   */
  const handleSetSpans = (): void => {
    const height = imageRef.current?.clientHeight
    const spans = height && Math.ceil(height / SPAN_HEIGHT)
    spans && setSpans(spans)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLImageElement>): void => {
    if (e.key === 'Enter') {
      openModal()
    }
  }

  const openModal = (): void => {
    setShowModal(true)
  }

  return (
    <>
      <StyledImage
        src={imagePath}
        alt={`${description} image`}
        ref={imageRef}
        tabIndex={0}
        spans={spans}
        onClick={openModal}
        onKeyDown={handleKeyDown}
      />
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <ModalImage src={imagePath} alt={`${description} image`} />
        </Modal>
      )}
    </>
  )
}

const StyledImage = styled.img<StyledImageProps>`
  width: 300px;
  display: grid;
  grid-row-end: ${({ spans }) => `span ${spans}`};
  border-radius: var(--borderRadius);
  &:hover {
    cursor: zoom-in;
    opacity: 0.9;
    transition: var(--transition);
  }
`
const ModalImage = styled.img`
  height: 70%;
  border-radius: var(--borderRadius);
`
