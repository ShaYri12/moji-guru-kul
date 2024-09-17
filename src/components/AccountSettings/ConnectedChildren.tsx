import { useAuthStore } from '@/store/authStore'
import { useErrorStore } from '@/store/errorStore'
import { useParentStore } from '@/store/parentStore'
import { ConnectedChildrenTypes } from '@/utils/types'
import React, { useEffect } from 'react'

const ConnectedChildren = () => {
  const user = useAuthStore((state) => state.user)

  const connectedChildrenList = useParentStore((state) => state.connectedChildrenList)
  const getConnectedChildren = useParentStore((state) => state.getConnectedChildren)
  const setAlert = useErrorStore((state) => state.setAlert)

  useEffect(() => {
    if (!user) return setAlert({ message: 'User not found', type: 'error' })
    getConnectedChildren()
  }, [])

  return (
    <div className="mt-12">
      {connectedChildrenList.map((child: ConnectedChildrenTypes) => {
        return (
          <div key={child.id} className="flex items-center justify-between border-b border-gray-200 py-4">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-lg font-semibold">Name: {child.name}</p>
                <p className="text-sm text-gray-500">Activities {child.numberOfActivities}</p>
                <p className="text-sm text-gray-500">Parent Id {child.parentId}</p>
              </div>
            </div>
            <div>
              <button className="text-sm text-blue-500">View Profile</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ConnectedChildren
