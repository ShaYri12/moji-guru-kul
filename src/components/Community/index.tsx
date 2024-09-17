import React from 'react'
import BreadCrumb from '@/components/common/BreadCrumbV2'
import QuestionSection from './@QuestionSection'
import Header from './@header'

const Index = () => {
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-between items-center p-6">
        <div className="horizontal-spacing flex justify-between">
          <BreadCrumb text="Community" />
          <div className="border-2 border-purple rounded-md p-2 px-4 mt-4 sm:mt-0">
            <p className="text-purple">Invite Friend</p>
          </div>
        </div>
      </div>
      <Header />
      <div className="horizontal-spacing">
        <QuestionSection />
      </div>
    </>
  )
}

export default Index
