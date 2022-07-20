import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import hexToRgb from 'hex-rgb'
import noop from 'lodash/noop'

import { PaginationTestIds } from './testIds'

import { Pagination } from './'

describe('Pagination', () => {
  it('should render with correct number of total pages', () => {
    const totalPages = 8

    render(
      <Pagination
        totalPages={totalPages}
        currentPage={1}
        onPageChange={noop}
      />,
    )

    expect(screen.getAllByTestId(PaginationTestIds.PageNumber)).toHaveLength(
      totalPages,
    )
  })

  it('should render the first page correctly', () => {
    render(<Pagination totalPages={4} currentPage={1} onPageChange={noop} />)

    const pageNumbers = screen.getAllByTestId(PaginationTestIds.PageNumber)
    expect(pageNumbers[0]).toHaveTextContent('1')
  })

  it('should render the last page correctly', () => {
    render(<Pagination totalPages={4} currentPage={1} onPageChange={noop} />)

    const pageNumbers = screen.getAllByTestId(PaginationTestIds.PageNumber)
    expect(pageNumbers[pageNumbers.length - 1]).toHaveTextContent('4')
  })

  it('should show the correct current selected page', () => {
    const currentPage = 3

    render(
      <Pagination
        totalPages={4}
        currentPage={currentPage}
        onPageChange={noop}
      />,
    )

    expect(screen.getByText(currentPage.toString())).toHaveStyle(
      `background: ${hexToRgb('#2563eb')}`,
    )
  })

  it('should call the page number with the correct page', () => {
    const fn = jest.fn()

    render(<Pagination totalPages={4} currentPage={1} onPageChange={fn} />)

    userEvent.click(screen.getByText(2))
    expect(fn).toBeCalledWith(2)
  })

  it('should call the correct page when previous page button is clicked', () => {
    const fn = jest.fn()

    render(<Pagination totalPages={4} currentPage={3} onPageChange={fn} />)

    userEvent.click(screen.getByTestId(PaginationTestIds.PrevPageButton))
    expect(fn).toBeCalledWith(2)
  })

  it('should call the correct page when the next page button is clicked', () => {
    const fn = jest.fn()

    render(<Pagination totalPages={4} currentPage={3} onPageChange={fn} />)

    userEvent.click(screen.getByTestId(PaginationTestIds.NextPageButton))
    expect(fn).toBeCalledWith(4)
  })

  it('should disable the previous page button when currentPage is the first one', () => {
    render(<Pagination totalPages={4} currentPage={1} onPageChange={noop} />)

    expect(screen.getByTestId(PaginationTestIds.PrevPageButton)).toBeDisabled()
  })

  it('should disable the next page button when currentPage is the last one', () => {
    render(<Pagination totalPages={4} currentPage={4} onPageChange={noop} />)

    expect(screen.getByTestId(PaginationTestIds.NextPageButton)).toBeDisabled()
  })

  it('should cover edge cases like negative props', () => {
    render(<Pagination totalPages={4} currentPage={-4} onPageChange={noop} />)

    expect(
      screen.queryByTestId(PaginationTestIds.PrevPageButton),
    ).not.toBeInTheDocument()
  })
})
