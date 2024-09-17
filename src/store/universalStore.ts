import { create } from 'zustand'

type UniversalStore = {
  steps: number
  setSteps: (steps: number) => void
  currentStep: number
  setCurrentStep: (currentStep: number) => void
  isSignupPopupOpen: boolean
  setIsSignupPopupOpen: (isOpen: boolean) => void
}

export const useUniversalStore = create<UniversalStore>((set) => ({
  steps: 6,
  setSteps: (steps: number) => set({ steps }),
  currentStep: 1,
  setCurrentStep: (currentStep: number) => set({ currentStep }),
  isSignupPopupOpen: false,
  setIsSignupPopupOpen: (isOpen: boolean) => set({ isSignupPopupOpen: isOpen }),
}))
