import styled from 'styled-components'
import { useEffect, useMemo, useState } from 'react'
import {
  setCountryNameByCodeMap,
  type Country,
} from '../../entities/country'
import CountryCard from '../../entities/country/ui/CountryCard/CountryCard'
import { CountrySearchForm } from '../../widgets/country-search-form'
import { fetchData } from '../../entities/country/api/countryApi'
import { getContinents } from '../../entities/country/model/countryNameByCode'

const SearchRow = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  align-content: start;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SortRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
`

const SortButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: var(--color-hover-bg);
    border-color: var(--color-border);
    color: var(--color-text);
  }
`

const ContinentSelect = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
`

const SearchSortRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`

export const Home = () => {
  const [data, setData] = useState<Country[]>([])
  const [search, setSearch] = useState('')
  const [sortedType, setSortedType] = useState<'asc' | 'desc'>('asc')
  const [continents, setContinents] = useState<string[]>([])
  const [selectedContinent, setSelectedContinent] = useState('')

  useEffect(() => {
    fetchData()
      .then((x: Country[]) => {
        setData(x)
        setCountryNameByCodeMap(x)
        setContinents(getContinents(x))
      })
      .catch(console.error)
  }, [])

  const filtered = useMemo(() => {
    const str = search.trim().toLowerCase()
    return [...data].filter(
      (x) =>
        (selectedContinent === '' || x.continents.includes(selectedContinent)) &&
        (x.name.official.toLowerCase().includes(str) ||
          (x.name.nativeName &&
            Object.values(x.name.nativeName).some((y) =>
              y.official.toLowerCase().includes(str),
            ))),
    )
  }, [data, search, selectedContinent])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) =>
      sortedType === 'asc'
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common),
    )
  }, [filtered, sortedType])

  return (
    <Container>
      <SearchSortRow>
        <SearchRow>
          <CountrySearchForm value={search} onChange={setSearch} />
        </SearchRow>
        <SortRow>
          <ContinentSelect
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
          >
            <option value="">Все континенты</option>
            {continents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </ContinentSelect>
          <SortButton onClick={() => setSortedType('asc')}>
            По возрастанию
          </SortButton>
          <SortButton onClick={() => setSortedType('desc')}>
            По убыванию
          </SortButton>
        </SortRow>
      </SearchSortRow>
      <Main>
        {sorted.length > 0 ? (
          sorted.map((country) => (
            <CountryCard key={country.cca3} data={country} />
          ))
        ) : (
          <div>Страны не найдены</div>
        )}
      </Main>
    </Container>
  )
}