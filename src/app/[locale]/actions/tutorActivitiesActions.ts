'use server' // don't forget to add this!

import { actionClient } from '@/lib/safe-action'
import { fetchRequest } from '@/network/FetchRequest'
import { revalidatePath, revalidateTag } from 'next/cache'
import { z } from 'zod'

// This schema is used to validate input from client.

const addPupilsActionSchema = z.array(
  z.object({
    studentId: z.number(),
    exists: z.boolean(),
  })
)
const addLiveLessonActionSchema = z.object({
  title: z.string(),
  startTime: z.string(),
  lessonDate: z.string(),
  lessonMode: z.number(),
  placeId: z.number(),
  assignedTo: z.string(),
})
const deleteLiveLessonActionSchema = z.object({
  lessonId: z.number(),
})
export const addPupilsAction = actionClient.schema(addPupilsActionSchema).action(async ({ parsedInput }) => {
  const res = await fetchRequest({
    url: '/educators/students/many',
    method: 'POST',
    body: parsedInput,
  })
  if (res?.length > 0) {
    revalidateTag('educator-student-group')
    return { message: 'Successfully added pupil', isSuccess: true }
  }
  return { message: 'Failed to add pupil', isSuccess: false }
})

export const addLiveLessonAction = actionClient.schema(addLiveLessonActionSchema).action(async ({ parsedInput }) => {
  const res = await fetchRequest({
    url: '/lessons/Lesson',
    method: 'POST',
    body: parsedInput,
  })
  console.log(res)
  if (!res.isError) {
    revalidateTag('activities')
    return { message: 'Successfully added lesson', isSuccess: true }
  }
  return { message: `${res.error.statusText} (${res.error.status})`, isSuccess: false }
})

export const deleteLiveLessonAction = actionClient.schema(deleteLiveLessonActionSchema).action(async ({ parsedInput }) => {
  const res = await fetchRequest({
    url: '/lessons/change-status',
    method: 'PUT',
    body: { lessonId: parsedInput.lessonId, points: 0, statusId: 11 },
  })
  if (!res.isError) {
    revalidateTag('activities')
    return { message: 'Successfully deleted lesson', isSuccess: true }
  }
  return { message: `${res.error.statusText} (${res.error.status})`, isSuccess: false }
})
