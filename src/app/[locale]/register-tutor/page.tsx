import React from 'react'
import RegisterTutor from '@/components/Auth/Registration/Tutor'
import { fetchRequest } from '@/network/FetchRequest'
import { AgencyResponseTypes, LanguageResponseTypes, RegisterStudentTypes, SuccessResponse, TutorSubjectTypes } from '@/utils/types'
import { cookies } from 'next/headers'

async function RegisterTutorPage() {
  const agencies: AgencyResponseTypes = await fetchRequest({ url: 'agencies', method: 'GET' })
  const languages: LanguageResponseTypes[] = await fetchRequest({ url: 'profile/languages-list', method: 'GET' })
  const activeAgencies = agencies.rows.filter((agency) => agency.isActive)
  const token = cookies().get('token')?.value
  const subjects: TutorSubjectTypes[] = await fetchRequest({ url: 'user-categories', method: 'GET' })
  const questions: SuccessResponse = await fetchRequest({ url: 'questionnaire/get-application-question', method: 'GET' })

  return <RegisterTutor agencies={activeAgencies} languages={languages} subjects={subjects} questions={questions.returnObject} />
}

export default RegisterTutorPage
