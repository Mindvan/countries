import type { Country } from '../model/types'

export async function fetchData(): Promise<Country[]> {
    const res = await fetch(
      'https://restcountries.com/v4/all?fields=name,cca3,currencies,capital,continents,languages,borders,flag,population,religion',
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json: unknown = await res.json()
    if (!Array.isArray(json)) throw new Error('Expected an array from API')
    return json;
}

export async function fetchCountryByName(name: string): Promise<Country> {
    console.log(name);
    const res = await fetch(
      `https://restcountries.com/v4/name/${name}`,
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json: unknown = await res.json()
    console.log(json);
    if (!Array.isArray(json)) throw new Error('Expected an array from API')
    return json[0];
}

