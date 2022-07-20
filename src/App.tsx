import axios, { AxiosError } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { ImageList, Pagination, Search, Spinner } from './components'
import { Image } from './types'

const ITEMS_PER_PAGE = 5

export const App = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<Image[]>([])
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [totalPages, setTotalPages] = useState(0)

  /* Added a 1000ms delay to fetching to simulate a (real) network request */
  const fetchData = async (): Promise<void> => {
    setError('')
    setTimeout(async () => {
      try {
        const response = await axios('./data.json')
        const data = response.data
        setIsLoading(false)
        setData(data)
      } catch (error) {
        const typedError = error as AxiosError
        setError(
          `There was an error while fetching data. ${typedError.message}.`,
        )
        setIsLoading(false)
      }
    }, 1000)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (totalItems > 0) {
      setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE))
    }
  }, [totalItems])

  const gridData = useMemo(() => {
    let newData = data

    if (searchQuery) {
      newData = data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setTotalItems(newData.length)

    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE
    return newData.slice(firstPageIndex, lastPageIndex)
  }, [data, currentPage, searchQuery])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  if (error)
    return (
      <Wrapper>
        <Error>{error}</Error>
      </Wrapper>
    )

  if (isLoading)
    return (
      <Wrapper>
        <Search
          onInputChange={handleInputChange}
          query={searchQuery}
          isLoading={isLoading}
        />
        <Spinner />
      </Wrapper>
    )

  return (
    <Wrapper>
      <div>
        <Search onInputChange={handleInputChange} query={searchQuery} />
        <ImageList data={gridData} />
      </div>
      {totalItems > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 90vw;
  max-width: 1340px;
  height: 100vh;
  padding: 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Error = styled.div`
  background-color: var(--light-red);
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--grey-50);
  border-radius: var(--borderRadius);
`
