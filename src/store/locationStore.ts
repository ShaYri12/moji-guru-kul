import { create } from 'zustand'
import { networkService } from '@/network/NetworkService'
import { CityTypes, CountryTypes, StateTypes } from '@/utils/types'
import { useErrorStore } from './errorStore'

type LocationStore = {
  countries: CountryTypes[]
  getCountries: () => Promise<CountryTypes[]>
  states: StateTypes[]
  getState: (countryId: number) => void
  cities: CityTypes[]
  getCities: ({ countryId, stateId }: { countryId: number; stateId?: number }) => void
  loading: boolean
  citiesByCountry: CityTypes[]
  getCitiesByCountry: (countryId: number) => void
}

export const useLocationStore = create<LocationStore>((set) => ({
  countries: [],
  states: [],
  cities: [],
  loading: false,
  citiesByCountry: [],
  getCountries: async () => {
    set({ loading: true })
    const response: any = await networkService.get({ url: '/countries' })
    set({ loading: false })
    if (!response) return useErrorStore.getState().setAlert({ message: 'Error in fetching countries', type: 'error' })
    set({ countries: response })
    return response
  },
  getState: async (countryId: number) => {
    set({ loading: true })
    const response: any = await networkService.get({ url: `/states/${countryId}` })
    set({ loading: false })
    if (!response) return useErrorStore.getState().setAlert({ message: 'Error in fetching states', type: 'error' })
    set({ states: response })
    return response
  },
  getCities: async ({ countryId, stateId }: { countryId: number; stateId?: number }) => {
    set({ loading: true })
    const response: any = await networkService.get({ url: `/cities/${countryId}/${stateId}` })
    set({ loading: false })
    if (!response) return useErrorStore.getState().setAlert({ message: 'Error in fetching cities', type: 'error' })
    set({ cities: response })
    return response
  },
  getCitiesByCountry: async (countryId: number) => {
    set({ loading: true })
    const response: any = await networkService.get({ url: `/cities/${countryId}` })
    const cities: CityTypes[] = response
    set({ loading: false })
    if (!response) return useErrorStore.getState().setAlert({ message: 'Error in fetching cities', type: 'error' })
    set({ citiesByCountry: response })
    return cities
  },
}))
