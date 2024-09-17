import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import { useErrorStore } from './errorStore'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
  maxQuantity: number
}

export interface Address {
  id: number
  house: string
  street: string
  city: string
  state: string
  postalCode: string
  fullLocation: string
  roadNearBy: string
  userId: number
}

interface State {
  id: number
  name: string
}

interface City {
  id: number
  name: string
}

interface CartStore {
  items: CartItem[]
  addresses: Address[]
  currentAddress: Address
  states: State[]
  cities: City[]
  isLoadingStates: boolean
  isLoadingCities: boolean
  fetchStates: () => Promise<void>
  fetchCities: (stateId: number) => Promise<void>
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateItemQuantity: (id: number, quantity: number) => void
  setCurrentAddress: (address: Address) => void
  saveAddress: (address: Address) => Promise<void>
  fetchAddresses: () => Promise<void>
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addresses: [],
      currentAddress: {
        id: 0,
        house: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        fullLocation: '',
        roadNearBy: '',
        userId: 0,
      },
      states: [],
      cities: [],
      isLoadingStates: false,
      isLoadingCities: false,
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.maxQuantity) } : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      updateItemQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.id === id ? { ...item, quantity: Math.min(Math.max(quantity, 0), item.maxQuantity) } : item))
            .filter((item) => item.quantity > 0),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      setCurrentAddress: (address) => set({ currentAddress: address }),
      saveAddress: async (address) => {
        try {
          const response = await axios.post('https://devapi.nukulum.com/api/Address/add-edit-address', address)
          if (response.data.isSuccess) {
            set((state) => ({
              addresses: [...state.addresses, response.data.returnObject],
              currentAddress: response.data.returnObject,
            }))
            useErrorStore.getState().setAlert({ message: 'Address saved successfully!', type: 'success' })
          } else {
            throw new Error(response.data.message)
          }
        } catch (error) {
          console.error('Error saving address:', error)
          throw error
        }
      },
      fetchAddresses: async () => {
        try {
          const response = await axios.get('https://devapi.nukulum.com/api/Address/get-addresss')
          if (response.data.isSuccess) {
            set({ addresses: response.data.returnObject })
          } else {
            throw new Error(response.data.message)
          }
        } catch (error) {
          console.error('Error fetching addresses:', error)
          throw error
        }
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      getTotalItems: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.quantity, 0)
      },
      fetchStates: async () => {
        set({ isLoadingStates: true })
        try {
          const response = await axios.get('https://devapi.nukulum.com/api/states/101')
          set({ states: response.data, isLoadingStates: false })
        } catch (error) {
          console.error('Error fetching states:', error)
          set({ isLoadingStates: false })
        }
      },
      fetchCities: async (stateId: number) => {
        set({ isLoadingCities: true })
        try {
          const response = await axios.get(`https://devapi.nukulum.com/api/cities/101/${stateId}`)
          set({ cities: response.data, isLoadingCities: false })
        } catch (error) {
          console.error('Error fetching cities:', error)
          set({ isLoadingCities: false })
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        addresses: state.addresses,
        currentAddress: state.currentAddress,
        states: state.states,
        cities: state.cities,
      }),
    }
  )
)
