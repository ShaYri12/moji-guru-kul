'use client'

import { useAccountStore } from '@/store/accountStore'
import { ACCOUNT_SETTINGS, PARENT_ACCOUNT_SETTINGS } from '@/utils/constants'
import { AccountSettingsEnum, RolesEnum } from '@/utils/enum'
import React, { useEffect, useState } from 'react'
import StudentProfile from './StudentProfile'
import { useAuthStore } from '@/store/authStore'
import ParentProfile from './ParentProfile'
import ConnectedChildren from './ConnectedChildren'
import { useErrorStore } from '@/store/errorStore'
import LanguagePreference from './LanguagePreference'
import { useLocationStore } from '@/store/locationStore'
import { CityTypes, CountryTypes, ProfileTypes } from '@/utils/types'

const AccountSettings = () => {
  const user = useAuthStore((state) => state.user)
  const { activeAccountSetting, profileState, setProfileDetails, setActiveAccountSetting, getProfileDetails } = useAccountStore()
  const getCountries = useLocationStore((state) => state.getCountries)
  const setAlert = useErrorStore((state) => state.setAlert)

  const [activeSettings, setActiveSettings] = useState<{ id: number; title: string }[]>()

  useEffect(() => {
    if (user?.role.toLocaleLowerCase() === RolesEnum.Parent) {
      setActiveSettings(PARENT_ACCOUNT_SETTINGS)
    } else {
      setActiveSettings(ACCOUNT_SETTINGS)
    }
    ;(async () => {
      const profileResponse: ProfileTypes = await getProfileDetails()
      const countries: CountryTypes[] = await getCountries()
      const countryId = countries.find(
        (country) => country.name.toLocaleLowerCase() === profileResponse.country.toString().toLocaleLowerCase()
      )?.id
      const citiesByCountry: any | CityTypes[] = await useLocationStore.getState().getCitiesByCountry(countryId ? countryId : 0)
      const cityId = citiesByCountry.find(
        (city: CityTypes) => city.name.toLocaleLowerCase() === profileResponse.city.toString().toLocaleLowerCase()
      )?.id

      setProfileDetails({
        ...profileState,
        firstName: profileResponse.firstName,
        lastName: profileResponse.lastName,
        genderId: profileResponse.genderId,
        languageOfAccountId: profileResponse.languageOfAccountId,
        userId: profileResponse.id,
        gradeId: profileResponse.gradeId,
        grade: profileResponse.grade,
        countryId: countryId ? countryId : 0,
        cityId: cityId ? cityId : 0,
      })
    })()
  }, [user])

  const getActiveProfile = (role: string) => {
    switch (role) {
      case RolesEnum.Student:
        return <StudentProfile />
      case RolesEnum.Parent:
        return <ParentProfile />
      default:
        return null
    }
  }

  const getActiveAccountSetting = (setting: AccountSettingsEnum) => {
    if (!user) return <div>Profile not found</div>
    switch (setting) {
      case AccountSettingsEnum.ProfileSettings:
        return <div>{getActiveProfile(user?.role.toLocaleLowerCase())}</div>
      case AccountSettingsEnum.ConnectedChildren:
        return <ConnectedChildren />
      case AccountSettingsEnum.LanguagePreferences:
        return <LanguagePreference />
      default:
        return null
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <h1 className="text-3xl font-semibold">Account Settings</h1>
        <div className="flex flex-col gap-8 mt-10">
          {activeSettings &&
            activeSettings.map((item) => (
              <p
                key={item.id}
                className="underline underline-offset-4 text-base font-light cursor-pointer"
                onClick={() => {
                  setActiveAccountSetting(item.id)
                }}
              >
                {item.title}
              </p>
            ))}
        </div>
      </div>
      {getActiveAccountSetting(activeAccountSetting)}
    </div>
  )
}

export default AccountSettings
