'use client'

import React, { useEffect } from 'react'
import RegisterStudentLayout from './RegisterStudentLayout'
import CustomInput from '@/components/common/CustomInput'
import CustomAutoComplete from '@/components/common/CustomAutoComplete'
import { useStudentStore } from '@/store/studentStore'
import { useErrorStore } from '@/store/errorStore'
import { GENDER } from '@/utils/constants'
import classNames from 'classnames'

const InitialStudentInfo = () => {
  const [countryCode, setCountryCode] = React.useState('+91')

  const student = useStudentStore((state) => state.student)
  const syllabuses = useStudentStore((state) => state.syllabuses)
  const setStudent = useStudentStore((state) => state.setStudent)
  const setRequired = useErrorStore((state) => state.setRequired)
  const getSyllabuses = useStudentStore((state) => state.getSyllabuses)
  const isRequired = useErrorStore((state) => state.isRequired)

  useEffect(() => {
    setRequired(false)
    ;(async () => {
      await getSyllabuses()
    })()
  }, [])

  return (
    <RegisterStudentLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <CustomInput
          label="First Name"
          value={student.firstName}
          onChange={(e) => {
            setStudent({ ...student, firstName: e.target.value })
          }}
          placeholder="Enter your first name"
          error="First name is required"
        />
        <CustomInput
          label="Last Name"
          value={student.lastName}
          onChange={(e) => {
            setStudent({ ...student, lastName: e.target.value })
          }}
          placeholder="Enter your last name"
          error="Last name is required"
        />
        <CustomInput
          label="Email"
          value={student.email}
          onChange={(e) => {
            setStudent({ ...student, email: e.target.value })
          }}
          placeholder="Enter your email"
          type="email"
          error="Email is required"
        />
        <div className="w-full">
          <label className="text-sm font-bold">Phone Number</label>
          <div
            className={classNames('border border-sliver w-full pl-[18px] pr-[14px] flex items-center mt-1 h-11 rounded-2xl', {
              '!border-red-500': !student.phoneNumber && isRequired,
            })}
          >
            <input
              value={countryCode}
              className="bg-transparent border-none outline-none text-lg font-normal tracking-[-0.15px] leading-5 input-unset text-lite-black w-8"
            />

            <input
              value={student.phoneNumber}
              onChange={(e) => {
                // only allow numbers
                if (isNaN(Number(e.target.value))) return
                if (e.target.value.length > 10) return

                setStudent({ ...student, phoneNumber: e.target.value })
              }}
              type="text"
              className="w-[85%] h-full border-none outline-none text-lg font-normal tracking-[-0.15px] leading-5 input-unset text-lite-black"
              placeholder="Enter your phone number"
            />
          </div>
          {!student.phoneNumber && isRequired && <p className={classNames('text-xs text-red-500 mt-1')}>Phone number is required</p>}
          {student.phoneNumber && student.phoneNumber.length < 10 && (
            <p className={classNames('text-xs text-red-500 mt-1')}>Phone number must be 10</p>
          )}
        </div>
        {/* <CustomInput
          label="Phone Number"
          value={student.phoneNumber}
          onChange={(e) => {
            //  add limit to 10 digit number
            if (e.target.value.length > 10) return
            setStudent({ ...student, phoneNumber: e.target.value })
            // set +91 as default
            // if (e.target.value.length === 0) {
            //   setStudent({ ...student, phoneNumber: '+91' })
            //   return
            // }
            // setStudent({ ...student, phoneNumber: e.target.value })
          }}
          placeholder="Enter your phone number"
          type="tel"
          error="Phone number is required"
        /> */}
        <CustomAutoComplete
          label="Gender"
          placeholder="Select your gender"
          options={GENDER}
          value={student.genderId}
          onChange={(e, value) => setStudent({ ...student, genderId: Number(value) })}
          error="Gender is required"
        />
        <CustomAutoComplete
          label="Syllabus"
          placeholder="Select your syllabus"
          options={syllabuses}
          value={student.syllabusId}
          onChange={(e, value) => setStudent({ ...student, syllabusId: Number(value) })}
          error="Syllabus is required"
        />
      </div>
    </RegisterStudentLayout>
  )
}

export default InitialStudentInfo
