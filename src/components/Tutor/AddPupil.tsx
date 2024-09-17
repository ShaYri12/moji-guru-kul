'use client'
import React, { useEffect, useState } from 'react'
import { SearchStudentTypes } from '@/utils/types'
import CustomButton from '../common/CustomButton'
import { useModalStore } from '@/store/modalStore'
import CustomModal from '../common/CustomModal'
import CustomInput from '../common/CustomInput'
import { useParentStore } from '@/store/parentStore'
import Checkbox from '@mui/material/Checkbox'
import { useEducatorStore } from '@/store/educatorStore'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useSnackbar } from 'notistack'
import { useErrorStore } from '@/store/errorStore'
import { addPupilsAction } from '@/app/[locale]/actions/tutorActivitiesActions'

const AddPupil = () => {
  const [search, setSearch] = useState('')
  const [selectedStudents, setSelectedStudents] = useState<SearchStudentTypes[]>([])

  const openPupilModal = useModalStore((state) => state.openPupilModal)
  const setOpenPupilModal = useModalStore((state) => state.setOpenPupilModal)
  const searchStudentList = useParentStore((state) => state.searchStudentList)
  const setSearchStudentList = useParentStore((state) => state.setSearchStudentList)
  const searchStudents = useParentStore((state) => state.searchStudents)
  // const addPupils = useEducatorStore((state) => state.addPupils)
  const router = useRouter()

  const { execute: addPupils } = useAction(addPupilsAction, {
    onSuccess: (data) => {
      if (data.data?.isSuccess) {
        setSearchStudentList([])
        setSelectedStudents([])
        setSearch('')
        router.push(`/tutor/activities/student/${data.input[0].studentId}`)
        setOpenPupilModal(false)
        useErrorStore.getState().setAlert({ message: data.data.message, type: 'success' })

      }
      if (!data.data?.isSuccess){
        useErrorStore.getState().setAlert({ message: data.data?.message as string, type: 'error' })

      }
    },
  })
  return (
    <CustomModal open={openPupilModal} setOpen={setOpenPupilModal}>
      <div className="flex justify-center">
        <div className="flex flex-col gap-5 items-center w-full max-w-[400px]">
          <h4 className="text-indigo text-xl font-bold">Add a new pupil</h4>
          <p>Pupil’s email or name in Neithedu</p>
          <CustomInput placeholder="Enter pupil’s email or name" value={search} onChange={(e) => setSearch(e.target.value)} />
          <CustomButton
            variant="contained"
            color={search.length < 3 ? '#B0B0B0' : '#753CBD'}
            textColor="white"
            className="!w-[130px] !normal-case !h-11"
            onClick={async () => {
              if (search.length < 3) return
              await searchStudents(search)
            }}
          >
            Search pupil
          </CustomButton>
        </div>
      </div>
      {(searchStudentList.length && (
        <div className=" border border-indigo rounded-md p-4 m-4">
          <p className="text-indigo text-xl pb-3">Add new pupil</p>
          {searchStudentList.map((student: SearchStudentTypes, i) => (
            <div key={student.studentId} className="shadow-tiles mb-2 py-1 px-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg text-lite-black">{student.name}</p>
                  <p className="text-mist text-sm pt-0">{student.location}</p>
                </div>
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStudents([...selectedStudents, student])
                    } else {
                      setSelectedStudents(selectedStudents.filter((item) => item.studentId !== student.studentId))
                    }
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <CustomButton
              variant="contained"
              color={selectedStudents.length ? '#753CBD' : '#B0B0B0'}
              textColor="white"
              className="!w-[130px] !normal-case !h-10 mt-4"
              onClick={async () => {
                if (!selectedStudents.length) return
                addPupils(selectedStudents.map((student) => ({ studentId: student.studentId, exists: true })))
              }}
            >
              Add pupil
            </CustomButton>
          </div>
        </div>
      )) ||
        ''}
    </CustomModal>
  )
}

export default AddPupil
