'use client'
import React, { useEffect } from 'react'
import RegisterStudentLayout from './RegisterStudentLayout'
import CustomInput from '@/components/common/CustomInput'
import CustomAutoComplete from '@/components/common/CustomAutoComplete'
import { useStudentStore } from '@/store/studentStore'
import { useErrorStore } from '@/store/errorStore'
import { useLocationStore } from '@/store/locationStore'

const AddressScreen = () => {
  const student = useStudentStore((state) => state.student)
  const setStudent = useStudentStore((state) => state.setStudent)
  const setRequired = useErrorStore((state) => state.setRequired)
  const countries = useLocationStore((state) => state.countries)
  const loading = useLocationStore((state) => state.loading)
  const cities = useLocationStore((state) => state.cities)
  const getCountries = useLocationStore((state) => state.getCountries)
  const getCities = useLocationStore((state) => state.getCities)
  const getState = useLocationStore((state) => state.getState)
  const states = useLocationStore((state) => state.states)

  useEffect(() => {
    setRequired(false)
    handleCountries()
  }, [])

  const handleCountries = async () => {
    await getCountries()
    await getState(student.countryId)
    await getCities({
      countryId: student.countryId,
      stateId: student?.stateId,
    })
  }

  return (
    <RegisterStudentLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <CustomAutoComplete
          label="Country"
          placeholder="Select your country"
          options={countries}
          value={student.countryId}
          onChange={async (e, value) => {
            setStudent({ ...student, countryId: Number(value) })
            await getState(Number(value))
          }}
          error="Country is required"
          isLoading={loading}
        />
        <CustomAutoComplete
          label="State"
          placeholder="Select your state"
          options={states}
          value={student.stateId}
          onChange={async (e, value) => {
            setStudent({ ...student, stateId: Number(value) })
            await getCities({
              countryId: student.countryId,
              stateId: Number(value),
            })
          }}
          error="State is required"
          isLoading={loading}
        />

        <CustomAutoComplete
          label="City"
          placeholder="Select your city"
          options={cities}
          value={student.cityId}
          onChange={(e, value) => setStudent({ ...student, cityId: Number(value) })}
          error="City is required"
          isLoading={loading}
        />
        <CustomInput
          label="Invitation Token"
          value={student.inviteToken}
          onChange={(e) => {
            setStudent({ ...student, inviteToken: e.target.value })
          }}
          placeholder="Enter your invitation token"
        />
      </div>
    </RegisterStudentLayout>
  )
}

export default AddressScreen
