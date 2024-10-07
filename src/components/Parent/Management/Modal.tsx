import { Slider } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { LuDot } from 'react-icons/lu'
import { FiUser, FiCalendar, FiType } from 'react-icons/fi'

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const [isSendClicked, setIsSendClicked] = useState(false)
  const [points, setPoints] = useState<number>(100)

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeModal])

  // Focus management
  useEffect(() => {
    const previouslyFocusedElement = document.activeElement as HTMLElement

    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }

    return () => {
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus()
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed overflow-y-auto px-3 hide-scrollbar w-full py-10 inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      tabIndex={-1}
      ref={modalRef}
    >
      <div
        className="bg-white mt-[300px] sm:mt-[100px] overflow-x-hidden rounded-lg shadow-lg mx-auto w-full max-w-[929px] outline-none"
        tabIndex={0}
      >
        <div className="flex justify-between items-center py-4 p-5 border-b-[#EEEEEE] border-b">
          <h1 id="modal-title" className="text-[36px] font-[500] text-purple leading-[48px] tracking-[2%] flex-grow">
            Create Task
          </h1>
          <button
            onClick={closeModal}
            className="w-[40px] h-[40px] rounded-xl flex justify-center items-center transition hover:opacity-80 cursor-pointer"
            aria-label="Close Modal"
          >
            <Image src="/assets/icons/cross-icon.svg" alt="close modal" width={30} height={30} />
          </button>
        </div>

        {!isSendClicked ? (
          <div>
            <div className="pt-8 px-3 py-5 sm:px-6">
              <form>
                {/* Task Name Input */}
                <div className="mb-6">
                  <label htmlFor="taskName" className="block text-lg font-medium mb-2">
                    Task Name
                  </label>
                  <input
                    type="text"
                    id="taskName"
                    placeholder="Type"
                    className="w-full outline-none bg-transparent p-3 placeholder:text-[#B1AFB3] text-sm border border-gray-300 rounded-md  "
                  />
                </div>

                {/* Description Input */}
                <div className="mb-6">
                  <label htmlFor="description" className="block text-lg font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Type"
                    rows={4}
                    className="w-full outline-none resize-none p-3 border border-gray-300 rounded-md bg-transparent text-sm placeholder:text-[#B1AFB3]"
                  ></textarea>
                </div>

                <div className="flex items-center md:flex-row flex-col justify-between gap-5 sm:mb-5">
                  {/* Action Buttons */}
                  <div className="flex gap-4 items-center md:flex-nowrap flex-wrap md:justify-between">
                    <button
                      type="button"
                      className="text-[#B1AFB3] text-[16px] h-[40px] w-[145px] border border-[#B1AFB3] rounded-lg flex items-center gap-2 justify-center"
                    >
                      <Image src="/assets/icons/assign.svg" alt="assign" width={16} height={16} />
                      Assign
                    </button>
                    <button
                      type="button"
                      className="text-[#B1AFB3] text-[16px] h-[40px] w-[145px] border border-[#B1AFB3] rounded-lg flex items-center gap-2 justify-center"
                    >
                      <Image src="/assets/icons/due-date.svg" alt="assign" width={16} height={16} />
                      Due Date
                    </button>
                    <button
                      type="button"
                      className="text-[#B1AFB3] text-[16px] h-[40px] w-[145px] border border-[#B1AFB3] rounded-lg flex items-center gap-2 justify-center"
                    >
                      <Image src="/assets/icons/type.svg" alt="assign" width={16} height={16} />
                      Type
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
              </form>
            </div>

            <div className="border-t border-[#EEEEEE] py-8 text-white flex items-center justify-center px-6">
              <button
                className="bg-[#753CBD] h-[50px] rounded-lg w-full uppercase text-lg font-normal"
                onClick={() => setIsSendClicked(true)}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="max-w-6xl mx-auto rounded-lg lg:py-[32px] py-[26px] lg:px-[40px] px-[15px]">
              {/* "New" badge */}
              <div className="flex items-center mb-[6px]">
                <span className="px-3 py-[5px] flex items-center rounded-[4px] justify-center text-base tracking-[2%] font-normal bg-[#EDF5FF] text-[#4D9EFA]">
                  <LuDot size={18} strokeWidth={5} />
                  New
                </span>
              </div>

              {/* Assignment Title */}
              <h1 className="mt-4 text-[24px] sm:text-[32px] sm:leading-[38.4px] font-[500] tracking-[2%] text-purple mb-2">
                Assignment Name
              </h1>

              {/* Subject Badge and Creator Info */}
              <div className="flex flex-wrap items-center gap-[16px] mt-4">
                <span className="border border-purple text-purple text-[16px] sm:text-[18px] md:text-[20px] font-normal px-[8px] rounded-md">
                  SCIENCE
                </span>
                <div>
                  <span className="text-[#928F95] font-normal text-[18px] sm:text-[20px] md:text-[24px] sm:leading-[28.8px] tracking-[2%]">
                    Created By
                  </span>{' '}
                  <span className="text-[#241F2B] font-normal text-[18px] sm:text-[20px] md:text-[24px] sm:leading-[28.8px] tracking-[2%]">
                    Michael Richards
                  </span>
                </div>
              </div>

              {/* Date, Deadline, and Points Section */}
              <div className=" flex flex-wrap lg:gap-[40px] md:gap-[30px] gap-[16px] w-full items-start justify-between md:justify-start pt-[32px] bg-white ">
                <div className="w-auto flex flex-col items-start">
                  <p className="text-[16px] md:text-[21px] md:leading-[36px] text-[#3D3842] font-[500] w-max">Created</p>
                  <div className="flex items-center gap-[8px]">
                    <Image src="/assets/icons/calender-icon.png" alt="created date" width={20} height={20} />
                    <p className="text-sm md:text-[19px] text-[#928F95] md:leading-[24px] font-normal">May 22</p>
                  </div>
                </div>

                <div className="w-auto flex flex-col items-start">
                  <p className="text-[16px] md:text-[21px] md:leading-[36px] text-[#3D3842] font-[500] w-max">Deadline</p>
                  <div className="flex items-center gap-[8px]">
                    <Image src="/assets/icons/calender-icon.png" alt="deadline date" width={24} height={24} />
                    <p className="text-sm md:text-[19px] text-[#928F95] md:leading-[24px] font-normal">May 20</p>
                  </div>
                </div>

                <div className="w-auto flex flex-col items-start">
                  <p className="text-[16px] md:text-[21px] md:leading-[36px] text-[#3D3842] font-[500] w-max">Total Points</p>
                  <div className="flex items-center gap-[8px]">
                    <Image src="/assets/icons/star-icon.png" alt="points" width={22} height={22} />
                    <p className="text-sm md:text-[19px] text-[#928F95] md:leading-[24px] font-normal">+4</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="md:mt-[32px] mt-[20px]">
                <label id="modal-description" className="text-[22px] md:text-[32px] md:leading-[38.4px] font-[500] text-purple flex-grow">
                  Description
                </label>
                <div className="w-full md:text-[20px] rounded-[15px] text-[16px] lg:p-[24px] p-[20px] text-[#928F95] bg-[#FAF8FC] mt-[16px]">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&lsquo;s
                  standard dummy text ever since the 1500s.
                </div>
              </div>
            </div>
            <div className="border-t px-6 border-[#EEEEEE] py-8 text-white flex items-center justify-center">
              <button className="bg-[#753CBD] h-[50px] rounded-lg max-w-[850px] w-full m-auto uppercase text-lg font-normal">
                Complete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
