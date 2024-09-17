import React from 'react'
import { FaRegEye, FaRegComment, FaArrowLeft } from 'react-icons/fa'
import BreadCrumb from '@/components/common/BreadCrumbV2'
import CustomButton from '@/components/common/CustomButton'
// import Button from '@/components/shared/Button';

interface Question {
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

interface QuestionDetailProps {
  question: Question
  onBack: () => void
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ question, onBack }) => {
  return (
    <div>
      <button className="bg-purple-500 text-purple py-2 px-4 rounded-lg flex items-center gap-1" onClick={onBack}>
        <FaArrowLeft className="mr-2 text-purple" />
        Back to All Questions
      </button>
      <div className="bg-white rounded-xl p-4 max-w-full mx-auto border-2 border-gray-200 w-full">
        <p className="text-[24px] text-black font-semibold">New Post</p>
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center mt-4">
          <input type="text" placeholder="Type Question" className="w-full p-3 h-[45px] border rounded-lg mb-4 md:mb-0 md:mr-4" />
          {/* <Button text="Post" style={{ marginLeft: "20px" }} className='p-3 bg-purple w-20' /> */}
          <CustomButton color="#753CBD" textColor="white" className="!w-20">
            Post
          </CustomButton>
        </div>
      </div>
      <div className="my-6">
        <input type="text" placeholder="Search For More Game" className="w-full p-4 border rounded-lg" />
      </div>
    </div>
  )
}

export default QuestionDetail
