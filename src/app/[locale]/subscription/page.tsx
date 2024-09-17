import Subscription from '@/components/Subscription'
import { fetchRequest } from '@/network/FetchRequest'
import { PlanResponseTypes } from '@/utils/types'
import React from 'react'

async function SubscriptionPage() {
  // get plans

  const plans: { data: PlanResponseTypes[] } = await fetchRequest({ url: 'Plans/getplans?For=5&Status=0', method: 'GET' })

  if (!plans.data.length) return <p>Something went wrong, not able to fetch the plans </p>

  return (
    <div className="w-full max-w-[1500px] m-auto flex flex-col gap-5 p-6">
      <div className="flex justify-center">
        <h1 className="text-indigo text-2xl md:text-4xl lg:text-[56px] font-bold leading-[120%] tracking-[1.12px] mb-4">
          Choose your subscription
        </h1>
      </div>
      <Subscription plans={plans.data} />
    </div>
  )
}

export default SubscriptionPage
