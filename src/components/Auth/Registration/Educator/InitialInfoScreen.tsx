import React from 'react'
import CustomInput from '@/components/common/CustomInput'
import CustomAutoComplete from '@/components/common/CustomAutoComplete'
import { GENDER } from '@/utils/constants'
import RegisterEducatorLayout from './RegisterEducatorLayout'
import { useEducatorStore } from '@/store/educatorStore'
import { useErrorStore } from '@/store/errorStore'
import classNames from 'classnames'
import SelectOption from '@/components/common/SelectOption'

const InitialInfoScreen = () => {
  const [countryCode, setCountryCode] = React.useState('+91')

  const educator = useEducatorStore((state) => state.educator)
  const setEducator = useEducatorStore((state) => state.setEducator)
  const { isRequired, invalidEmail, setRequired, setInvalidEmail } = useErrorStore()

  return (
    <RegisterEducatorLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <CustomInput
          label="First Name"
          value={educator.firstName}
          onChange={(e) => {
            if (!/^[a-zA-Z]*$/.test(e.target.value)) return
            setEducator({ ...educator, firstName: e.target.value })
          }}
          placeholder="Enter your first name"
          error="First name is required"
        />
        <CustomInput
          label="Last Name"
          value={educator.lastName}
          onChange={(e) => {
            if (!/^[a-zA-Z]*$/.test(e.target.value)) return
            setEducator({ ...educator, lastName: e.target.value })
          }}
          placeholder="Enter your last name"
          error="Last name is required"
        />
        <CustomInput
          label="Email"
          value={educator.email}
          onChange={(e) => {
            const email = e.target.value
            if (email.split('@').length > 2) return
            if (email.split('@').length > 1 && email.split('@')[1].split('.').length > 2) return
            if (email.length > 50) return
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            if (emailRegex.test(email)) {
              setInvalidEmail(false)
              setRequired(false)
            }
            setEducator({ ...educator, email: e.target.value })
          }}
          placeholder="Enter your email"
          type="email"
          error="Email is required"
          invalidEmail={invalidEmail ? 'Invalid Email Format' : ''}
        />
        <div className="w-full">
          <label className="text-sm font-bold">Phone Number</label>
          <div
            className={classNames('border border-sliver w-full pl-[18px] pr-[14px] flex items-center mt-1 h-11 rounded-2xl', {
              '!border-red-500': !educator.phoneNumber && isRequired,
            })}
          >
            <input
              value={countryCode}
              className="bg-transparent border-none outline-none text-lg font-normal tracking-[-0.15px] leading-5 input-unset text-lite-black w-8"
              onChange={(e) => {}}
            />

            <input
              value={educator.phoneNumber}
              onChange={(e) => {
                // only allow numbers
                if (isNaN(Number(e.target.value))) return
                if (e.target.value.length > 10) return

                setEducator({ ...educator, phoneNumber: e.target.value })
              }}
              type="text"
              className="w-[85%] h-full border-none outline-none text-lg font-normal tracking-[-0.15px] leading-5 input-unset text-lite-black"
              placeholder="Enter your phone number"
            />
          </div>
          {!educator.phoneNumber && isRequired && <p className={classNames('text-xs text-red-500 mt-1')}>Phone number is required</p>}
          {educator.phoneNumber && educator.phoneNumber.length < 10 && (
            <p className={classNames('text-xs text-red-500 mt-1')}>Phone number must be 10</p>
          )}
        </div>
        <SelectOption
          label="Gender"
          options={GENDER.map((x) => ({
            name: x.name,
            value: x.id.toString(),
          }))}
          value={educator?.genderId?.toString() || ''}
          handleChange={(val) => setEducator({ ...educator, genderId: Number(val) })}
          placeholder="Select your gender"
          error="Gender is required"
        />
      </div>
    </RegisterEducatorLayout>
  )
}

export default InitialInfoScreen
