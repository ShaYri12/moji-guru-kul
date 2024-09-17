'use client'

import React, { useState } from 'react'
import CustomInput from '../common/CustomInput'
import CustomButton from '../common/CustomButton'
import classNames from 'classnames'
import { useErrorStore } from '@/store/errorStore'
import { GRADES } from '@/utils/constants'
import { GradeTypes } from '@/utils/types'
import { useAmbassadorStore } from '@/store/ambassadorStore'
import { useRouter } from 'next/navigation'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  gradeId: 0,
  phoneNumber: '',
}

const AmbassadorRegistration = () => {
  const router = useRouter()

  const [state, setState] = useState(initialState)
  const [countryCode, setCountryCode] = useState('+91')

  const isRequired = useErrorStore((state) => state.isRequired)
  const errorState = useErrorStore((state) => state)
  const { createAmbassador, loading } = useAmbassadorStore()

  //! Handle error
  const handleError = () => {
    if (!state.firstName) {
      errorState.setRequired(true)
      return false
    }
    if (!state.lastName) {
      errorState.setRequired(true)
      return false
    }
    if (!state.email) {
      errorState.setRequired(true)
      return false
    }
    if (!state.password) {
      errorState.setRequired(true)
      return false
    }
    if (!state.confirmPassword) {
      errorState.setRequired(true)
      return false
    }
    if (state.password !== state.confirmPassword) {
      errorState.setRequired(true)
      setState({ ...state, confirmPassword: '' })
      return false
    }
    if (!state.phoneNumber) {
      errorState.setRequired(true)
      return false
    }
    if (state.password !== state.confirmPassword) {
      errorState.setRequired(true)
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    const isError = handleError()
    if (!isError) return
    const response = await createAmbassador(state)
    if (response.isSuccess) {
      setState(initialState)
      router.push('/ambassador/login')
    }
  }

  return (
    <div>
      <div className="px-5 w-full max-w-[600px] m-auto flex flex-col gap-7 mt-10">
        <div className="flex flex-col lg:flex-row gap-5">
          <CustomInput
            label="First Name"
            placeholder="Enter your first name"
            value={state.firstName}
            onChange={(e) => setState({ ...state, firstName: e.target.value })}
            error="First name is required"
          />
          <CustomInput
            label="Last Name"
            placeholder="Enter your last name"
            value={state.lastName}
            onChange={(e) => setState({ ...state, lastName: e.target.value })}
            error="Last name is required"
          />
        </div>
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          error="Email is required"
        />
        <div className="flex flex-col lg:flex-row gap-5">
          <CustomInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
            error="Password is required"
          />
          <CustomInput
            label="Confirm Password"
            placeholder="Enter your password"
            type="password"
            value={state.confirmPassword}
            onChange={(e) => setState({ ...state, confirmPassword: e.target.value })}
            error={state.password !== state.confirmPassword ? 'Password does not match' : 'Confirm Password is required'}
          />
        </div>
        <div className="w-full">
          <label className="text-sm font-bold">Phone Number</label>
          <div
            className={classNames('border border-sliver w-full pl-[18px] pr-[14px] flex items-center mt-1 h-11 rounded-2xl', {
              '!border-red-500': !state.phoneNumber && isRequired,
            })}
          >
            <input
              value={countryCode}
              className="bg-transparent border-none outline-none text-lg font-normal tracking-[-0.15px] leading-5 input-unset text-lite-black w-8"
            />

            <input
              value={state.phoneNumber}
              onChange={(e) => {
                // only allow numbers
                if (isNaN(Number(e.target.value))) return
                if (e.target.value.length > 10) return

                setState({ ...state, phoneNumber: e.target.value })
              }}
              type="text"
              className="w-[85%] h-full border-none outline-none text-lg font-normal tracking-[-0.15px] leading-5 input-unset text-lite-black"
              placeholder="Enter your phone number"
            />
          </div>
          {!state.phoneNumber && isRequired && <p className={classNames('text-xs text-red-500 mt-1')}>Phone number is required</p>}
          {state.phoneNumber && state.phoneNumber.length < 10 && (
            <p className={classNames('text-xs text-red-500 mt-1')}>Phone number must be 10</p>
          )}
        </div>
        <div>
          <label className="inline-block text-sm font-bold mb-1">Select most Relevant Grade</label>
          <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
            {GRADES.map((grade: GradeTypes) => (
              <div
                key={grade.id}
                onClick={() => setState({ ...state, gradeId: grade.id })}
                className={classNames(
                  'shadow-grade-box rounded-lg bg-white h-[70px] w-full flex justify-center items-center cursor-pointer font-bold text-base border',
                  {
                    '!bg-dark-purple text-white': state.gradeId === grade.id,
                  }
                )}
              >
                {grade.name}
              </div>
            ))}
          </div>
        </div>
        <CustomButton onClick={handleSubmit} loading={loading}>
          Register
        </CustomButton>
      </div>
    </div>
  )
}

export default AmbassadorRegistration
