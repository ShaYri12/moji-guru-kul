'use client'
import VideoCard from '@/components/common/Cards/VideoCard'
import CustomButton from '@/components/common/CustomButton'
import Image from 'next/image'
import { useState } from 'react'

const Assignment = () => {
  const [activeTab, setActiveTab] = useState('Comments')
  const [selected, setSelected] = useState(0)

  const renderContent = () => {
    switch (activeTab) {
      case 'Comments':
        return (
          <div className="my-4 px-4">
            <textarea
              id="description"
              rows={5}
              className="w-full md:w-[95%] sm:w-[95%] p-2  sm:text-sm outline-none rounded-lg text-gray-500 bg-gray-100 my-4"
              placeholder="Comment is Here"
            ></textarea>
            <div className="flex justify-end mr-10">
              <CustomButton variant="contained" color="#753CBD" textColor="#fff" className="!w-[10%] !rounded px-2" onClick={() => {}}>
                Post
              </CustomButton>
            </div>

            <div className="flex items-center justify-between m-3">
              <div className="flex items-center sm:gap-4 gap-2">
                <Image
                  className="w-16 h-16 rounded-xl"
                  src="/img/profile.png"
                  alt="Profile"
                  width={50}
                  height={50}
                  sizes="100vw"
                  quality={80}
                  loading="lazy"
                />
                <div>
                  <h1 className="w-[230px] sm:w-[350px] text-2xl font-normal text-black hover:opacity-80">Courtney Henry</h1>
                  <p className="text-sm md:text-xl sm:text-base font-normal text-gray-400">20h Ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-10">
                <Image src="/assets/icons/threedots.svg" alt="moji gurukul menu" width={24} height={24} />
              </div>
            </div>
            <textarea
              id="description"
              rows={3}
              className="w-full md:w-[95%] sm:w-[95%] p-5 sm:text-sm outline-none rounded-lg text-gray-500 bg-gray-100 my-4"
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ></textarea>

            <div className="flex items-center justify-between m-3">
              <div className="flex items-center sm:gap-4 gap-2">
                <Image
                  className="w-16 h-16 rounded-xl"
                  src="/img/profile.png"
                  alt="Profile"
                  width={50}
                  height={50}
                  sizes="100vw"
                  quality={80}
                  loading="lazy"
                />
                <div>
                  <h1 className="w-[230px] sm:w-[350px] text-2xl font-normal text-black hover:opacity-80">Courtney Henry</h1>
                  <p className="text-sm md:text-xl sm:text-base font-normal text-gray-400">20h Ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-10">
                <Image src="/assets/icons/threedots.svg" alt="moji gurukul menu" width={24} height={24} />
              </div>
            </div>
            <textarea
              id="description"
              rows={3}
              className="w-full md:w-[95%] sm:w-[95%] p-5  sm:text-sm outline-none rounded-lg text-gray-500 bg-gray-100 my-4"
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ></textarea>
          </div>
        )
      case 'Attachment':
        return (
          <div className=" flex flex-row gap-4 mt-4 p-2 sm:p-4 rounded-lg">
            <div className="flex items-center sm:gap-4 gap-2 border-2 border-gray-100 w-[170px] rounded-md">
              <Image
                className="w-10 h-10 rounded-xl"
                src="/assets/icons/file-icon.svg"
                alt="Profile"
                width={30}
                height={30}
                sizes="100vw"
                quality={80}
                loading="lazy"
              />
              <div>
                <h1 className="text-xs sm:text-xl font-normal text-black hover:opacity-80">Task Brief</h1>
                <p className="text-xs sm:text-xl md:text-sm sm:text-base font-normal text-gray-400">1.5 Mb . Download</p>
              </div>
            </div>
            <div className="flex items-center sm:gap-4 gap-2 border-2 border-gray-100 w-[170px] rounded-md">
              <Image
                className="w-10 h-10 rounded-xl"
                src="/assets/icons/file-icon.svg"
                alt="Profile"
                width={30}
                height={30}
                sizes="100vw"
                quality={80}
                loading="lazy"
              />
              <div>
                <h1 className="text-xs sm:text-xl font-normal text-black hover:opacity-80">Task Brief</h1>
                <p className="text-xs sm:text-xl md:text-sm sm:text-base font-normal text-gray-400">1.5 Mb . Download</p>
              </div>
            </div>
          </div>
        )
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

  return (
    <div className="flex justify-center horizontal-spacing top-spacing">
      <div className="shadow-lg rounded-lg my-12 w-9/12">
        <div className="flex justify-between items-center px-6 py-2 rounded-t-lg">
          <h1 className="text-4xl font-normal text-violet-700 flex-grow">Assignment</h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl flex justify-center items-center hover:opacity-80 cursor-pointer">
              <Image src="/assets/icons/cross-icon.svg" alt="moji gurukul menu" width={30} height={30} />
            </div>
          </div>
        </div>

        <hr />

        <div className="max-w-6xl mx-auto rounded-lg p-6">
          <div className="p-4">
            {/* "New" badge */}
            <div className="flex items-center mb-2">
              <span className="px-4 py-1 text-base font-normal bg-violet-100 text-violet-700">New</span>
            </div>

            {/* Assignment Title */}
            <h1 className="text-2xl sm:text-3xl font-normal text-violet-700 mb-2">Assignment Name</h1>

            {/* Subject Badge and Creator Info */}
            <div className="flex flex-wrap items-center space-x-2">
              <span className="border border-violet-500 text-violet-700 text-lg sm:text-xl font-normal px-2 py-1 rounded-md">SCIENCE</span>
              <span className="text-gray-400 font-normal text-xl sm:text-2xl">Created By</span>
              <span className="text-black font-normal text-xl sm:text-2xl">Michael Richards</span>
            </div>
          </div>

          <hr className="w-[95%]" />

          {[...Array(1)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row w-full md:w-[70%] items-center justify-between p-4 mb-4 rounded-2xl bg-white space-y-4 md:space-y-0 md:space-x-4"
            >
              <div className="w-full md:w-auto flex flex-col items-start md:items-center">
                <div>
                  <p className="text-sm md:text-lg text-green-600 font-normal">Created</p>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/assets/icons/calender-icon.svg" alt="moji gurukul menu" width={20} height={20} />
                  <p className="text-sm md:text-lg font-normal">May 20</p>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col items-start md:items-center">
                <div>
                  <p className="text-sm md:text-lg text-green-600 font-normal">Deadline</p>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/assets/icons/calender-icon.svg" alt="moji gurukul menu" width={20} height={20} />
                  <p className="text-sm md:text-lg font-normal">May 20</p>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col items-start md:items-center">
                <div>
                  <p className="text-sm md:text-lg text-green-600 font-normal">Total Point</p>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/assets/icons/star-icon.svg" alt="moji gurukul menu" width={24} height={24} />
                  <p className="text-sm md:text-lg font-normal">+4</p>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col items-start md:items-center">
                <div>
                  <p className="text-sm md:text-lg text-green-600 font-normal">Total Point</p>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/assets/icons/star-icon.svg" alt="moji gurukul menu" width={24} height={24} />
                  <p className="text-sm md:text-lg font-normal">+0</p>
                </div>
              </div>

              <div className="text-left md:text-center mt-2 md:mt-0">
                <p className="text-lg text-green-600 font-normal">Group</p>
                <div className="relative flex w-[210px] md:w-[110px]">
                  <div className="w-[22px] h-[22px] md:w-12 md:h-12 rounded-full flex justify-center items-center">
                    <Image src="/assets/images/landing-page/avater-1.svg" alt="moji gurukul" width={24} height={24} />
                  </div>
                  <div className="absolute right-44 md:right-12 w-[22px] h-[22px] md:w-12 md:h-12 rounded-full flex justify-center items-center">
                    <Image src="/assets/images/landing-page/avater-2.svg" alt="moji gurukul" width={24} height={24} />
                  </div>
                  <div className="absolute right-40 md:right-8 w-[22px] h-[22px] md:w-12 md:h-12 rounded-full flex justify-center items-center">
                    <Image src="/assets/images/landing-page/avater-3.svg" alt="moji gurukul" width={24} height={24} />
                  </div>
                  <div className="absolute right-36 md:right-4 w-[22px] h-[22px] md:w-12 md:h-12 rounded-full flex justify-center items-center">
                    <Image src="/assets/images/landing-page/avater-3.svg" alt="moji gurukul" width={24} height={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <hr className="w-[95%]" />

          <div className="my-4">
            <label className="text-3xl font-normal text-violet-700 flex-grow">Description</label>
            <textarea
              id="description"
              rows={5}
              className="w-full md:w-[95%] sm:w-[95%] p-2  sm:text-sm outline-none rounded-lg text-gray-500 bg-gray-100 my-4"
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ></textarea>
          </div>

          <div className="my-8">
            {/* Tab Menu */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('Comments')}
                className={`pb-2 text-lg sm:text-xl font-normal ${
                  activeTab === 'Comments' ? 'text-violet-600 border-b-2 border-violet-600' : 'text-violet-500'
                }`}
              >
                Comments
              </button>
              <button
                onClick={() => setActiveTab('Attachment')}
                className={`pb-2 text-lg sm:text-xl font-normal ${
                  activeTab === 'Attachment' ? 'text-violet-600 border-b-2 border-violet-600' : 'text-violet-500'
                }`}
              >
                Attachment
              </button>
              <button
                onClick={() => setActiveTab('Video Explanation')}
                className={`pb-2 text-lg sm:text-xl font-normal ${
                  activeTab === 'Video Explanation' ? 'text-violet-600 border-b-2 border-violet-600' : 'text-violet-500'
                }`}
              >
                Video Explanation
              </button>
            </div>

            {/* Content Area */}
            {renderContent()}
          </div>

          <hr className="w-[95%]" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-8">
            <button
              className="w-full sm:!w-[15%] !rounded px-4 py-2 border-2 border-violet-600 !text-lg sm:!text-xl !font-normal !text-[#753CBD] !bg-[#F1ECF8]"
              onClick={() => {}}
            >
              Need Help
            </button>
            <button
              className="w-full sm:!w-[15%] !rounded px-4 py-2.5 !text-lg sm:!text-xl !font-normal !text-[#fff] !bg-[#753CBD]"
              onClick={() => {}}
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
