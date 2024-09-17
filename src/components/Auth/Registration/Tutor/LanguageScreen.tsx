'use client'
import React from 'react'
import RegisterTutorLayout from './RegisterTutorLayout'
import { LanguageResponseTypes } from '@/utils/types'
import CustomAutoComplete from '@/components/common/CustomAutoComplete'
import { useTutorStore } from '@/store/tutorStore'
import { LANGUAGE_LEVELS } from '@/utils/constants'

type LanguageAndQuestionsScreenProps = {
  languages: LanguageResponseTypes[]
}

const LanguageAndQuestionsScreen = ({ languages }: LanguageAndQuestionsScreenProps) => {
  // const tutor = useTutorStore((state) => state.tutor)
  // const setTutor = useTutorStore((state) => state.setTutor)

  const userFirstLanguage = useTutorStore((state) => state.userFirstLanguage)
  const userSecondLanguage = useTutorStore((state) => state.userSecondLanguage)
  const userThirdLanguage = useTutorStore((state) => state.userThirdLanguage)

  const setUserFirstLanguage = useTutorStore((state) => state.setUserFirstLanguage)
  const setUserSecondLanguage = useTutorStore((state) => state.setUserSecondLanguage)
  const setUserThirdLanguage = useTutorStore((state) => state.setUserThirdLanguage)

  console.log('userFirstLanguage', userFirstLanguage)
  console.log('userSecondLanguage', userSecondLanguage)
  console.log('userThirdLanguage', userThirdLanguage)

  return (
    <RegisterTutorLayout>
      <div className="w-full max-w-[700px] flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          <div className="md:flex gap-5 items-center">
            <CustomAutoComplete
              label="Select First Language"
              placeholder="Select your first language"
              options={
                languages.map((language) => ({
                  id: language.id,
                  name: language.language,
                })) || []
              }
              value={userFirstLanguage.languageId}
              onChange={(e, value) => {
                setUserFirstLanguage({
                  languageId: value as number,
                  languageLevel: LANGUAGE_LEVELS.indexOf(LANGUAGE_LEVELS[0]),
                })
              }}
              error="Language is required"
            />
            <CustomAutoComplete
              label="Select Language Level"
              placeholder="Select your language level"
              options={LANGUAGE_LEVELS.map((level, index) => ({ id: index, name: level }))}
              value={userFirstLanguage.languageLevel}
              onChange={(e, value) => {
                setUserFirstLanguage({
                  languageId: userFirstLanguage.languageId,
                  languageLevel: value as number,
                })
              }}
            />
          </div>
          <div className="md:flex gap-5 items-center">
            <CustomAutoComplete
              label="Select Second Language"
              placeholder="Select your second language"
              options={
                languages.map((language) => ({
                  id: language.id,
                  name: language.language,
                })) || []
              }
              value={userSecondLanguage.languageId}
              onChange={(e, value) => {
                setUserSecondLanguage({
                  languageId: value as number,
                  languageLevel: LANGUAGE_LEVELS.indexOf(LANGUAGE_LEVELS[0]),
                })
              }}
              error="Language is required"
            />
            <CustomAutoComplete
              label="Select Language Level"
              placeholder="Select your language level"
              options={LANGUAGE_LEVELS.map((level, index) => ({ id: index, name: level }))}
              value={userSecondLanguage.languageLevel}
              onChange={(e, value) =>
                setUserSecondLanguage({
                  languageId: userSecondLanguage.languageId,
                  languageLevel: value as number,
                })
              }
            />
          </div>
          <div className="md:flex gap-5 items-center">
            <CustomAutoComplete
              label="Select Third Language"
              placeholder="Select your third language"
              options={
                languages.map((language) => ({
                  id: language.id,
                  name: language.language,
                })) || []
              }
              value={userThirdLanguage.languageId}
              onChange={(e, value) => {
                setUserThirdLanguage({
                  languageId: value as number,
                  languageLevel: LANGUAGE_LEVELS.indexOf(LANGUAGE_LEVELS[0]),
                })
              }}
              error="Language is required"
            />
            <CustomAutoComplete
              label="Select Language Level"
              placeholder="Select your language level"
              options={LANGUAGE_LEVELS.map((level, index) => ({ id: index, name: level }))}
              value={userThirdLanguage.languageLevel}
              onChange={(e, value) =>
                setUserThirdLanguage({
                  languageId: userThirdLanguage.languageId,
                  languageLevel: value as number,
                })
              }
            />
          </div>
        </div>
      </div>
    </RegisterTutorLayout>
  )
}

export default LanguageAndQuestionsScreen
