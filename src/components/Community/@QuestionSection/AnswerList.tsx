import React, { useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';

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

interface AnswerListProps {
  question: Question;
}

const AnswerList: React.FC<AnswerListProps> = ({ question }) => {
  const [sortOption, setSortOption] = useState('Newest');

  return (
    <div className="bg-white rounded-xl p-4 border-2 border-gray-200 w-full">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-black">Answers (3)</h4>
        <select
          className="p-2 border rounded-lg bg-white text-[#6D6A71]"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="Newest">Newest</option>
          <option value="Last 24 hours">Last 24 hours</option>
          <option value="All">All</option>
        </select>
      </div>
      {[1, 2, 3].map((answer, index) => (
        <div key={index} className="flex items-start mb-4">
          <div className={`min-w-10 min-h-10 rounded-full ${question.avatar} flex items-center justify-center mr-4`}>
            <span className="text-white text-lg font-bold">C</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="text-md font-semibold text-black text-[14px] md:text-[16px]">{question.name}</h5>
                <p className="text-gray-500 text-sm  text-[11px] md:text-[16px]">{question.time}</p>
              </div>
              <CiMenuKebab className="text-gray-500 transform rotate-90 cursor-pointer" />
            </div>
            <p className="text-[#A5A4A7] mt-2 text-[14px] md:text-[16px]">This helps readers quickly identify replies from the author, promoting more extensive discussions.</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnswerList;
