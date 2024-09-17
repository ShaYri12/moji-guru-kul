'use server' // don't forget to add this!

import { actionClient } from '@/lib/safe-action'
import { fetchRequest } from '@/network/FetchRequest'
import { revalidatePath, revalidateTag } from 'next/cache'
import { z } from 'zod'

// This schema is used to validate input from client.

const cancelLiveLessonSchema = z.object({
  lessonId: z.number(),
  reasonId: z.number(),
  otherCancelReason: z.string().optional(),
})

export const cancelLiveLessonByStudent = actionClient.schema(cancelLiveLessonSchema).action(async ({ parsedInput }) => {
  const res = await fetchRequest({
    url: '/lessons/cancel-lesson',
    method: 'PUT',
    body: {
      lessonId: parsedInput.lessonId,
      reasonId: parsedInput.reasonId,
      otherCancelReason: parsedInput.otherCancelReason,
    },
  })
  console.log('res1', res)
  const res2 = await fetchRequest({
    url: '/lessons/change-status',
    method: 'PUT',
    body: { lessonId: parsedInput.lessonId, points: 0, statusId: 10 },
  })

  console.log('res2', res2)

  //         await updateLessonStatus(lessonDetails.lessonId, 10, 0);

  if (!res.isError && !res2.isError) {
    revalidateTag('lessons')
    return { message: 'Successfully cancelled lesson', isSuccess: true }
  }

  return { message: `Failed to cancel lesson (code: ${res.error.status || res2.error.status})`, isSuccess: false }
})

const confirmLiveLessonSchema = z.object({
  lessonId: z.number(),
})

export const confirmLiveLessonByStudent = actionClient.schema(confirmLiveLessonSchema).action(async ({ parsedInput }) => {
  const res = await fetchRequest({
    url: '/lessons/change-status',
    method: 'PUT',
    body: { lessonId: parsedInput.lessonId, points: 0, statusId: 1 },
  })

  if (!res.isError) {
    revalidateTag('lessons')
    return { message: 'Successfully confirmed lesson', isSuccess: true }
  }

  return { message: `Failed to confirm lesson (code: ${res.error.status})`, isSuccess: false }
})