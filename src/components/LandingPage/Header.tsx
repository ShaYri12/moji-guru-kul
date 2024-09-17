'use client'
import { CircleGraph, JoySvg, JoySvgTe, LevelUpIcon, MenuDots, RatingStart, Start } from '@/svg'
import React, { useLayoutEffect, useState } from 'react'
import CustomButton from '../common/CustomButton'
import Image from 'next/image'
import VideoModal from '../common/VideoModal'
import classNames from 'classnames'
import { useLocale, useTranslations } from 'next-intl'
import { LanguageEnum } from '@/utils/enum'
import { usePathname, useRouter } from 'next/navigation'
import { useUniversalStore } from '@/store/universalStore'
import SignupPopup from '../common/SignupPopup'

const colors = ['#FBCC58', '#4D9EF9', '#eab308', '#22CC9B', '#ef6b74', '#F472B6', '#A78BFA', '#818CF8', '#34D399', '#10B981', '#3B82F6']

const Header = () => {
  const t = useTranslations('Home')
  const pathname = usePathname()
  const locale = useLocale()
  const router = useRouter()

  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [randomColor, setRandomColor] = useState('')
  const [currentColorIndex, setCurrentColorIndex] = useState(0)
  const { setIsSignupPopupOpen } = useUniversalStore()

  useLayoutEffect(() => {
    getRandomColor()
  }, [])

  const getRandomColor = () => {
    if (currentColorIndex === colors.length - 1) {
      setCurrentColorIndex(0)
    } else {
      setCurrentColorIndex(currentColorIndex + 1)
    }
    console.log('currentColorIndex', currentColorIndex)
    setRandomColor(colors[currentColorIndex])
  }

  return (
    <div className={classNames('bg-header-bg bg-no-repeat bg-contain min-h-[695px] mt-12 md:mt-[100px]')}>
      <div className="flex flex-col-reverse min-[1170px]:flex-row gap-6 justify-between items-center">
        <div className="w-full min-[1170px]:w-[42%] mt-5  min-[1170px]:mt-0 max-w-[457px]">
          {/* <div className="bg-magnolia rounded-2xl py-2.5 px-3 mb-5 md:w-[78%] flex items-center gap-3">
            <div className="flex gap-1.5">
              <Image src="/assets/images/landing-page/hot-icon.svg" alt="moji gurukul" width={13} height={12} />
              <div className="bg-[#1FBA8D] border-2 border-[#C4FDE6] text-white text-sm font-normal rounded-[20px] w-[61px] h-6 flex justify-center items-center pt-1">
                Hot!
              </div>
            </div>
            <p className="text-lite-black text-lg font-normal leading-7">Stay connected and get 40% off</p>
          </div> */}
          <p
            className={classNames(
              'text-lite-black text-[40px] md:text-[64px] font-bold leading-[120%] tracking-[0.8px] md:tracking-[1.28px] w-full max-w-[315px] sm:max-w-full',
              {
                'lg:!text-[56px]': locale === LanguageEnum.Te,
              }
            )}
          >
            {t('title.discover')}
            <span
              className={classNames('relative inline-block top-[17px] left-1 cursor-default', {
                '!block': locale === LanguageEnum.Te,
              })}
              onClick={getRandomColor}
            >
              {locale === LanguageEnum.Te ? (
                <JoySvgTe fill={randomColor} className="hidden md:block" />
              ) : (
                <JoySvg fill={randomColor} className="hidden md:block" />
              )}
              {locale === LanguageEnum.Te ? (
                <JoySvgTe fill={randomColor} className="block md:hidden" width="260" height="62" />
              ) : (
                <JoySvg fill={randomColor} width="84" height="50" className="block md:hidden" />
              )}
              <span
                className={classNames('joy-transform absolute text-white', {
                  'joy-transform-te': locale === LanguageEnum.Te,
                })}
              >
                {t('title.joy')}
              </span>
            </span>
            <br />
            {t('title.learning')}
          </p>
          <p className="text-mist text-base md:text-lg font-normal leading-[27px] tracking-[0.4px] md:tracking-[0.48px] mt-[14px] md:mt-6 w-full md:max-w-[320px]">
            {t('slogan')}
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 mt-8 text-white">
            <CustomButton
              variant="contained"
              color="#753CBD"
              className={classNames('sm:!w-[150px] text-vista-white text-xl !font-normal tracking-[0.48px]', {
                'sm:!w-[160px] !h-16': locale === LanguageEnum.Te,
              })}
              onClick={() => {
                setIsSignupPopupOpen(true)
              }}
            >
              {t('tryForFree')}!
            </CustomButton>
            <SignupPopup />

            <div className="flex gap-3 items-center">
              <div className="play-icon relative  flex justify-center items-center cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                <Image src="/assets/icons/play-icon.svg" alt="play" width={52} height={52} className="absolute top-3 left-0.5" />
              </div>
              <span className="text-lite-black text-xl font-normal leading-[120%] tracking-[0.4px] cursor-default">{t('howItWorks')}</span>
            </div>
            <VideoModal
              open={isVideoOpen}
              setOpen={(val: boolean) => setIsVideoOpen(val)}
              videoPath="/assets/videos/landing-page-demo.mp4"
            />
          </div>
        </div>
        <div className="relative w-full min-[1170px]:w-[58%] flex gap-6 sm:gap-8 md:gap-12 justify-center xl:justify-end h-full">
          <div>
            <div className="flex gap-1.5 md:gap-3 mb-4 md:mb-8">
              <div className="relative flex w-[52px] md:w-[110px]">
                <div className="w-[22px] h-[22px] md:w-12 md:h-12 bg-yellow-200 rounded-full flex justify-center items-center">
                  <Image src="/assets/images/landing-page/avater-1.svg" alt="moji gurukul" width={48} height={48} />
                </div>
                <div className="absolute right-4 md:right-8 w-[22px] h-[22px] md:w-12 md:h-12 bg-red-200 rounded-full flex justify-center items-center">
                  <Image src="/assets/images/landing-page/avater-2.svg" alt="moji gurukul" width={48} height={48} />
                </div>
                <div className="absolute right-0 w-[22px] h-[22px] md:w-12 md:h-12 bg-blue-200 rounded-full flex justify-center items-center">
                  <Image src="/assets/images/landing-page/avater-3.svg" alt="moji gurukul" width={48} height={48} />
                </div>
              </div>
              <div>
                <p className="text-lite-black text-xs md:text-lg font-normal leading-[150%] tracking-[0.167px] md:tracking-[0.36px]">
                  Our Happy Parents
                </p>
                <div className="flex gap-1 items-baseline">
                  <Start />
                  <p className="text-[#646464] text-[10px] md:text-base font-normal leading-[150%] tracking-[0.148px] md:tracking-[0.32px]">
                    4.8 <span className="text-[#969696]">(1.380 Review)</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="relative bg-header-border-green bg-no-repeat bg-contain h-[192px] w-[118px] md:h-[420px] md:w-[260px] flex justify-center items-center">
              <div className="absolute top-[32px] left-[1px] md:top-[17%] md:left-[3px] bg-lime-green w-2 h-2 md:w-4 md:h-4 rounded-full" />
              <div className="bg-lime-green rounded-full h-[175px] w-[106px] md:h-[380px] md:w-[230px]">
                <Image src="/assets/images/landing-page/girl.svg" alt="moji gurukul" width={230} height={380} />
              </div>
              <div className="card-filter absolute -left-[27%] -bottom-3 md:-left-[78px] md:-bottom-2 bg-white w-[68px] h-[95px] md:w-[133px] md:h-[184px] rounded-xl md:rounded-2xl p-3 flex flex-col gap-1 md:gap-3 justify-center items-center">
                <p className="text-lite-black text-[10px] md:text-sm font-normal text-center leading-[150%]">Leaderboard</p>
                <div className="relative w-6 h-6 md:w-14 md:h-14">
                  <div className="bg-white shadow-sm w-5 h-5 md:w-12 md:h-12 rounded-full flex justify-center items-center">
                    <Image src="/assets/images/landing-page/user-img.svg" alt="moji gurukul" width={48} height={48} />
                  </div>
                  <div className="hidden md:block absolute -top-2 right-1">
                    <RatingStart />
                  </div>
                  <div className="md:hidden absolute -top-1 right-[1px]">
                    <RatingStart width="13" height="13" />
                  </div>
                </div>
                <div>
                  <p className="text-indigo text-[10px] md:text-sm font-normal leading-[150%]">Danish Se</p>
                  <div className="flex gap-1 items-center">
                    <div className="hidden md:block">
                      <LevelUpIcon />
                    </div>
                    <div className="md:hidden">
                      <LevelUpIcon width="8" height="8" />
                    </div>

                    <p className="text-slate text-[10px] md:text-xs font-normal leading-[150%]">1000</p>
                  </div>
                  <p className="text-lite-black text-[10px] md:text-sm font-normal text-center leading-[150%]">Level 10</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative bg-header-border-red bg-no-repeat bg-contain h-[192px] w-[118px] md:h-[420px] md:w-[260px] flex justify-center items-center">
            <div className="absolute top-[32px] left-[1px] md:top-[17%] md:left-[3px] bg-lite-red w-2 h-2 md:w-4 md:h-4 rounded-full" />
            <div className="bg-lite-red rounded-full h-[175px] w-[106px] md:h-[380px] md:w-[230px]">
              <Image src="/assets/images/landing-page/boy.svg" alt="moji gurukul" width={230} height={380} />
            </div>
            <div className="card-filter absolute -right-6 -bottom-5 md:-right-11 md:-bottom-3 bg-white w-[74px] h-[100px] md:w-[142px] md:h-[184px] rounded-xl md:rounded-2xl py-1 px-2 md:p-4 flex flex-col gap-1 md:gap-3 justify-center items-center">
              <div className="flex items-center justify-between w-full">
                <p className="text-lite-black text-[10px] md:text-sm font-normal text-center leading-[150%]">Progress</p>
                <MenuDots />
              </div>
              <div className="hidden md:block relative w-[73px] h-[73px]">
                <CircleGraph />
                <p className="text-lite-black text-xs text-center absolute top-[40%] right-[36%]">82%</p>
              </div>
              <div className="md:hidden relative w-[34px] h-[34px]">
                <CircleGraph width="34" height="34" />
                <p className="text-lite-black text-[10px] md:text-xs text-center absolute top-[22%] sm:top-[34%] right-[23%]">82%</p>
              </div>
              <div className="">
                <div className="text-lite-black text-[10px] md:text-sm font-normal leading-[150%] flex justify-around md:justify-between">
                  <p>10</p>
                  <p>05</p>
                </div>
                <div className="text-lite-black text-[8px] md:text-xs font-normal leading-[150%] flex justify-around md:justify-between gap-2 md:gap-4">
                  <p>Completed</p>
                  <p>Review</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-[30%] left-[30%] sm:-bottom-[24%] sm:left-[36%] min-[1170px]:-bottom-28 min-[1170px]:left-72">
            <Image
              src="/assets/images/landing-page/carved-arrow.svg"
              alt="moji gurukul"
              width={230}
              height={70}
              className="w-[182px] md:w-auto h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
