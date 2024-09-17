'use client'

import { FileTypes } from '@/utils/types'
import React, { useState } from 'react'

type ImagePickerProps = {
  label: string
  value: Partial<FileTypes>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  loading?: boolean
}

const ImagePicker = ({ label, value, onChange, loading }: ImagePickerProps) => {
  const inputKey = `pdf-${Math.random()}`
  const [fileKey, setFileKey] = useState<number>(new Date().getTime())

  return (
    <div key={fileKey}>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="flex flex-col gap-2 items-center">
            <label className="text-sm font-medium text-gray-500 text-center">{label}</label>
            <div className="relative w-[150px] h-[150px] bg-gray-100 rounded-lg">
              <img src="/assets/images/image.png" alt="profile" className="w-full h-full object-cover rounded-lg" />
              <div className=" bg-ice-cold flex items-center justify-center rounded-lg mt-2">
                <label htmlFor={inputKey} className="cursor-pointer">
                  <p className="text-lite-black font-medium">{loading ? 'Uploading...' : 'Upload'}</p>
                </label>
              </div>
            </div>
          </div>
          <input
            type="file"
            id={inputKey}
            className="hidden"
            onChange={(e) => {
              if (loading) return
              onChange(e)
              setFileKey(new Date().getTime())
            }}
            // accept=".pdf"
          />
        </div>
        <p className="mt-8">{value.name}</p>
      </div>
    </div>
  )
}

export default ImagePicker
