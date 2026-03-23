import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCountryByName } from '../../entities/country/api/countryApi'
import type { Country } from '../../entities/country/model/types'

const Page = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 1.25rem 5rem;
`

const Hero = styled.section`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: minmax(160px, 220px) 1fr;
  align-items: start;
  margin-bottom: 1.75rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const FlagBox = styled.div`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgb(15 23 42 / 6%);
`

const FlagImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
`

const CountryName = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: #0f172a;
`

const NativeNames = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.0;
`

const CodeBadge = styled.span`
  display: inline-block;
  margin-top: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;
  background: #f1f5f9;
  border-radius: 6px;
  width: fit-content;
`

const DetailsGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const InfoCard = styled.div`
  padding: 0.875rem 1rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 1px 2px rgb(15 23 42 / 5%);
`

const InfoLabel = styled.div`
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 0.4rem;
`

const InfoValue = styled.div`
  font-size: 0.9rem;
  color: #0f172a;
  line-height: 1.5;
`

const LoadingText = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: #64748b;
`

const EmptyText = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: #64748b;
`

function formatList(items: string[] | undefined, emptyLabel: string): string {
  if (!items?.length) return emptyLabel
  return items.join(', ')
}

export const CountryInfo = () => {
  const { name } = useParams()
  const [country, setCountry] = useState<Country | undefined>()

  useEffect(() => {
    if (!name) return
    fetchCountryByName(name)
      .then((data: Country) => setCountry(data))
      .catch(console.error)
  }, [name])

  if (!name) {
    return (
      <Page>
        <EmptyText>Не указана страна в адресе.</EmptyText>
      </Page>
    )
  }

  if (!country) {
    return (
      <Page>
        <LoadingText>Загрузка…</LoadingText>
      </Page>
    )
  }

  const nativeNamesLine =
    Object.values(country.name.nativeName).map((l) => l.official).join(', ') || '-'

  const languagesLine =
    country.languages?.map((l) => l.name).join(', ') || '-'

  const religionLine =
    country.religion?.map((r) => r.name).join(', ') || '-'

  return (
    <Page>
      <Hero>
        <FlagBox>
          <FlagImg
            src={country.flag.png}
            alt={country.flag.alt}
            loading="lazy"
          />
        </FlagBox>
        <TitleBlock>
          <CountryName>{country.name.common}</CountryName>
          <NativeNames>{nativeNamesLine}</NativeNames>
          <CodeBadge>{country.cca3}</CodeBadge>
        </TitleBlock>
      </Hero>

      <DetailsGrid>
        <InfoCard>
          <InfoLabel>Столица</InfoLabel>
          <InfoValue>
            {formatList(country.capital, '—')}
          </InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Континент</InfoLabel>
          <InfoValue>
            {formatList(country.continents, '—')}
          </InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Языки</InfoLabel>
          <InfoValue>{languagesLine}</InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Границы</InfoLabel>
          <InfoValue>
            {formatList(country.borders, 'Нет сухопутных границ')}
          </InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Население</InfoLabel>
          <InfoValue>
            {country.population.toLocaleString('ru-RU')} чел.
          </InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Религии</InfoLabel>
          <InfoValue>{religionLine}</InfoValue>
        </InfoCard>
      </DetailsGrid>
    </Page>
  )
}
