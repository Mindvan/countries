import styled from 'styled-components'
import { useEffect, useMemo, useState } from 'react'
import type { Country } from '../../entities/country'
import CountryCard from '../../entities/country/ui/CountryCard/CountryCard'
import { CountrySearchForm } from '../../widgets/country-search-form'
import { fetchData } from '../../entities/country/api/countryApi'

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

export const Home = () => {
    const [data, setData] = useState<Country[]>([])
    const [search, setSearch] = useState('')
  
    useEffect(() => {
      fetchData().then((x: Country[]) => setData(x)).catch(console.error);
    }, []);
  
    const filtered = useMemo(() => {
      const str = search.trim().toLowerCase();
      return data.filter(x => x.name.official.toLowerCase().includes(str) || Object.values(x.name.nativeName).some(y => y.official.toLowerCase().includes(str)))
    }, [data, search])

    const obj: Record<string, string> = {};
    data.forEach(x => obj[x.cca3] = x.name.common);

  return (
    <Container>
      <SearchRow>
        <CountrySearchForm value={search} onChange={setSearch} />
      </SearchRow>
      <Main>
        {filtered.length > 0 ? filtered.map((country) => (
          <CountryCard key={country.cca3} data={country}/>
        )) : <div>Страны не найдены</div>}
      </Main>
    </Container>
  )
}