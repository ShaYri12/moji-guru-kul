// Modal.tsx
import Image from 'next/image'
import React from 'react'
import { LuDot } from 'react-icons/lu'

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg lg:w-[929px]">
        <div className="flex justify-between items-center p-[24px] border-b-[#EEEEEE] border-b">
          <h1 className="text-[36px] font-[500] text-purple leading-[48px] tracking-[2%] flex-grow">Assignment</h1>
          <button
            onClick={closeModal}
            className="w-[40px] h-[40px] rounded-xl flex justify-center items-center transition hover:opacity-80 cursor-pointer"
          >
            <Image src="/assets/icons/cross-icon.svg" alt="close modal" width={30} height={30} />
          </button>
        </div>

        <div className="max-w-6xl mx-auto rounded-lg lg:py-[32px] py-[26px] lg:px-[40px] px-[20px]">
          {/* "New" badge */}
          <div className="flex items-center mb-[6px]">
            <span className="px-3 py-[5px] flex items-center rounded-[4px] justify-center text-base tracking-[2%] font-normal bg-[#EDF5FF] text-[#4D9EFA]">
              <LuDot size={18} strokeWidth={5} />
              New
            </span>
          </div>

          {/* Assignment Title */}
          <h1 className="text-[24px] sm:text-[32px] sm:leading-[38.4px] font-[500] tracking-[2%] text-purple mb-2">Assignment Name</h1>

          {/* Subject Badge and Creator Info */}
          <div className="flex flex-wrap items-center gap-[16px] border-b border-b-[#D3D2D2] pb-[32px]">
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
          <div className="flex flex-wrap lg:gap-[40px] md:gap-[30px] gap-[16px] w-full items-start justify-start py-[32px] border-b border-b-[#D3D2D2] bg-white space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-auto flex flex-col items-start">
              <p className="text-[16px] md:text-[21px] md:leading-[36px] text-[#3D3842] font-[500] w-max">Created</p>
              <div className="flex items-center gap-[8px]">
                <Image src="/assets/icons/calender-icon.png" alt="created date" width={20} height={20} />
                <p className="text-sm md:text-[19px] text-[#928F95] md:leading-[24px] font-normal">May 19</p>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-start">
              <p className="text-[16px] md:text-[21px] md:leading-[36px] text-[#3D3842] font-[500] w-max">Deadline</p>
              <div className="flex items-center gap-[8px]">
                <Image src="/assets/icons/calender-icon.png" alt="deadline date" width={24} height={24} />
                <p className="text-sm md:text-[19px] text-[#928F95] md:leading-[24px] font-normal">May 20</p>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-start">
              <p className="text-[16px] md:text-[21px] md:leading-[36px] text-[#3D3842] font-[500] w-max">Total Points</p>
              <div className="flex items-center gap-[8px]">
                <Image src="/assets/icons/star-icon.png" alt="points" width={22} height={22} />
                <p className="text-sm md:text-[19px] text-[#928F95] md:leading-[24px] font-normal">+4</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="md:my-[32px] my-[20px]">
            <label className="text-[22px] md:text-[32px] md:leading-[38.4px] font-[500] text-purple flex-grow">Description</label>
            <div className="w-full md:text-[20px] rounded-[15px] text-[16px] lg:p-[24px] p-[20px] text-[#928F95] bg-[#FAF8FC] mt-[16px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
