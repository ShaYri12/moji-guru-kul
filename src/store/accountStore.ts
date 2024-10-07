import { networkService } from '@/network/NetworkService'
import { AccountSettingsEnum } from '@/utils/enum'
import { CityTypes, ProfileTypes, SuccessResponse, UpdateParentProfilePayload, UpdateStudentProfilePayload } from '@/utils/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useErrorStore } from './errorStore'
import { useLocationStore } from './locationStore'

type AccountStore = {
  activeAccountSetting: AccountSettingsEnum
  loading: boolean
  setActiveAccountSetting: (setting: AccountSettingsEnum) => void
  profileDetails: ProfileTypes
  setProfileDetails: (profile: UpdateStudentProfilePayload) => void
  getProfileDetails: () => Promise<ProfileTypes>
  updateStudentProfile: (payload: UpdateStudentProfilePayload) => Promise<SuccessResponse>
  updatePhoneNumber: (phoneNumber: string) => Promise<void>
  profileState: UpdateStudentProfilePayload
  updateParentProfile: (payload: UpdateParentProfilePayload) => Promise<SuccessResponse>
  parentProfileState: UpdateParentProfilePayload
  setParentProfileState: (profile: UpdateParentProfilePayload) => void
  getParentProfileDetails: () => Promise<void>
}

export const useAccountStore = create<AccountStore>()(
  persist(
    (set) => ({
      activeAccountSetting: AccountSettingsEnum.ProfileSettings,
      loading: false,
      profileDetails: {} as ProfileTypes,
      profileState: {
        firstName: '',
        lastName: '',
        countryId: 0,
        cityId: 0,
        genderId: 0,
        languageOfAccountId: 0,
        userId: 0,
        gradeId: 0,
        grade: 0,
      },
      parentProfileState: {
        firstName: '',
        lastName: '',
        countryId: 0,
        cityId: 0,
        genderId: 0,
        languageOfAccountId: 0,
      },

      setActiveAccountSetting: (setting) => {
        set({ activeAccountSetting: setting })
      },
      setProfileDetails: (profile) => {
        set({ profileState: profile })
      },
      setParentProfileState: (profile) => {
        set({ parentProfileState: profile })
      },

      getProfileDetails: async () => {
        set({ loading: true })
        const response: any = await networkService.get({ url: '/profile' })
        
        if (!response) {
          useErrorStore.getState().setAlert({ message: "Couldn't fetch profile settings", type: 'error' })
          set({ loading: false })
          return
        }
        set({ loading: false, profileDetails: response })
        // call country and city api from locationStore
        // const countryId = await useLocationStore
        //   .getState()
        //   .countries.find((country) => country.name.toLocaleLowerCase() === response.country.toString().toLocaleLowerCase())?.id
        // const citiesByCountry: any | CityTypes[] = await useLocationStore.getState().getCitiesByCountry(countryId ? countryId : 0)
        // const cityId = citiesByCountry.find(
        //   (city: CityTypes) => city.name.toLocaleLowerCase() === response.city.toString().toLocaleLowerCase()
        // )?.id
        // set({
        //   profileState: {
        //     firstName: response.firstName,
        //     lastName: response.lastName,
        //     countryId: 0,
        //     cityId: 0,
        //     genderId: response.genderId,
        //     languageOfAccountId: response.languageOfAccountId,
        //     userId: response.id,
        //     gradeId: response.gradeId,
        //     grade: response.grade,
        //   },
        // })
        return response
      },
      updateStudentProfile: async (profilePayload) => {
        set({ loading: true })
        const response: any = await networkService.post({ url: '/profile/update/student', data: profilePayload })
        if (!response) {
          useErrorStore.getState().setAlert({ message: "Couldn't update profile settings", type: 'error' })
          set({ loading: false })
          return
        }
        set({ loading: false })
        set({ profileState: profilePayload })
        return response
      },
      updatePhoneNumber: async (phoneNumber) => {
        set({ loading: true })
        const response: any = await networkService.post({ url: '/profile/change-phonenumber', data: { phoneNumber } })
        if (!response) {
          useErrorStore.getState().setAlert({ message: "Couldn't update phone number", type: 'error' })
          set({ loading: false })
          return
        }
        set({ loading: false })
        return response
      },
      getParentProfileDetails: async () => {
        set({ loading: true })
        const response: any = await networkService.get({ url: '/profile' })
        if (!response) {
          useErrorStore.getState().setAlert({ message: "Couldn't fetch profile settings", type: 'error' })
          set({ loading: false })
          return
        }
        set({ loading: false, profileDetails: response })
        // call country and city api from locationStore
        const countryId = useLocationStore
          .getState()
          .countries.find((country) => country.name.toLocaleLowerCase() === response.country.toString().toLocaleLowerCase())?.id
        const citiesByCountry: any | CityTypes[] = await useLocationStore.getState().getCitiesByCountry(countryId ? countryId : 0)
        const cityId = citiesByCountry.find(
          (city: CityTypes) => city.name.toLocaleLowerCase() === response.city.toString().toLocaleLowerCase()
        )?.id
        set({
          parentProfileState: {
            firstName: response.firstName,
            lastName: response.lastName,
            countryId: countryId ? countryId : 0,
            cityId: cityId ? cityId : 0,
            genderId: response.genderId,
            languageOfAccountId: response.languageOfAccountId,
          },
        })
      },
      updateParentProfile: async (payload) => {
        set({ loading: true })
        const response: any = await networkService.post({ url: '/profile/update/parent', data: payload })
        if (!response) {
          useErrorStore.getState().setAlert({ message: "Couldn't update parent profile", type: 'error' })
          set({ loading: false })
          return
        }
        set({ loading: false })
        return response
      },
    }),
    {
      name: 'account-store',
      //   partialize: (state) => ({}),
    }
  )
  
)
