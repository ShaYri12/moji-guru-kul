'use server' // don't forget to add this!

import { actionClient } from '@/lib/safe-action'
import { fetchRequest } from '@/network/FetchRequest'
import { z } from 'zod'

// This schema is used to validate input from client.
// check for email validation and also password validation
const registerReferralSchema = z
  .object({
    firstName: z.string().min(3, { message: 'First name must be at least 3 characters long' }), // {message: 'First name must be at least 3 characters long'
    lastName: z.string().min(3, { message: 'Last name must be at least 3 characters long' }),

    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),

    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    gradeId: z.number(),
    phoneNumber: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  })

export const registerReferral = actionClient.schema(registerReferralSchema).action(async ({ parsedInput }) => {
  const res = await fetchRequest({
    url: '/register/ambassador',
    method: 'POST',
    body: parsedInput,
  })
  if (res?.responseType === 200) {
    return { message: res.message || 'Successfully registered', isSuccess: true, data: res }
  }
  return { message: res.message || 'Failed to register', isSuccess: false, data: res }
})
