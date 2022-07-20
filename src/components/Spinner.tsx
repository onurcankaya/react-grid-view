import styled from 'styled-components'

import spinner from '../assets/images/spinner.svg'

export const Spinner = (): JSX.Element => {
  return (
    <Wrapper>
      <img src={spinner} alt='spinner' width='100' height='100' />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
