import React from 'react'
import { GoSearch } from 'react-icons/go'
import styled from 'styled-components'

type SearchProps = {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  query: string
  isLoading?: boolean
}

export const Search = ({
  onInputChange,
  query,
  isLoading = false,
}: SearchProps): JSX.Element => {
  return (
    <Wrapper>
      <Form>
        <GoSearch />
        <Input
          type='text'
          placeholder='Search for images...'
          value={query}
          onChange={onInputChange}
          disabled={isLoading}
        />
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  padding-bottom: 2rem;
`
const Form = styled.form`
  background: var(--white);
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  column-gap: 0.5rem;
  border-radius: var(--borderRadius);
  padding: 1rem;
  box-shadow: var(--boxShadow);
  svg {
    color: var(--grey-600);
    font-size: 1.2rem;
    margin: 0.5rem;
  }
`
const Input = styled.input`
  border-color: transparent;
  padding: 0.5rem;
  font-size: 1rem;
  color: var(--grey-900);
  ::placeholder {
    color: var(--grey-400);
  }
`
