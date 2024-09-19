'use client'
import VideoCard from '@/components/common/Cards/VideoCard'
import CustomButton from '@/components/common/CustomButton'
import Image from 'next/image'
import { useState } from 'react'
import { LuDot } from 'react-icons/lu'
import { GoPlus } from 'react-icons/go'
import CommentTab from './CommentTab'
import AttachmentTab from './AttachmentTab'

const Assignment = () => {
  const [activeTab, setActiveTab] = useState('Comments')
  const [selected, setSelected] = useState(0)

  const renderContent = () => {
    switch (activeTab) {
      case 'Comments':
        return <CommentTab />
      case 'Attachment':
        return <AttachmentTab />
      case 'Video Explanation':
        return (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex flex-wrap justify-center">
              {Videos.map((video, index) => (
                <VideoCard
                  key={index}
                  title={''}
                  role={''}
                  thumbnail={''}
                  videoPath={video.videoPath}
                  selected={selected === index}
                  onClick={() => {
                    setSelected(index)
                  }}
                />
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const maxImagesToShow = 4
  const remainingImagesCount = imageData.length - maxImagesToShow

  return (
    <div className="flex justify-center horizontal-spacing top-spacing">
      <div className="rounded-[15px] overflow-hidden lg:mb-[100px] mb-[50px] w-9/12" style={{ boxShadow: '0px 0px 16px 0px #00000014' }}>
        <div className="flex justify-between items-center p-[24px] border-b-[#EEEEEE] border-b">
          <h1 className="text-[36px] font-[500] text-purple leading-[48px] tracking-[2%] flex-grow">Assignment</h1>
          <div className="w-[40] h-[40] rounded-xl flex justify-center items-center transition hover:opacity-80 cursor-pointer">
            <Image src="/assets/icons/cross-icon.svg" alt="moji gurukul menu" width={30} height={30} />
          </div>
        </div>

        <div className="max-w-6xl mx-auto rounded-lg lg:py-[32px] py-[26px] lg:px-[40px] px-[20px]">
          {/* "New" badge */}
          <div className="flex items-center mb-[6px]">
            <span className="px-3 py-[5px] flex items-center rounded-[4px] justify-center text-base tracking-[2%] font-normal bg-[#EDF5FF] text-[#4D9EFA]">
              <span className="">
                <LuDot size={18} strokeWidth={5} />
              </span>{' '}
              New
            </span>
          </div>

          {/* Assignment Title */}
          <h1 className="text-[24px] sm:text-[32px] sm:leading-[38.4px] font-[500] tracking-[2%] text-purple mb-2">Assignment Name</h1>

          {/* Subject Badge and Creator Info */}
          <div className="flex flex-wrap items-center gap-[16px] border-b border-b-[#D3D2D2] pb-[32px]">
            <span className="border border-purple text-purple text-[16px] sm:text-[18px] md:text-[20px] font-normal px-[8px] rounded-md">
              SCIENCE
            </span>
            <div>
              <span className="text-[#928F95] font-normal text-[18px] sm:text-[20px] md:text-[24px] sm:leading-[28.8px] tracking-[2%]">
                Created By
              </span>{' '}
              <span className="text-[#241F2B] font-normal text-[18px] sm:text-[20px] md:text-[24px] sm:leading-[28.8px] tracking-[2%]">
                Michael Richards
              </span>
            </div>
          </div>

          <div className="flex flex-wrap lg:gap-[40px] md:gap-[30px] gap-[16px] w-full items-start justify-start py-[32px] border-b border-b-[#D3D2D2] bg-white space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-auto flex flex-col items-start">
              <p className="text-[16px] md:text-[21px] md:leading-[36px] text-[#3D3842] font-[500] w-max">Created</p>
              <div className="flex items-center gap-[8px]">
                <Image src="/assets/icons/calender-icon.png" alt="moji gurukul menu" width={20} height={20} />
                <p className="text-sm md:text-[19px] text-[#928F95] md:leading-[24px] font-normal">May 19</p>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-start">
              <p className="text-[16px] md:text-[21px] md:leading-[36px] text-[#3D3842] font-[500] w-max">Deadline</p>
              <div className="flex items-center gap-[8px]">
                <Image src="/assets/icons/calender-icon.png" alt="moji gurukul menu" width={24} height={24} />
                <p className="text-sm md:text-[19px] text-[#928F95] md:leading-[24px] font-normal">May 20</p>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-start">
              <p className="text-[16px] md:text-[21px] md:leading-[36px] text-[#3D3842] font-[500] w-max">Total Point</p>
              <div className="flex items-center gap-[8px]">
                <Image src="/assets/icons/star-icon.png" alt="moji gurukul menu" width={22} height={22} />
                <p className="text-sm md:text-[19px] text-[#928F95] md:leading-[24px] font-normal">+4</p>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-start">
              <p className="text-[16px] md:text-[21px] md:leading-[36px] text-[#3D3842] font-[500] w-max">Total Point</p>
              <div className="flex items-center gap-[8px]">
                <Image src="/assets/icons/star-icon.png" alt="moji gurukul menu" width={22} height={22} />
                <p className="text-sm md:text-[19px] text-[#928F95] md:leading-[24px] font-normal">+0</p>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-start">
              <p className="text-[16px] md:text-[21px] md:leading-[36px] text-[#3D3842] font-[500] w-max">Group</p>
              <div className="relative flex space-x-[-11px]">
                {imageData.slice(0, maxImagesToShow).map((image, index) => (
                  <div
                    key={index}
                    className="w-[30px] h-[30px] md:w-[32px] md:h-[32px] rounded-full border-2 border-white overflow-hidden relative z-[2] flex justify-center items-center"
                    style={{ zIndex: index }}
                  >
                    <img src={image.src} alt={image.alt} className="h-full w-full" />
                  </div>
                ))}

                {remainingImagesCount > 0 && (
                  <div className="w-[30px] h-[30px] md:w-[32px] md:h-[32px] relative z-[5] md:w-[32px] md:h-[32px] rounded-full border-2 border-purple bg-[#F1ECF8] flex justify-center items-center text-[16px] font-medium text-[#4E4E50] -ml-2">
                    <span className="ml-[-1px] mt-[2px] flex items-center justify-center">
                      <GoPlus size={12} strokeWidth={1} className="mr-[-1px]" />
                      {remainingImagesCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:my-[32px] my-[20px]">
            <label className="text-[22px] md:text-[32px] md:leading-[38.4px] font-[500] text-purple flex-grow">Description</label>
            <div className="w-full md:text-[20px] rounded-[15px] text-[16px] lg:p-[24px] p-[20px] text-[#928F95] bg-[#FAF8FC] mt-[16px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </div>
          </div>

          <div className="my-[20px] md:my-[32px] border-b border-b-[#D3D2D2]">
            {/* Tab Menu */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('Comments')}
                className={`pb-[8px] text-[22px] md:text-[28px] text-purple font-[500] ${
                  activeTab === 'Comments' ? 'border-b-[4px] border-purple' : ''
                }`}
              >
                Comments
              </button>
              <button
                onClick={() => setActiveTab('Attachment')}
                className={`pb-[8px] text-[22px] md:text-[28px] text-purple font-[500] ${
                  activeTab === 'Attachment' ? 'border-b-[4px] border-purple' : ''
                }`}
              >
                Attachment
              </button>
              <button
                onClick={() => setActiveTab('Video Explanation')}
                className={`pb-[8px] text-[22px] md:text-[28px] text-purple font-[500] ${
                  activeTab === 'Video Explanation' ? 'border-b-[4px] border-purple' : ''
                }`}
              >
                Video Explanation
              </button>
            </div>

            {/* Content Area */}
            {renderContent()}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-[16px]">
            <button
              className="w-[178px] rounded-[8px] px-4 py-[14px] border-2 border-purple !text-lg sm:!text-xl !font-normal !text-purple !bg-[#F1ECF8]"
              onClick={() => {}}
              style={{
                boxShadow: `
                  4px 4px 6px 0px #FFFFFF33 inset, 
                  -4px -4px 6px 0px #FFFFFF29 inset, 
                  4px 4px 6px 0px #00000029
                `,
              }}
            >
              Need Help
            </button>
            <button
              className="w-[178px] rounded-[8px] px-4 py-[14px] !text-lg sm:!text-xl !font-normal !text-[#fff] !bg-purple"
              onClick={() => {}}
              style={{
                boxShadow: `
                  4px 4px 6px 0px #FFFFFF33 inset, 
                  -4px -4px 6px 0px #FFFFFF29 inset, 
                  4px 4px 6px 0px #00000029
                `,
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assignment

const imageData = [
  { src: '/assets/images/landing-page/avater-1.svg', alt: 'Image 1' },
  { src: '/assets/images/landing-page/avater-2.svg', alt: 'Image 2' },
  { src: '/assets/images/landing-page/avater-3.svg', alt: 'Image 3' },
  { src: '/assets/images/landing-page/avater-3.svg', alt: 'Image 4' },
  { src: '/assets/images/landing-page/avater-3.svg', alt: 'Image 5' },
  { src: '/assets/images/landing-page/avater-3.svg', alt: 'Image 6' },
  { src: '/assets/images/landing-page/avater-3.svg', alt: 'Image 7' },
  { src: '/assets/images/landing-page/avater-3.svg', alt: 'Image 8' },
]

type FeatureType = {
  id: number
  title: string
  content: string
  icon: string
  'title-te': string
  'description-te': string
}
export const FEATURES: FeatureType[] = [
  {
    id: 1,
    title: 'Assignments On Time',
    content: 'Completed',
    icon: '/assets/icons/assignment-progress.svg',
    'title-te': 'గేమిఫైడ్ లెర్నింగ్',
    'description-te': 'లెర్నింగ్ అనేది ఇంటరాక్టివ్ గేమ్‌లతో ఆడుకుంటున్నట్లు ఉండేలా మేము ఒక ప్రపంచాన్ని సృష్టించాము.',
  },
  {
    id: 2,
    title: 'Topics Completed',
    content: 'Out of 50 Topic',
    icon: '/assets/icons/assignment-progress.svg',
    'title-te': 'పర్సనలైజ్డ్ లెర్నింగ్ మార్గాలు',
    'description-te': 'ఏ రెండు కలలు ఒకేలా ఉండవు. అందుకే మా స్టూడెంట్స్ యొక్క కెరీర్ ఆశలకు అనుగుణంగా మా లెస్సన్ లను తీర్చిదిద్దుతాం.',
  },
  {
    id: 3,
    title: 'Improved  Numeracy',
    content: 'Total',
    icon: '/assets/icons/assignment-progress.svg',
    'title-te': 'కార్యాచరణాత్మక ఇన్ సైట్ లు మరియు రిపోర్ట్ లు',
    'description-te': 'మా సమగ్ర రిపోర్ట్ లు లెర్నింగ్ ప్రాసెస్ ను సులభతరం చేస్తాయి, ఖచ్చితమైన, ఆచరణాత్మక దశలను అందిస్తాయి.',
  },
  {
    id: 4,
    title: 'Improved Literacy',
    content: 'Total',
    icon: '/assets/icons/assignment-progress.svg',
    'title-te': 'జీరో ప్రెషర్ అప్రోచ్',
    'description-te': 'మా వినూత్నమైన 15 నిమిషాల రోజువారీ పాఠాలు లెర్నింగ్ ను గరిష్టంగా పెంచడానికి రూపొందించబడ్డాయి.',
  },
  {
    id: 5,
    title: 'Total Games Time',
    content: '2 hour over the Limit',
    icon: '/assets/icons/assignment-progress.svg',
    'title-te': 'హోలిస్టిక్ గ్రోత్',
    'description-te': 'స్టూడెంట్స్ ను లైఫ్ కోసం సిద్ధం చేసే స్కిల్స్ మరియు విలువలను పెంపొందించడానికి మేము విద్యకు మించి వెళ్తాము.',
  },
  {
    id: 6,
    title: 'Total Platform Time',
    content: '1 Hour Bellow the Limit',
    icon: '/assets/icons/assignment-progress.svg',
    'title-te': 'షేర్డ్ లెర్నింగ్',
    'description-te': 'మిమ్మల్ని వాళ్ళతో దగ్గర చేసే యాక్టివిటీ లు మరియు ఇన్ సైట్ లతో మీ పిల్లల విద్యా ప్రయాణంలో భాగం అవ్వండి.',
  },
]

const Videos = [
  {
    title: 'Leslie Alexander',
    role: 'Parents',
    thumbnail: '/assets/images/landing-page/story1-thumbnail.png',
    videoPath: '/assets/videos/landing-page-demo.mp4',
  },
]
