import React, { useEffect } from 'react'
import CustomAutoComplete from '../common/CustomAutoComplete'
import { useProfileStore } from '@/store/profileStore'
import CustomButton from '../common/CustomButton'
import { useAccountStore } from '@/store/accountStore'
import { SuccessResponse } from '@/utils/types'
import { useErrorStore } from '@/store/errorStore'

const LanguagePreference = () => {
  const { languages, getLanguages } = useProfileStore()
  const { profileState, setProfileDetails, updateStudentProfile } = useAccountStore()
  const setAlert = useErrorStore((state) => state.setAlert)

  useEffect(() => {
    ;(async () => {
      await getLanguages()
    })()
  }, [])

  const handleUpdateProfile = async () => {
    const response: SuccessResponse = await updateStudentProfile({
      ...profileState,
    })
    if (response.isSuccess) {
      setAlert({ message: response.message, type: 'success' })
    } else {
      setAlert({ message: response.message, type: 'error' })
    }
  }

  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-10">Language Preferences</h1>
      <CustomAutoComplete
        label="Select Language"
        options={languages.map((language) => ({
          id: language.id,
          name: language.language,
        }))}
        value={
          languages.find((language) => {
            return language.id === profileState.languageOfAccountId
          })?.id
        }
        isLoading={languages.length === 0}
        onChange={(e, value) => {
          if (value) {
            setProfileDetails({ ...profileState, languageOfAccountId: Number(value) })
          }
        }}
      />
      <div className="mt-5">
        <CustomButton onClick={handleUpdateProfile} className="!w-[130px]">
          Save
        </CustomButton>
      </div>
    </div>
  )
}

export default LanguagePreference
