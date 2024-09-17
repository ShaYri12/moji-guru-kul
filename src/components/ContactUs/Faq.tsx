import React from 'react'
import CustomAccordion from '../common/Accordion'

const Faq = () => {
  return (
    <div className="bg-indigo py-5 md:py-[80px] mb-9">
      <div className="horizontal-spacing">
        <h2 className="text-white text-3xl md:text-[56px] text-center font-medium mb-[60px]">Frequently Asked Questions</h2>
        <div className="flex gap-8 flex-wrap">
          {FAQS.map((faq) => (
            <div key={faq.id} className='flex-grow-0 flex-shrink-0 basis-full lg:basis-[48%]'>
              <CustomAccordion key={faq.id} title={faq.title} description={faq.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Faq

const FAQS = [
  {
    id: 1,
    title: 'How do you personalise the lessons?',
    description:
      'Moji is a platform that helps students learn and master concepts in Math and Science. We provide personalized learning experiences for students.',
  },
  {
    id: 2,
    title: 'What curriculum do you follow?',
    description: 'All the main curriculums: CBSE ICSE (coming soon after 6 months) State board (coming soon after 6 months) ',
  },
  {
    id: 3,
    title: 'Do you have specific princing plans to show?',
    description: 'Yes, we have different pricing plans for students and parents. You can check them out on our pricing page.',
  },
  {
    id: 4,
    title: 'Do you have specific princing plans to show?',
    description: 'Yes, we have different pricing plans for students and parents. You can check them out on our pricing page.',
  },
  {
    id: 5,
    title: 'What happens during the free trial?',
    description: 'During the free trial, you will have access to all the features of Moji for 7 days.',
  },
  {
    id: 6,
    title: 'Do I need to enter my credit card information?',
    description: 'Yes, we ask for credit card information to make sure an adult is approving registration.',
  },
  {
    id: 7,
    title: ' Learning Assessment included in the free trial?',
    description: 'Yes, we have different pricing plans for students and parents. You can check them out on our pricing page.',
  },
  {
    id: 8,
    title: 'Can I change plans or cancel any time?',
    description: 'Yes, you can change plans or cancel your subscription at any time.',
  },
]
