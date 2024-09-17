import { nordeco } from '@/app/font'
import { useCareerStore } from '@/store/careerStore'
import { QuizTypes } from '@/utils/types'
import classNames from 'classnames'
import React, { use, useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton'
import { CareerSteps } from '@/utils/enum'
import { useErrorStore } from '@/store/errorStore'
import { useAuthStore } from '@/store/authStore'

const TakeQuiz = () => {
  // state
  const [selectedOption, setSelectedOption] = useState('')
  const [selectIndex, setSelectIndex] = useState(0)
  // store
  const user = useAuthStore((state) => state.user)
  const quizzes = useCareerStore((state) => state.quizzes)
  const careerDetails = useCareerStore((state) => state.careerDetail)
  const selectedAnswers = useCareerStore((state) => state.selectedAnswers)
  const setSelectedAnswers = useCareerStore((state) => state.setSelectedAnswers)
  const loading = useCareerStore((state) => state.loading)
  const setCareerStep = useCareerStore((state) => state.setCareerStep)
  const setError = useErrorStore((state) => state.setAlert)
  const submitQuiz = useCareerStore((state) => state.submitQuiz)

  const getCorrectAnswer = (quiz: QuizTypes, selectedOption: string, questionIndex: number) => {
    const _correctAnswer = quiz.options.find((option) => option.toLocaleLowerCase() === quiz.answer.toLocaleLowerCase())
    if (selectedOption === _correctAnswer) {
      setSelectedOption(selectedOption.toLocaleLowerCase())
      setSelectIndex(questionIndex)
      setSelectedAnswers([...selectedAnswers, selectedOption.toLocaleLowerCase()])
      console.log('Correct Answer')
    } else {
      console.log('Wrong Answer')
    }
  }

  return (
    <div className="max-w-[1300px] m-auto px-5 mt-[10%]">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className={classNames(nordeco.className, 'flex gap-2 items-center font-bold')}>
          <p>Career:</p>
          <p>{careerDetails.name}</p>
        </div>

        {quizzes && quizzes.quizes && quizzes.quizes.length ? (
          <div className="flex flex-col gap-10">
            {quizzes.quizes.map((quiz, i) => (
              <div key={quiz.question} className={classNames(nordeco.className, 'shadow-grade-box p-4')}>
                <h3 className="font-bold mb-4">{quiz.question}</h3>
                <div className="flex flex-wrap gap-5">
                  {quiz.options.map((option) => (
                    <div
                      key={option}
                      className={classNames('shadow-md text-lite-gray p-6 rounded cursor-pointer', {
                        'border-2 border-lime-green':
                          (selectedOption.toLocaleLowerCase() === option.toLocaleLowerCase() && selectIndex === i) ||
                          selectedAnswers.includes(option.toLocaleLowerCase()),
                      })}
                      onClick={(e: any) => {
                        const selectedOption = e.target.textContent
                        getCorrectAnswer(quiz, selectedOption, i)
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          'Loading...'
        )}
        <div className="flex gap-4 mt-5">
          <CustomButton onClick={() => {}} height="36px" color="transparent" className="w-[150px]">
            Skip
          </CustomButton>
          <CustomButton
            onClick={async () => {
              if (!user?.id) return setError({ message: 'User not found', type: 'error' })
              const isAllAnswered = quizzes.quizes.length === selectedAnswers.length
              if (isAllAnswered) {
                await submitQuiz({ userId: user.id, careerId: careerDetails.id, isFlowCompleted: true })
                setSelectedAnswers([])
                setCareerStep(CareerSteps.CareerResult)
                return
              }
              return setError({ message: 'Please answer all questions', type: 'error' })
            }}
            height="36px"
            className="w-[170px]"
            loading={loading}
          >
            Submit
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default TakeQuiz
