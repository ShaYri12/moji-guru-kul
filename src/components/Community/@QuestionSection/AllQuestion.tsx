'use client'
import React, { useState } from 'react'
import QuestionList from './QuestionList'
import QuestionDetail from './QuestionDetail'
import AnswerForm from './AnswerForm'
import AnswerList from './AnswerList'
import CustomButton from '@/components/common/CustomButton'

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

const questions: Question[] = [
  {
    id: 1,
    text: "Damn, today I'm very upset. I lost amount of money?",
    time: '23 minutes ago',
    category: 'Technical',
    views: 23,
    comments: 23,
    avatar: 'bg-yellow-400',
    name: 'Carisa Maya',
    role: 'Student',
  },
  {
    id: 2,
    text: "Damn, today I'm very upset. I lost amount of money?",
    time: '23 minutes ago',
    category: 'Technical',
    views: 23,
    comments: 23,
    avatar: 'bg-purple-40',
    name: 'Carisa Maya',
    role: 'Student',
  },
  {
    id: 3,
    text: "Damn, today I'm very upset. I lost amount of money?",
    time: '23 minutes ago',
    category: 'Technical',
    views: 23,
    comments: 23,
    avatar: 'bg-blue-400',
    name: 'Carisa Maya',
    role: 'Student',
  },
  {
    id: 4,
    text: "Damn, today I'm very upset. I lost amount of money?",
    time: '23 minutes ago',
    category: 'Technical',
    views: 23,
    comments: 23,
    avatar: 'bg-pink-400',
    name: 'Carisa Maya',
    role: 'Student',
  },
]

const AllQuestion: React.FC = () => {
  const [activeTab, setActiveTab] = useState('new')
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)

  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion(question)
  }

  const handleAnswerSubmit = (answer: string) => {
    // Logic to submit the new answer
    console.log(answer)
  }

  const handleBack = () => {
    setSelectedQuestion(null)
  }

  if (selectedQuestion) {
    return (
      <div className="max-w-3xl mx-auto">
        <QuestionDetail question={selectedQuestion} onBack={handleBack} />
        <AnswerForm onSubmit={handleAnswerSubmit} question={selectedQuestion} />
        <AnswerList question={selectedQuestion} />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center flex-row">
        <div className="flex flex-col items-start">
          <h2 className="text-lg md:text-2xl font-semibold text-black">All Question</h2>
          <p className="text-gray-500 mb-6 text-sm">240 questions</p>
        </div>
        <div className="flex space-x-4 border-2 border-gray-200 rounded-md p-1 ">
          <button
            className={`w-[80px] md:w-[100px] text-[14px] py-2 rounded-lg font-medium ${activeTab === 'new' ? 'bg-purple-40 text-purple' : 'text-gray-500'}`}
            onClick={() => setActiveTab('new')}
          >
            New{' '}
            <span
              className={`w-5 h-5 text-[14px] rounded-full p-0.5 md:p-1 ml-0 md:ml-1 ${activeTab === 'new' ? 'bg-purple text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              12
            </span>
          </button>
          <button
            className={`w-[80px] md:w-[100px] text-[14px] py-2 rounded-lg font-medium ${activeTab === 'popular' ? 'bg-purple-40 text-purple' : 'text-gray-500'}`}
            onClick={() => setActiveTab('popular')}
          >
            Popular{' '}
            <span
              className={`w-5 h-5 text-[14px] rounded-full p-0.5 md:p-1 ml-0 md:ml-1 ${activeTab === 'popular' ? 'bg-purple text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              12
            </span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 max-w-full mx-auto border-2 border-gray-200 w-full">
        <p className="text-[24px] text-black font-semibold">New Post</p>
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center mt-4 w-[100%]">
          <input type="text" placeholder="Type Question" className="w-full p-3 h-[45px] border rounded-lg mb-4 md:mb-0 md:mr-4" />
          {/* <Button text="Post" onClick={() => console.log('Post clicked')} className="p-3 bg-purple w-[100%] md:w-20" /> */}
          <CustomButton color="#753CBD" textColor="white" className="w-full md:!w-20">
            Post
          </CustomButton>
        </div>
      </div>
      <div className="my-6">
        <input type="text" placeholder="Search For More Game" className="w-full p-4 border rounded-lg" />
      </div>
      <QuestionList questions={questions} onQuestionClick={handleQuestionClick} />
    </div>
  )
}

export default AllQuestion
