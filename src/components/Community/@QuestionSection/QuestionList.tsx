import React from 'react';
import { FaRegEye, FaRegComment } from 'react-icons/fa';

interface Question {
  id: number;
  text: string;
  time: string;
  category: string;
  views: number;
  comments: number;
  avatar: string;
  name: string;
  role: string;
}

interface QuestionListProps {
  questions: Question[];
  onQuestionClick: (question: Question) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onQuestionClick }) => {
  return (
    <div>
      {questions.map((question) => (
        <div key={question.id} className="flex flex-col md:flex-row items-start mb-2 p-4 border rounded-lg cursor-pointer" onClick={() => onQuestionClick(question)}>
          <div className="flex justify-between items-center flex-col md:flex-row gap-4 w-full">
            <div className='w-full md:w-[50%]'>
              <h3 className="text-md font-semibold text-[#4D9EFA]">{question.text}</h3>
              <p className="text-gray-500 text-sm">{question.time} • <span className="text-purple font-semibold">{question.category}</span></p>
            </div>
            <div className="flex flex-row items-center w-full md:w-auto mt-4 md:mt-0">
              <div className='flex flex-col gap-2'>
                <div className='flex justify-center items-center gap-2'>
                  <FaRegEye className="text-purple mr-2" />
                  <span className="text-purple mr-4">{question.views}</span>
                </div>
                <div className='flex justify-center items-center gap-1'>
                  <FaRegComment className="text-purple mr-2" />
                  <span className="text-purple mr-4">{question.comments}</span>
                </div>
              </div>
              <div className="flex items-center ml-auto mt-2   md:mt-0">
                <div className={`w-12 h-12 rounded-full ${question.avatar} flex items-center justify-center mr-4`}>
                  <span className="text-white text-xl font-bold">C</span>
                </div>
                <div className='flex flex-col justify-start'>
                  <span className="text-[#241F2B] w-full font-semibold">{question.name}</span>
                  <span className="text-[#727272]">{question.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
