'use client'
import { StudentsAndGroupsResponseTypes } from '@/utils/types'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import CustomInput from '../common/CustomInput'
import { useParams } from 'next/navigation'
import Link from 'next/link'

type StudentListProps = {
  studentsGroups: StudentsAndGroupsResponseTypes[]
}

const StudentList = ({ studentsGroups }: StudentListProps) => {
  const [search, setSearch] = useState('')
  const [filteredEntities, setFilteredEntities] = useState<StudentsAndGroupsResponseTypes[]>(studentsGroups)
  const params = useParams<{ groupOrStudent: string; studentId: string }>()

  useEffect(() => {
    if (search) {
      const filtered = studentsGroups.filter((studentGroup) => studentGroup.name.toLowerCase().includes(search.toLowerCase()))
      setFilteredEntities(filtered)
    } else {
      setFilteredEntities(studentsGroups)
    }
  }, [search])

  // filter out based on isGroup true then filter the groups
  const groups = filteredEntities?.filter((studentGroup) => studentGroup.isGroup)
  const students = filteredEntities?.filter((studentGroup) => !studentGroup.isGroup)

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <CustomInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name" type="search" />
      <div className="overflow-y-scroll vertical-scroll flex flex-col flex-1">
        <div className="">
          <h2 className="text-indigo text-xl font-semibold uppercase my-3">Students</h2>
          {students?.map((student: StudentsAndGroupsResponseTypes) => (
            <Link href={`/tutor/activities/student/${student.id}`} key={student.id}>
              <div
                className={classNames('hover:bg-soft-peach rounded-md py-0.5 px-2', {
                  'bg-soft-peach': student.id === +params.studentId,
                })}
              >
                <p className="text-lite-black text-lg capitalize cursor-pointer hover:text-indigo hover:text-xl transition-all">
                  {student.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="my-5">
          <hr />
        </div>
        <div>
          <h2 className="text-indigo text-xl font-semibold uppercase my-3">Groups</h2>
          {groups?.map((group: StudentsAndGroupsResponseTypes) => (
            <Link href={`/tutor/activities/group/${group.id}`} key={group.id}>
              <div
                className={classNames('hover:bg-off-green rounded-md py-0.5 px-2', {
                  'bg-off-green': group.id === +params.studentId,
                })}
              >
                <p className="text-lite-black text-lg capitalize cursor-pointer hover:text-indigo hover:text-xl transition-all">
                  {group.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentList
