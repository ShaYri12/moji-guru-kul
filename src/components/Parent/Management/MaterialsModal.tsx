import React, { useState } from 'react'
import FileUpload from './FileUpload'
import Image from 'next/image'
import { Slider } from '@mui/material'

interface FileItem {
  id: number
  name: string
  size: number
  type: string
  progress: number
  status: 'uploading' | 'completed'
}

const MaterialsModal = () => {
  const [points, setPoints] = useState<number>(100)
  const [activeTab, setActiveTab] = useState('Attached')
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: 1,
      name: 'Video.mp4',
      size: 45,
      type: 'mp4',
      progress: 100,
      status: 'completed',
    },
    {
      id: 2,
      name: 'Material.pdf',
      size: 45,
      type: 'pdf',
      progress: 100,
      status: 'completed',
    },
  ])

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }
  return (
    <div>
      <form className="w-full px-3 sm:px-6">
        {/* Task Name Input */}
        <div className="mb-4">
          <label htmlFor="taskName" className="block text-xl font-medium mb-2">
            Materials Name
          </label>
          <input
            type="text"
            placeholder="Type"
            className="w-full outline-none bg-transparent p-3 placeholder:text-[#B1AFB3] text-sm border border-gray-300 rounded-md  "
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-xl font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Type"
            rows={4}
            className="w-full outline-none resize-none p-3 border border-gray-300 rounded-md bg-transparent text-sm placeholder:text-[#B1AFB3]"
          ></textarea>
        </div>

        {/* Input Url */}
        <div className="mb-6">
          <label htmlFor="taskName" className="block text-xl font-medium mb-2">
            Input Url
          </label>
          <input
            type="text"
            id="taskName"
            placeholder="Add url"
            className="w-full outline-none bg-transparent p-3 placeholder:text-[#B1AFB3] text-sm border border-gray-300 rounded-md  "
          />
        </div>

        <FileUpload />
      </form>

      <div>
        <div className="w-full px-4 bg-white mb-5">
          {/* Tabs Navigation */}
          <div className="flex border-b mb-4">
            {['Attached', 'Previous Uploaded', 'Comments'].map((tab) => (
              <button
                key={tab}
                className={`px-2 py-2 -mb-px text-base sm:text-xl font-medium ${
                  activeTab === tab ? 'border-b-2 border-[#753CBD] text-[#753CBD]' : 'text-gray-500'
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div>
            {activeTab === 'Attached' && (
              <div>
                <div className="w-full">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="w-full border border-[#E9FAF5] flex items-center justify-between p-3 bg-[#F8F8F8] rounded-md mb-3"
                    >
                      <div className="w-full flex items-center gap-4">
                        <div className="min-w-[56px] min-h-[56px] flex items-center justify-center rounded-md bg-[#F1ECF8]">
                          {file.type === 'mp4' ? (
                            <span className="text-[#753CBD] text-xl">
                              <Image src="/assets/icons/video-icons.svg" alt="vide" width={26} height={24} />
                            </span>
                          ) : (
                            <span className="text-[#753CBD] text-xl">
                              <Image src="/assets/icons/doc-icons.svg" alt="vide" width={26} height={24} />
                            </span>
                          )}
                        </div>
                        <div className="w-full">
                          <div className="flex items-center gap-1 justify-between">
                            <p className="font-semibold text-lg text-gray-800">Upload Completed</p>
                            <button className="-mt-1">
                              <Image src="/assets/icons/close-icons.svg" alt="close-icons" width={16} height={16} />
                            </button>
                          </div>
                          <div className="w-full flex items-center justify-between">
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <Image src="/assets/icons/check-mark.svg" alt="vide" width={12} height={12} className="-mt-0.5" />
                              {file.name} <span className="ml-2 text-[#B1AFB3]">Size: {file.size}kb</span>
                            </p>
                            <span className="text-sm text-gray-500">{file.progress}%</span>
                          </div>
                          <div className="mt-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-[#22CC9B] h-2" style={{ width: `${file.progress}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center md:flex-row flex-col justify-between gap-5 sm:mb-5">
                  {/* Action Buttons */}
                  <div className="flex gap-4 items-center md:flex-nowrap flex-wrap justify-center md:justify-between">
                    <button
                      type="button"
                      className="text-[#B1AFB3] text-[16px] h-[40px] w-[110px] border border-[#B1AFB3] rounded-lg flex items-center gap-2 justify-center"
                    >
                      <Image src="/assets/icons/assign.svg" alt="assign" width={16} height={16} />
                      Assign
                    </button>
                    <button
                      type="button"
                      className="text-[#B1AFB3] text-[16px] h-[40px] w-[110px] border border-[#B1AFB3] rounded-lg flex items-center gap-2 justify-center"
                    >
                      <Image src="/assets/icons/due-date.svg" alt="assign" width={16} height={16} />
                      Due Date
                    </button>
                    <button
                      type="button"
                      className="text-[#B1AFB3] text-[16px] h-[40px] w-[110px] border border-[#B1AFB3] rounded-lg flex items-center gap-2 justify-center"
                    >
                      <Image src="/assets/icons/type.svg" alt="assign" width={16} height={16} />
                      Type
                    </button>
                    <button
                      type="button"
                      className="text-[#B1AFB3] text-[16px] h-[40px] w-[110px] border border-[#B1AFB3] rounded-lg flex items-center gap-2 justify-center"
                    >
                      <Image src="/assets/icons/type.svg" alt="assign" width={16} height={16} />
                      Topic
                    </button>
                  </div>

                  {/* Points Slider */}
                  <div className="w-full flex flex-col items-center justify-between mr-2">
                    <div className="w-full flex items-center justify-between -mb-1">
                      <label className="text-base text-[#B1AFB3]">Point</label>
                      <span className="text-[#753CBD] font-medium text-base">{points}</span>
                    </div>
                    <Slider
                      value={points}
                      onChange={(e, newValue) => setPoints(newValue as number)}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                      sx={{ color: '#6B21A8' }}
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Previous Uploaded' && (
              <div className="p-3">
                <p className="text-gray-500">No files previously uploaded.</p>
              </div>
            )}
            {activeTab === 'Comments' && (
              <div className="p-3">
                <p className="text-gray-500">No comments available.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[#EEEEEE] pt-8 text-white flex items-center justify-center px-6">
        <button className="bg-[#753CBD] h-[50px] rounded-lg w-full uppercase text-lg font-normal">Send</button>
      </div>
    </div>
  )
}

export default MaterialsModal
