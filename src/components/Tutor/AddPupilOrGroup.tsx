'use client'

import { useModalStore } from '@/store/modalStore'
import CustomButton from '../common/CustomButton'

const AddPupilOrGroup = () => {
  const setOpenPupilModal = useModalStore((state) => state.setOpenPupilModal)

  return (
    <>
      <CustomButton
        variant="contained"
        color="#753CBD"
        textColor="white"
        className="!w-[130px] !normal-case !h-11"
        onClick={() => setOpenPupilModal(true)}
      >
        Add a pupil
      </CustomButton>
      <CustomButton variant="contained" color="#753CBD" textColor="white" className="!w-[175px] !normal-case !h-11" onClick={() => {}}>
        Add a new group
      </CustomButton>
    </>
  )
}
export default AddPupilOrGroup
