import React from 'react'
import styled from 'styled-components'

import { Image as ImageProps } from '../types'

import { Image } from './Image'

type ImageListProps = {
  data: ImageProps[]
}

export const ImageList = ({ data }: ImageListProps): JSX.Element => {
  if (!data.length) return <EmptyView>No results found...</EmptyView>

  return (
    <StyledImageList>
      {data.map((item: ImageProps, index: React.Key) => (
        <Image key={index} {...item} />
      ))}
    </StyledImageList>
  )
}

const StyledImageList = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem;
  padding: 2rem 1rem;
`
const EmptyView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  height: 30vw;
`
