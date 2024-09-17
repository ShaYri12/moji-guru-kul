import { LearningActivityTypes } from '@/utils/types'
import Image from 'next/image'
import LessonCard from '../common/Cards/LessonCard'
import Slider from 'react-slick'
import classNames from 'classnames'
import { ArrowLongLeft, ArrowLongRight } from '@/svg'

const LearningActivities = ({ activities }: { activities: LearningActivityTypes[] }) => {
  return (
    <div>
      <div className="flex justify-between items-center mt-10 mb-11">
        <h3 className="text-indigo text-3xl md:text-[40px] font-medium">Your Lessons</h3>
        <div className="bg-soft-peach w-[43px] h-[40px] rounded flex justify-center items-center">
          <Image src="/assets/icons/calendar-indigo.svg" alt="Learning Hub" width={20} height={20} />
        </div>
      </div>
      {activities && activities.length ? (
        <div className="px-5">
          <Slider {...learningSliderSettings}>
            {activities.map((activity: LearningActivityTypes) => (
              <div key={activity.id} className={classNames('px-3 lg:px-4')}>
                <LessonCard activity={activity} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p>No lessons found</p>
      )}
    </div>
  )
}

export default LearningActivities

function SampleNextArrow(props: any) {
  const { className, onClick } = props
  return (
    <div
      className={classNames(
        '!rounded-full !w-9 md:!w-12 !h-9 md:!h-12 hover:!transition-all !flex justify-center items-center group',
        className
      )}
      onClick={onClick}
    >
      <span className="hidden group-hover:block">
        <ArrowLongRight />
      </span>
      <span className="block group-hover:hidden">
        <ArrowLongRight fill="#753CBD" />
      </span>
    </div>
  )
}

function SamplePrevArrow(props: any) {
  const { className, onClick } = props
  return (
    <div
      className={classNames(
        '!rounded-full !w-9 md:!w-12 !h-9 md:!h-12 hover:!transition-all !flex justify-center items-center group',
        className
      )}
      onClick={onClick}
    >
      <span className="hidden group-hover:block">
        <ArrowLongLeft fill="#fff" />
      </span>
      <span className="block group-hover:hidden">
        <ArrowLongLeft />
      </span>
    </div>
  )
}

export const learningSliderSettings = {
  dots: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: true,
  // autoplay: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}
