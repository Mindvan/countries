import type { Country } from './types'

const countryNameByCode: Record<string, string> = {}

export function setCountryNameByCodeMap(countries: Country[]): void {
  for (const country of countries) {
    countryNameByCode[country.cca3] = country.name.common
  }
}

export function getCountryNameByCode(code: string): string | undefined {
  return countryNameByCode[code]
}

export function getContinents(continents: Country[]): string[] {
  const res = new Set(continents.map(x => x.continents[0]))
  return Array.from(res).sort()
}