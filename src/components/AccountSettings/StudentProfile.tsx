'use client'
import { useAccountStore } from '@/store/accountStore'
import React, { useEffect } from 'react'
import CustomInput from '../common/CustomInput'
import CustomAutoComplete from '../common/CustomAutoComplete'
import CustomButton from '../common/CustomButton'
import { useLocationStore } from '@/store/locationStore'
import { CityTypes, CountryTypes, SuccessResponse } from '@/utils/types'
import { useAuthStore } from '@/store/authStore'
import { GENDER, GRADES } from '@/utils/constants'
import { useErrorStore } from '@/store/errorStore'
import { AccountSettingsEnum } from '@/utils/enum'

const StudentProfile = () => {
  const { user } = useAuthStore()
  const { profileDetails, setProfileDetails, profileState } = useAccountStore()
  const { citiesByCountry, getCitiesByCountry } = useLocationStore()
  const { setAlert } = useErrorStore()
  const countries = useLocationStore((state) => state.countries)
  const { setActiveAccountSetting } = useAccountStore()

  const handleUpdateProfile = async () => {
    if (!user) {
      setAlert({ message: 'User not found', type: 'error' })
      return
    }
    if (
      !profileState.firstName ||
      !profileState.lastName ||
      !profileState.countryId ||
      !profileState.cityId ||
      !profileState.gradeId ||
      !profileState.grade
      // !profileState.languageOfAccountId
    ) {
      setAlert({ message: 'All fields are required', type: 'error' })
      return
    }

    setActiveAccountSetting(AccountSettingsEnum.LanguagePreferences)
    return

    // update phone number
    // await updatePhoneNumber(profileDetails.phoneNumber)

    // const response: SuccessResponse = await updateStudentProfile({
    //   firstName: profileState.firstName,
    //   lastName: profileState.lastName,
    //   countryId: profileState.countryId,
    //   cityId: profileState.cityId,
    //   gradeId: profileState.gradeId,
    //   grade: profileState.grade,
    //   languageOfAccountId: profileState.languageOfAccountId,
    //   genderId: profileState.genderId,
    //   userId: user?.id,
    // })
    // setAlert({ message: response.message, type: 'success' })
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-medium">My Profile</h3>
      <div className="w-3/4 mt-8 flex flex-col gap-4">
        <CustomInput
          label="First Name"
          value={profileState.firstName}
          onChange={(e) => {
            setProfileDetails({ ...profileState, firstName: e.target.value })
          }}
        />
        <CustomInput
          label="Last Name"
          value={profileState.lastName}
          onChange={(e) => {
            setProfileDetails({ ...profileState, lastName: e.target.value })
          }}
        />
        {/* <CustomInput
          label="Phone Number"
          type="tel"
          value={profileDetails.phoneNumber}
          onChange={(e) => {
            setProfileDetails({ ...profileDetails, phoneNumber: e.target.value })
          }}
        /> */}
        <CustomAutoComplete
          label="Country"
          placeholder="Select your country"
          options={countries}
          value={profileState.countryId}
          onChange={async (e, value) => {
            if (value) {
              setProfileDetails({ ...profileState, countryId: Number(value) })
              await getCitiesByCountry(Number(value))
            }
          }}
          error="Country is required"
          isLoading={countries.length === 0}
        />
        <CustomAutoComplete
          label="City"
          placeholder="Select your city"
          options={citiesByCountry}
          value={profileState.cityId}
          onChange={(e, value) => setProfileDetails({ ...profileState, cityId: Number(value) })}
          error="City is required"
          isLoading={
            citiesByCountry.length === 0 ||
            !countries?.find((country) => country.name.toLocaleLowerCase() === profileDetails.country.toString().toLocaleLowerCase())
          }
        />
        <CustomAutoComplete
          label="Gender"
          placeholder="Select your gender"
          options={GENDER}
          value={profileState.genderId}
          onChange={(e, value) => setProfileDetails({ ...profileState, genderId: Number(value) })}
          error="Gender is required"
        />
        <CustomAutoComplete
          label="Grade"
          placeholder="Select your gender"
          options={GRADES}
          value={profileState.gradeId}
          onChange={(e, value) => {
            setProfileDetails({ ...profileState, grade: Number(value), gradeId: Number(value) })
          }}
          error="Grade is required"
        />
        {/* <CustomInput
          label="Language Of Account Id"
          type="number"
          value={profileState.languageOfAccountId?.toString()}
          onChange={(e) => {
            setProfileDetails({ ...profileState, languageOfAccountId: Number(e.target.value) })
          }}
        /> */}
      </div>
      <div className="mt-5">
        <CustomButton onClick={handleUpdateProfile} className="!w-[130px]">
          Next
        </CustomButton>
      </div>
    </div>
  )
}

export default StudentProfile
