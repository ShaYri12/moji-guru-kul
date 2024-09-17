'use client'
import CustomButton from '@/components/common/CustomButton'
import CustomInput from '@/components/common/CustomInput'
import { useAction } from 'next-safe-action/hooks'
import { registerReferral } from '../actions/referral'
import { useErrorStore } from '@/store/errorStore'
import { useState } from 'react'

const Referral = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gradeId, setGradeId] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const { execute: handleRegister } = useAction(registerReferral, {
    onSuccess: (data) => {
      if (data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data.message, type: 'success' })
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setGradeId('')
        setPhoneNumber('')
      }
      if (!data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data?.message as string, type: 'error' })
        console.log(data.data?.data)
      }
    },
  })
  const submitHandler = async (formData: FormData) => {
    if (!firstName || !lastName || !email || !password || !confirmPassword || !gradeId || !phoneNumber) {
      useErrorStore.getState().setAlert({ message: 'All fields are required', type: 'error' })
      return
    }
    if (String(password)?.length < 8) {
      useErrorStore.getState().setAlert({ message: 'Password must be at least 8 characters long', type: 'error' })
      return
    }
    if (String(password) !== String(confirmPassword)) {
      useErrorStore.getState().setAlert({ message: 'Passwords do not match', type: 'error' })
      return
    }
    handleRegister({ firstName, lastName, email, password, confirmPassword, gradeId: +gradeId, phoneNumber })
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold text-center text-indigo mt-10">Join a referral program</h1>
      <form action={submitHandler} className="max-w-[600px] mx-auto flex flex-col gap-3">
        <CustomInput type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
        <CustomInput type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
        <CustomInput type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' />
        <CustomInput type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <CustomInput type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
        <select
          name="gradeId"
          className=" text-lite-black w-full px-4 py-3 shadow-input-shadow !outline-none border rounded-xl"
          value={gradeId}
          onChange={(e) => setGradeId(e.target.value)}
        >
          <option value="1">Grade 1</option>
          <option value="2">Grade 2</option>
          <option value="3">Grade 3</option>
          <option value="4">Grade 4</option>
          <option value="5">Grade 5</option>
          <option value="6">Grade 6</option>
          <option value="7">Grade 7</option>
          <option value="8">Grade 8</option>
          <option value="9">Grade 9</option>
          <option value="10">Grade 10</option>
        </select>
        <CustomInput type="tel" name="phoneNumber" placeholder='phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <CustomButton type="submit">Register</CustomButton>
      </form>
    </div>
  )
}
export default Referral
