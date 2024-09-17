import CustomButton from '@/components/common/CustomButton'
import React, { useState } from 'react'
import { FaTelegramPlane, FaRegEye, FaRegComment } from 'react-icons/fa'
import { IoIosSend } from 'react-icons/io'

interface AnswerFormProps {
  onSubmit: (answer: string) => void
  question: {
    id: number
    text: string
    time: string
    category: string
    views: number
    comments: number
    avatar: string
    name: string
    role: string
  }
}

const AnswerForm: React.FC<AnswerFormProps> = ({ onSubmit, question }) => {
  const [newAnswer, setNewAnswer] = useState('')

  const handleSubmit = () => {
    onSubmit(newAnswer)
    setNewAnswer('')
  }

  return (
    <div className="bg-white rounded-xl p-4 border-2 border-gray-200 w-full mb-6">
      <div className="flex items-start mb-4">
        <div className={`min-w-10 min-h-10 rounded-full ${question.avatar} flex items-center justify-center mr-4`}>
          <span className="text-white text-lg font-bold">C</span>
        </div>
        <div>
          <h5 className="text-md font-semibold text-black text-[14px] md:text-[16px]">{question.name}</h5>
          <p className="text-gray-500 text-sm text-[11px] md:text-[16px]">{question.time}</p>
          <p className="text-black font-semibold mt-2 text-[14px] md:text-[16px]">{question.text}</p>
          <p className="text-[#727272] font-medium mt-2 text-[14px] md:text-[16px]">
            This helps readers quickly identify replies from the author, promoting more extensive discussions 😶😣😤
          </p>
          <div className="flex items-center mt-2 text-gray-500">
            <FaRegEye className="mr-2" />
            <span className="mr-4">{question.views}</span>
            <FaRegComment className="mr-2" />
            <span>{question.comments}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center pt-4">
        <div className={`w-10 h-10 rounded-full hidden lg:block ${question.avatar} flex items-center justify-center mr-4`}>
          <span className="text-white text-lg font-bold">C</span>
        </div>
        <input
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your comment"
          className="flex-1 p-3 h-[45px] border rounded-lg mr-4"
        />
        {/* <Button style={{ marginLeft: '5px' }} className="p-3 bg-purple">
          <IoIosSend />
        </Button> */}
        <CustomButton color="#753CBD" textColor="white" className="">
          <IoIosSend />
        </CustomButton>
      </div>
    </div>
  )
}

export default AnswerForm
