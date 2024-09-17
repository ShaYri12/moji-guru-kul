import React from 'react'
import RegisterParentLayout from './RegisterParentLayout'
import { useParentStore } from '@/store/parentStore'
import CustomInput from '@/components/common/CustomInput'
import CustomAutoComplete from '@/components/common/CustomAutoComplete'
import { GENDER } from '@/utils/constants'
import FreeSoloField from '@/components/common/FreeSoloField'
import CustomModal from '@/components/common/CustomModal'
import { useModalStore } from '@/store/modalStore'
import classNames from 'classnames'
import { useErrorStore } from '@/store/errorStore'

const InitialInfoScreen = () => {
  const [countryCode, setCountryCode] = React.useState('+91')

  const parent = useParentStore((state) => state.parent)
  const setParent = useParentStore((state) => state.setParent)
  const useModel = useModalStore((state) => state)
  const invalidChildEmails = useParentStore((state) => state.invalidChildEmails)
  const updateChildEmail = useParentStore((state) => state.updateChildEmail)
  const isRequired = useErrorStore((state) => state.isRequired)

  return (
    <RegisterParentLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <CustomInput
          label="First Name"
          value={parent.firstName}
          onChange={(e) => {
            setParent({ ...parent, firstName: e.target.value })
          }}
          placeholder="Enter your first name"
          error="First name is required"
        />
        <CustomInput
          label="Last Name"
          value={parent.lastName}
          onChange={(e) => {
            setParent({ ...parent, lastName: e.target.value })
          }}
          placeholder="Enter your last name"
          error="Last name is required"
        />
        <CustomInput
          label="Email"
          value={parent.email}
          onChange={(e) => {
            setParent({ ...parent, email: e.target.value })
          }}
          placeholder="Enter your email"
          type="email"
          error="Email is required"
        />
        <div className="w-full">
          <label className="text-sm font-bold">Phone Number</label>
          <div
            className={classNames('border border-sliver w-full pl-[18px] pr-[14px] flex items-center mt-1 h-11 rounded-2xl', {
              '!border-red-500': !parent.phoneNumber && isRequired,
            })}
          >
            <input
              value={countryCode}
              className="bg-transparent border-none outline-none text-lg font-normal tracking-[-0.15px] leading-5 input-unset text-lite-black w-8"
            />

            <input
              value={parent.phoneNumber}
              onChange={(e) => {
                // only allow numbers
                if (isNaN(Number(e.target.value))) return
                if (e.target.value.length > 10) return

                setParent({ ...parent, phoneNumber: e.target.value })
              }}
              type="text"
              className="w-[85%] h-full border-none outline-none text-lg font-normal tracking-[-0.15px] leading-5 input-unset text-lite-black"
              placeholder="Enter your phone number"
            />
          </div>
          {!parent.phoneNumber && isRequired && <p className={classNames('text-xs text-red-500 mt-1')}>Phone number is required</p>}
          {parent.phoneNumber && parent.phoneNumber.length < 10 && (
            <p className={classNames('text-xs text-red-500 mt-1')}>Phone number must be 10</p>
          )}
        </div>
        {/* <CustomInput
          label="Phone Number"
          value={parent.phoneNumber}
          onChange={(e) => {
            setParent({ ...parent, phoneNumber: e.target.value })
          }}
          placeholder="Enter your phone number"
          type="tel"
          error="Phone number is required"
        /> */}
        <CustomAutoComplete
          label="Gender"
          placeholder="Select your gender"
          options={GENDER}
          value={parent.genderId}
          onChange={(e, value) => setParent({ ...parent, genderId: Number(value) })}
          error="Gender is required"
        />
        <FreeSoloField
          label="E-mail of Children in MojiGurukul"
          options={parent.childEmails}
          onChange={(e, value) => {
            setParent({ ...parent, childEmails: value })
          }}
          error="Email of children in MojiGurukul is required"
        />
      </div>
      <CustomModal variant="secondary" open={useModel.open} setOpen={useModel.setOpen}>
        <div>
          <h3 className="text-lg mb-4">Invalid Child Emails</h3>
          {invalidChildEmails.map((email) => (
            <div key={email} className="bg-red-100 text-red-500 text-sm px-5 py-1 rounded-md flex justify-between items-center mb-3">
              {email}
              <button
                className="text-red-500"
                onClick={() => {
                  updateChildEmail(email)
                  if (invalidChildEmails.length === 1) {
                    useModel.setOpen(false)
                  }
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </CustomModal>
    </RegisterParentLayout>
  )
}

export default InitialInfoScreen
