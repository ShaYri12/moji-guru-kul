import { AlertTypeEnums } from '@/utils/enum'
import { AlertTypes } from '@/utils/types'
import { create } from 'zustand'

type ErrorStore = {
  isRequired: boolean
  setRequired: (isRequired: boolean) => void
  error: AlertTypes
  setAlert: (error: AlertTypes) => void
  notify: boolean
  setNotify: (notify: boolean) => void
  invalidEmail: boolean
  setInvalidEmail: (invalidEmail: boolean) => void
}

const alertInitialState: AlertTypes = {
  message: '',
  type: AlertTypeEnums.Success,
}

export const useErrorStore = create<ErrorStore>((set) => ({
  isRequired: false,
  setRequired: (isRequired) => set({ isRequired }),
  error: alertInitialState,
  setAlert: (error) => set({ error: error }),
  notify: false,
  setNotify: (notify) => set({ notify }),
  invalidEmail: false,
  setInvalidEmail: (invalidEmail) => set({ invalidEmail }),
}))
