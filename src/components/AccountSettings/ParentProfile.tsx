'use client'
import { useAccountStore } from '@/store/accountStore'
import React, { useEffect, useState } from 'react'
import CustomInput from '../common/CustomInput'
import CustomAutoComplete from '../common/CustomAutoComplete'
import CustomButton from '../common/CustomButton'
import { useLocationStore } from '@/store/locationStore'
import { CityTypes, CountryTypes, SearchStudentTypes, SuccessResponse } from '@/utils/types'
import { useAuthStore } from '@/store/authStore'
import { GENDER, GRADES } from '@/utils/constants'
import { useParentStore } from '@/store/parentStore'
import { useErrorStore } from '@/store/errorStore'
import SelectOption from '../common/SelectOption'

const ParentProfile = () => {
  const [searchStudent, setSearchStudent] = useState('')

  const { user } = useAuthStore()
  const { profileDetails, setParentProfileState, getParentProfileDetails, updateParentProfile, updatePhoneNumber, parentProfileState } =
    useAccountStore()
  const { citiesByCountry, getCitiesByCountry } = useLocationStore()
  const { setAlert } = useErrorStore()
  const getCountries = useLocationStore((state) => state.getCountries)
  const countries = useLocationStore((state) => state.countries)
  const getConnectedChildren = useParentStore((state) => state.getConnectedChildren)
  const searchStudents = useParentStore((state) => state.searchStudents)
  const searchStudentList = useParentStore((state) => state.searchStudentList)
  const addChildToParent = useParentStore((state) => state.addChildToParent)

  useEffect(() => {
    getParentProfileDetails()
    getCountriesList()
    getConnectedChildren()
  }, [])

  const getCountriesList = async () => {
    const countriesResponse: any = await getCountries()
    if (!countriesResponse) {
      setAlert({ message: 'Error in fetching countries', type: 'error' })
      return countriesResponse
    }
    return countriesResponse
  }

  const handleUpdateProfile = async () => {
    if (!user) {
      setAlert({ message: 'User not found', type: 'error' })
      return
    }
    if (
      !parentProfileState.firstName ||
      !parentProfileState.lastName ||
      !parentProfileState.countryId ||
      !parentProfileState.cityId ||
      !parentProfileState.genderId ||
      !parentProfileState.languageOfAccountId
    ) {
      setAlert({ message: 'All fields are required', type: 'error' })
      return
    }
    // update phone number
    // await updatePhoneNumber(profileDetails.phoneNumber)

    const response: SuccessResponse = await updateParentProfile({
      firstName: parentProfileState.firstName,
      lastName: parentProfileState.lastName,
      countryId: parentProfileState.countryId,
      cityId: parentProfileState.cityId,
      languageOfAccountId: parentProfileState.languageOfAccountId,
      genderId: parentProfileState.genderId,
    })
    setAlert({ message: response.message, type: 'success' })
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-medium">My Profile</h3>
      <div className="w-3/4 mt-8 flex flex-col gap-4">
        <CustomInput
          label="First Name"
          value={parentProfileState.firstName}
          onChange={(e) => {
            if (!/^[a-zA-Z]*$/.test(e.target.value)) return
            setParentProfileState({ ...parentProfileState, firstName: e.target.value })
          }}
        />
        <CustomInput
          label="Last Name"
          value={parentProfileState.lastName}
          onChange={(e) => {
            if (!/^[a-zA-Z]*$/.test(e.target.value)) return
            setParentProfileState({ ...parentProfileState, lastName: e.target.value })
          }}
        />

        <CustomAutoComplete
          label="Country"
          placeholder="Select your country"
          options={countries}
          value={parentProfileState.countryId}
          onChange={async (e, value) => {
            if (value) {
              setParentProfileState({ ...parentProfileState, countryId: Number(value) })
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
          value={parentProfileState.cityId}
          onChange={(e, value) => setParentProfileState({ ...parentProfileState, cityId: Number(value) })}
          error="City is required"
          isLoading={
            citiesByCountry.length === 0 ||
            !countries.find((country) => country.name.toLocaleLowerCase() === profileDetails.country.toString().toLocaleLowerCase())
          }
        />
        {/* <CustomAutoComplete
          label="Gender"
          placeholder="Select your gender"
          options={GENDER}
          value={parentProfileState.genderId}
          onChange={(e, value) => setParentProfileState({ ...parentProfileState, genderId: Number(value) })}
          error="Gender is required"
        /> */}
        <SelectOption
          label="Gender"
          options={GENDER.map((x) => ({
            name: x.name,
            value: x.id.toString(),
          }))}
          value={parentProfileState?.genderId?.toString() || ''}
          handleChange={(val) => setParentProfileState({ ...parentProfileState, genderId: Number(val) })}
          placeholder="Select your gender"
          error="Gender is required"
        />
        <CustomInput
          label="Language Of Account Id"
          type="number"
          value={parentProfileState.languageOfAccountId?.toString()}
          onChange={(e) => {
            setParentProfileState({ ...parentProfileState, languageOfAccountId: Number(e.target.value) })
          }}
        />
        <div className="flex justify-between items-end gap-5">
          <CustomInput
            label="Search Child"
            type="search"
            value={searchStudent}
            onChange={(e) => {
              setSearchStudent(e.target.value)
            }}
          />
          <CustomButton
            onClick={() => {
              // add check searchStudent should be email
              //   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
              if (!searchStudent) return setAlert({ message: 'Please enter email', type: 'error' })
              searchStudents(searchStudent)
            }}
            className="!w-[90px] !h-10"
          >
            Search
          </CustomButton>
        </div>
        <div>
          {searchStudentList && searchStudentList.length
            ? searchStudentList.map((student: SearchStudentTypes) => (
                <div key={student.studentId} className="flex justify-between items-center border-b border-gray-300 py-2">
                  <p>{student.studentId}</p>
                  <p>{student.name}</p>
                  <p>{student.email}</p>
                  <CustomButton onClick={() => addChildToParent([student.studentId])} className="!w-[90px] !h-10">
                    Add
                  </CustomButton>
                </div>
              ))
            : ''}
        </div>
      </div>
      <div className="mt-5">
        <CustomButton onClick={handleUpdateProfile} className="!w-[130px]">
          Save
        </CustomButton>
      </div>
    </div>
  )
}

export default ParentProfile
