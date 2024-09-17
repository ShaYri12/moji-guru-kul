import { useParentStore } from '@/store/parentStore'
import React from 'react'
import RegisterParentLayout from './RegisterParentLayout'
import CustomInput from '@/components/common/CustomInput'

const InvitationScreen = () => {
  const parent = useParentStore((state) => state.parent)
  const setParent = useParentStore((state) => state.setParent)
  return (
    <RegisterParentLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        {/* <CustomInput
          label="Invitation Token"
          value={parent.inviteToken}
          onChange={(e) => {
            setParent({ ...parent, inviteToken: e.target.value })
          }}
          placeholder="Enter your invitation token"
        /> */}
      </div>
    </RegisterParentLayout>
  )
}

export default InvitationScreen
