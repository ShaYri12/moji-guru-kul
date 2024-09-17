'use server' // don't forget to add this!

import { actionClient } from '@/lib/safe-action'
import { fetchRequest } from '@/network/FetchRequest'
import { z } from 'zod'
const contactUsSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string(),
    message: z.string().min(3, { message: 'Message must be at least 3 characters long' }),
    type: z.string(),
})

export const contactUsAction = actionClient.schema(contactUsSchema).action(async ({ parsedInput }) => {
    const res = await fetchRequest({
        url: '/ContactUs',
        method: 'POST',
        body: parsedInput,
    })
    if (res?.responseType === 200) {
        return { message: 'Successfully submitted form', isSuccess: true, }
    }
    return { message:  'Failed to submit', isSuccess: false,  }
})