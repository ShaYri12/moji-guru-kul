import React, { useEffect } from 'react'
import RegisterTutorLayout from './RegisterTutorLayout'
import CustomInput from '@/components/common/CustomInput'
import { useTutorStore } from '@/store/tutorStore'
import CustomButton from '@/components/common/CustomButton'
import { IconButton } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'
import { TutorQuestionTypes } from '@/utils/types'

type QuestionScreenProps = {
  questions: TutorQuestionTypes[]
}

const QuestionScreen = ({ questions }: QuestionScreenProps) => {
  const tutor = useTutorStore((state) => state.tutor)
  const setTutor = useTutorStore((state) => state.setTutor)

  useEffect(() => {
    if (questions.length) {
      const userQuestionsAnswers = questions.map((question) => ({
        question: question.question,
        answer: '',
      }))
      setTutor({
        ...tutor,
        userQuestionsAnswers: userQuestionsAnswers,
      })
    }
  }, [questions])

  return (
    <RegisterTutorLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <div className="flex flex-col gap-7">
          {tutor.userQuestionsAnswers.map((question, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="capitalize">Question: {questions[index].question}</p>
              <CustomInput
                value={question.answer}
                onChange={(e) => {
                  const newQuestions = tutor.userQuestionsAnswers.map((q, i) => {
                    if (i === index) {
                      return {
                        ...q,
                        answer: e.target.value,
                      }
                    }
                    return q
                  })
                  setTutor({
                    ...tutor,
                    userQuestionsAnswers: newQuestions,
                  })
                }}
                placeholder="Enter your answer"
                error='Answer is required'
              />
            </div>
          ))}
        </div>
      </div>
    </RegisterTutorLayout>
  )
}

export default QuestionScreen
