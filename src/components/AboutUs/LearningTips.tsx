import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

const LearningTips = () => {
  return (
    <div className="w-full max-w-[1320px] m-auto mt-0 lg:mt-12 p-5">
      <div className="flex flex-col md:flex-row md:gap-14">
        <div className="w-full md:w-[55%]">
          <div className="bg-about-us1 w-[350px] h-[400px] md:w-full md:h-full bg-contain bg-no-repeat"></div>
        </div>
        <div className="md:w-[45%] md:mt-12">
          <div className="border-l border-lime-green rounded py-1 px-2 text-lime-green bg-off-green text-base font-normal w-full max-w-[182px]">
            <p>Welcome to MojiGurukul</p>
          </div>
          <h1 className="text-3xl md:text-[56px] md:leading-[67px] font-semibold text-black w-full max-w-[460px] mt-5 mb-7">
            Zero Pressure{' '}
            <b className="relative text-lime-green">
              Learning
              <Image
                src="/assets/images/about-us/lines.svg"
                alt="moji"
                width={152}
                height={14}
                className="absolute -bottom-3 right-[18px]"
              />
            </b>
          </h1>
          <p className="text-mist text-xl leading-[22px]">
            We have taken away the pressure cooker-based approach to learning and replaced it with a system that is engaging, interactive
            and only requires 15 minutes of your day.
          </p>
          <div>
            {LEARNING_POINTS.map((point) => (
              <div key={point.id} className="flex items-center gap-4">
                <div
                  className={classNames('w-12 h-12 rounded flex justify-center items-center', {
                    'bg-lime-green': point.id === 1,
                    'bg-lite-red': point.id === 2,
                    'bg-primary': point.id === 3,
                  })}
                >
                  <Image src="/assets/images/about-us/tick.svg" alt="play" width={18} height={22} />
                </div>
                <div className="w-[85%] mt-5">
                  <h3 className="text-lite-black text-xl leading-[30px]">{point.title}</h3>
                  <p className="text-mist text-base">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningTips

const LEARNING_POINTS = [
  {
    id: 1,
    title: 'Boost Retention',
    description: 'Thanks to our game-inspired approach, students can remember more without extra effort.',
  },
  {
    id: 2,
    title: 'Enhance Creativity',
    description:
      'By encouraging creative thinking and innovation, we help our students express themselves and find new ways to think about learning.',
  },
  {
    id: 3,
    title: 'Real-World Application',
    description: 'Our curriculum includes practical scenarios that prepare students for the real world, not just exams.',
  },
]
