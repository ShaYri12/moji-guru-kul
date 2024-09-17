import React from 'react'
import RegisterTutorLayout from './RegisterTutorLayout'
import CustomInput from '@/components/common/CustomInput'
import { useTutorStore } from '@/store/tutorStore'
import CustomCheckbox from '@/components/common/CustomCheckbox'
import { AgencyTypes, RegisterStudentTypes, TutorSubjectTypes } from '@/utils/types'
import CustomAutoComplete from '@/components/common/CustomAutoComplete'
import FreeSoloField from '@/components/common/FreeSoloField'
import { useEducatorStore } from '@/store/educatorStore'
import MultiSelectField from '@/components/common/MultiSelectField'
import { useAuthStore } from '@/store/authStore'
import { useErrorStore } from '@/store/errorStore'
import { RolesEnum } from '@/utils/enum'

type InitialScreenProps = {
  agencies: AgencyTypes[]
  subjects: TutorSubjectTypes[]
}

const InitialScreen = ({ agencies, subjects }: InitialScreenProps) => {
  const tutor = useTutorStore((state) => state.tutor)
  const setTutor = useTutorStore((state) => state.setTutor)
  const user = useAuthStore((state) => state.user)
  const setAlert = useErrorStore((state) => state.setAlert)

  return (
    <RegisterTutorLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <CustomInput
          label="LinkedIn URL"
          value={tutor.linkedInURL}
          onChange={(e) => {
            setTutor({ ...tutor, linkedInURL: e.target.value })
          }}
          placeholder="Enter your LinkedIn URL"
          error="LinkedIn URL is required"
        />
        <CustomAutoComplete
          label="Select your agency"
          placeholder="Select your agency"
          options={
            agencies.map((agency) => ({
              name: agency.agencyName,
              id: agency.id,
            })) || []
          }
          value={tutor.agencyId}
          onChange={(e, value) => setTutor({ ...tutor, agencyId: value as number })}
          error="Agency is required"
        />
        <MultiSelectField
          label="Select your subjects"
          placeholder="Select your subjects"
          options={subjects?.map((subject) => ({
            id: subject.id,
            name: subject.name,
          }))}
          selectedOptions={tutor.tutorSubjects.map((subject) => subject.subjectId)}
          onChange={(e, value) => {
            if (!user || user.role.toLocaleLowerCase() !== RolesEnum.Educator) {
              setAlert({
                message: 'Please login as an educator to continue',
                type: 'error',
              })
              return
            }
            setTutor({
              ...tutor,
              tutorSubjects: value.map((v) => ({
                tutorId: user?.id,
                subjectId: Number(v),
              })),
            })
          }}
          error="Subject is required"
        />

        <CustomCheckbox
          onChange={(e) => {
            setTutor({ ...tutor, isCoach: e.target.checked })
          }}
          label="I am a coach"
          checked={tutor.isCoach}
        />
      </div>
    </RegisterTutorLayout>
  )
}

export default InitialScreen
