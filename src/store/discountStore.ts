import { create } from 'zustand';
import { networkService } from '@/network/NetworkService';
import { persist } from 'zustand/middleware';
import { Card, SuccessResponse } from '@/utils/types';
import { useErrorStore } from './errorStore';

type DiscountStore = {
  loading: boolean;
  cardList: Card[];
  discount: number | null; // Add discount property
  loadingDiscount: boolean; // Add loading state for discount
  getDiscount: (id:Number) => Promise<void>; // Define getDiscount method
};

export const useDiscountStore = create<DiscountStore>()(
  persist(
    (set) => ({
      cardList: [],
      loading: false,
      discount: null, // Initialize discount state
      loadingDiscount: false, // Initialize loadingDiscount state

      getDiscount: async (id:Number) => {
        set({ loadingDiscount: true }); // Set loading state to true
        console.log("Arkammmmm:");

        try {
            //const response: any = await networkService.get({ url: '/profile' })

          const response: any = await networkService.get({ url: `/discount/get-discount-by-type/itmes/${id}` });
          console.log("Fetched discount data:", response.returnObject.percentage);

          // Assuming response.data contains a discount value, update the state
          if (response && response.returnObject && response.returnObject.percentage) {
            set({ discount: response.returnObject.percentage });
          }
          
        } catch (error) {
          console.error("Error fetching discount:", error);
          useErrorStore.getState().setAlert({ message: "Couldn't fetch discount details", type: 'error' });
        } finally {
          set({ loadingDiscount: false }); // Reset loading state
        }
      },
    }),
    {
      name: 'discount-storage',
      partialize: (state) => ({}),
    }
  )
);
