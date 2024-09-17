'use client'
import React, { useEffect } from 'react'
import CustomInput from '@/components/common/CustomInput'
import CustomAutoComplete from '@/components/common/CustomAutoComplete'
import { useLocationStore } from '@/store/locationStore'
import RegisterEducatorLayout from './RegisterEducatorLayout'
import { useEducatorStore } from '@/store/educatorStore'
import { useErrorStore } from '@/store/errorStore'

const AddressScreen = () => {
  const educator = useEducatorStore((state) => state.educator)
  const setEducator = useEducatorStore((state) => state.setEducator)
  const setRequired = useErrorStore((state) => state.setRequired)
  const countries = useLocationStore((state) => state.countries)
  const loading = useLocationStore((state) => state.loading)
  const citiesByCountry = useLocationStore((state) => state.citiesByCountry)
  const getCountries = useLocationStore((state) => state.getCountries)
  const getCitiesByCountry = useLocationStore((state) => state.getCitiesByCountry)

  useEffect(() => {
    handleCountries()
  }, [])

  const handleCountries = async () => {
    await getCountries()
    getCitiesByCountry(educator.countryId || 0)
  }

  return (
    <RegisterEducatorLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <CustomAutoComplete
          label="Country"
          placeholder="Select your country"
          options={countries}
          value={educator.countryId}
          onChange={async (e, value) => {
            setEducator({ ...educator, countryId: Number(value) })
            await getCitiesByCountry(Number(value))
          }}
          error="Country is required"
          isLoading={loading}
        />

        <CustomAutoComplete
          label="City"
          placeholder="Select your city"
          options={citiesByCountry}
          value={educator.cityId}
          onChange={(e, value) => setEducator({ ...educator, cityId: Number(value) })}
          error="City is required"
          isLoading={loading}
        />
      </div>
    </RegisterEducatorLayout>
  )
}

export default AddressScreen
