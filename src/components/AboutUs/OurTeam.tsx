import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

const OurTeam = () => {
  return (
    <div className="w-full max-w-[1320px] m-auto p-5 my-[70px]">
      <h1 className="text-black text-3xl md:text-[56px] font-bold md:leading-[67px] text-center mb-6 md:mb-[60px]">
        Meet the Founder and team of experts
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEAM_DATA.map((team) => (
          <div key={team.id} className="shadow-tiles rounded-[15px] transition-all duration-300 hover:transform hover:scale-y-105 group">
            <div
              className={classNames(
                'relative bg-no-repeat bg-cover w-full h-[300px] cursor-default flex justify-center items-end rounded-tl-[15px] rounded-tr-[15px]',
                {
                  'bg-bottom': team.id === 4,
                }
              )}
              style={{ backgroundImage: `url(${team.image})` }}
            >
              <div className="hidden absolute -bottom-6 w-[50px] h-12 rounded-full bg-indigo border-[1.5px] border-white justify-center items-center group-hover:flex">
                <Image src="/assets/icons/linkedin-white.svg" alt="linkedin" width={20} height={20} />
              </div>
            </div>
            <div className="text-center px-7 py-6">
              <h4 className="text-lite-black text-[28px] font-normal leading-[42px]">{team.name}</h4>
              <h6 className="text-[#49444E] text-xl leading-[30px] font-normal mb-1 mt-0.5">{team.role}</h6>
              <p className="text-mist text-lg">{team.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurTeam

const TEAM_DATA = [
  {
    id: 1,
    name: 'Namit Kapoor',
    role: 'Founder',
    image: '/assets/images/about-us/member1.png',
    description: `Namit is a certified educator with a unique global footprint that spans nearly a dozen countries.`,
  },
  {
    id: 2,
    name: 'Suneet Shivaprasad',
    role: 'Project Developer',
    image: '/assets/images/about-us/member2.png',
    description: `Suneet is a global consultant and entrepreneurial powerhouse with a clientele that includes Cirque du Soleil, Tesco and Bulgari.`,
  },
  // {
  //   id: 3,
  //   name: 'Suneet Shivaprasad',
  //   role: 'Project Developer',
  //   image: '/assets/images/about-us/member2.png',
  //   description: `As a serial entrepreneur and C-Level Executive with over 11 years' experience, he has worked as a consultant with EF.`,
  // },
  {
    id: 4,
    name: 'Arun Kumar',
    role: 'Senior Coach & Motivator',
    image: '/assets/images/about-us/member3.png',
    description: `Arun has over a dozen years of experience in teaching people soft skills like leadership, communication and problem solving.`,
  },
  {
    id: 5,
    name: 'Lori Figueiredo',
    role: 'Psychologist & Special Advisor',
    image: '/assets/images/about-us/member4.png',
    description: `Lori's work over the past three decades has spanned over more than 50 organizations in 15 different industries.`,
  },
  {
    id: 6,
    name: 'Steve Foskett',
    role: 'Research & Development',
    image: '/assets/images/about-us/member5.png',
    description: `Steve has spent over 35 years building e-learning experiences and career solutions all over the world.`,
  },
]
