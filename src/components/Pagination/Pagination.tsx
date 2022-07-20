import { useMemo } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import styled from 'styled-components'

import { PaginationTestIds } from './testIds'

type PaginationProps = {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

type PaginationItemProps = {
  active?: boolean
  disabled?: boolean
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps): JSX.Element | null => {
  const paginationItems = useMemo(() => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
          data-testid={PaginationTestIds.PageNumber}
        >
          {i}
        </PaginationItem>,
      )
    }
    return pages
  }, [totalPages, currentPage])

  /**
   * Checking if totalPages and currentPage prop values are positive integer
   * values to protect against the values that are not positive integers.
   */
  const arePropsValid = (): boolean => {
    const isPositiveInteger = (n: number): boolean =>
      !Number.isNaN(n) && Number.isInteger(n) && n > 0

    return [totalPages, currentPage].every(isPositiveInteger)
  }

  if (totalPages === 0 || !arePropsValid()) return null

  return (
    <Wrapper>
      <PaginationItem
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        data-testid={PaginationTestIds.PrevPageButton}
      >
        <HiOutlineChevronLeft />
      </PaginationItem>
      {paginationItems}
      <PaginationItem
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        data-testid={PaginationTestIds.NextPageButton}
      >
        <HiOutlineChevronRight />
      </PaginationItem>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`
const PaginationItem = styled.button<PaginationItemProps>`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  margin: 0 0.5rem;
  height: 2.5rem;
  color: ${({ active, disabled }) =>
    disabled
      ? 'var(--grey-300)'
      : active
      ? 'var(--white)'
      : 'var(--primary-600)'};
  background: ${({ active }) =>
    active ? 'var(--primary-600)' : 'transparent'};
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: var(--borderRadius);
  &:hover {
    border: ${({ disabled }) =>
      disabled ? '1px solid transparent' : '1px solid var(--primary-600)'};
    transition: 0.3s ease-in border;
  }
`
