import React from 'react'
import GameFlow from '@/components/GameFlow'
import { LearningActivityTypes, TutorsForStudentTypes } from '@/utils/types'
import { fetchRequest } from '@/network/FetchRequest'
import { cookies } from 'next/headers'

async function Games() {
  const cookieStore = cookies()
  const userId = cookieStore.get('userId')?.value
  let tutors: TutorsForStudentTypes[] = []
  if (userId) tutors = await fetchRequest({ url: `educators/Get-educators-and-Groups?userId=${userId}`, method: 'GET' })
  return (
    <div className="w-full max-w-[1170px] m-auto flex flex-col gap-5 p-6">
      <GameFlow tutorGames={[]} tutors={tutors} />
    </div>
  )
}

export default Games

// https://devapi.nukulum.com/api/games/1/1677 (My game quiz)
// "activityTypeName": "My Games", => "activityTypeId": 1, use this api (https://devapi.nukulum.com/api/activities/1/1529/0)
//   "activityTypeName": "My Material", "activityTypeId": 5, use same api
// "activityTypeName": "Neithedu Games", "activityTypeId": 2, same api
// my gameflow, activityId: 3 , handle reponse differently use this api (https://devapi.nukulum.com/api/activities/3/0/781)
// personal task =7, live lesson = 8 (remove these two activities)
// Neithedu gameflow=4
//
//
