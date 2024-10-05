import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import { useErrorStore } from './errorStore'
import { networkService } from '@/network/NetworkService'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
  maxQuantity: number
  categoryId: number
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
  userId: number | null
  items: CartItem[]
  addresses: Address[]
  currentAddress: Address
  states: State[]
  cities: City[]
  isLoadingStates: boolean
  isLoadingCities: boolean
  setUserId: (userId: number) => void
  fetchStates: () => Promise<void>
  fetchCities: (stateId: number) => Promise<void>
  addItem: (item: CartItem) => Promise<void>
  removeItem: (id: number) => void
  updateItemQuantity: (id: number, quantity: number) => void
  setCurrentAddress: (address: Address) => void
  saveAddress: (address: Address) => Promise<void>
  fetchAddresses: () => Promise<void>
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  validateCoupon: (couponCode: string) => Promise<any>
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      userId: null,
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
      setUserId: (userId) => set({ userId }),
      addItem: async (item) => {
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
        })

        // Call the API to add the order
        try {
          const response = await networkService.post({
            url: 'https://devapi.nukulum.com/api/shop/add-order',
            data: {
              id: 0,
              extraName: item.name,
              isCompleted: false,
              quantity: item.quantity,
              price: item.price,
              itemId: item.id,
              itemCategoryId: item.categoryId,
            },
          })

          if (response.status !== 200) {
            throw new Error('Failed to add order to API')
          }

          // You can handle the API response here if needed
          console.log('Order added successfully:', response.data)
        } catch (error) {
          console.error('Error adding order to API:', error)
          // You may want to handle this error, perhaps by showing a notification to the user
        }
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateItemQuantity: async (id, quantity) => {
        console.log('Updating item quantity:', id, quantity)
        try {
          const item = get().items.find((i) => i.id === id)
          if (!item) throw new Error('Item not found')

          // Update item quantity in the cart
          set((state) => ({
            items: state.items.map((i) => (i.id === id ? { ...i, quantity: Math.min(quantity, i.maxQuantity) } : i)),
          }))

          const response = await networkService.post({
            url: 'https://devapi.nukulum.com/api/shop/add-order',
            data: {
              id: 0,
              extraName: item.name,
              isCompleted: false,
              quantity: quantity,
              price: item.price,
              itemId: item.id,
              itemCategoryId: item.categoryId,
            },
          })

          if (response.status !== 200) {
            throw new Error('Failed to update order quantity')
          }

          console.log('Order quantity updated successfully:', response.data)
        } catch (error) {
          console.error('Error updating item quantity:', error)
          // Revert the cart update if the API call fails
          const originalItem = get().items.find((i) => i.id === id)
          if (originalItem) {
            set((state) => ({
              items: state.items.map((i) => (i.id === id ? { ...i, quantity: originalItem.quantity } : i)),
            }))
          }
          throw error
        }
      },
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
      validateCoupon: async (couponCode: string) => {
        const userId = get().userId
        if (!userId) {
          useErrorStore.getState().setAlert({ message: 'User not logged in', type: 'error' })
          return null
        }
        try {
          const response = await networkService.get({
            url: `/discount/validate-coupon/${userId}/${couponCode}`,
          })
          if (response.isSuccess) {
            return response.returnObject
          } else {
            useErrorStore.getState().setAlert({ message: response.message || 'Invalid coupon', type: 'error' })
            return null
          }
        } catch (error) {
          console.error('Error validating coupon:', error)
          useErrorStore.getState().setAlert({ message: 'Error validating coupon', type: 'error' })
          return null
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        userId: state.userId,
        items: state.items,
        addresses: state.addresses,
        currentAddress: state.currentAddress,
        states: state.states,
        cities: state.cities,
      }),
    }
  )
)
