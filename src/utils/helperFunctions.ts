import { useAuthStore } from '@/store/authStore'
import { useCareerStore } from '@/store/careerStore'
import { useCartStore } from '@/store/cartStore'
import { useEducatorStore } from '@/store/educatorStore'
import { useGameStore } from '@/store/gameStore'
import { useMilestoneStore } from '@/store/milestoneStore'
import { useParentStore } from '@/store/parentStore'
import { useStudentStore } from '@/store/studentStore'
// import { cookies } from 'next/headers'

export const normalizeGameUrl = (gameUrl: string, tokenId: string) => {
  if (!gameUrl || !tokenId) return '#'

  const flow = gameUrl?.split('flow=')[1]?.split('&')[0]
  let isGame = gameUrl?.split('isGame=')[1]?.split('&')[0]
  let gameType = gameUrl?.split('gameType=')[1]?.split('&')[0]
  const role = gameUrl?.split('role=')[1]?.split('&')[0]
  const activityDetails = gameUrl?.split('activityDetails=')[1]?.split('&')[0]
  let _isGame = isGame?.toLowerCase() === 'true' ? true : false
  const userId = gameUrl?.split('userId=')[1]
  const locale = document.cookie.split('NEXT_LOCALE=')[1]?.split(';')[0]
  // get locale from gameUrl
  const localeFromUrl = gameUrl?.split('language=')[1]?.split('&')[0]
  console.log('localeFromUrl---------------------------------/', localeFromUrl)

  if (gameType?.toLowerCase() === 'wordsearch') {
    gameType = 'WordSearch'
  } else if (gameType?.toLowerCase() === 'crossword') {
    gameType = 'Crossword'
  } else if (gameType?.toLowerCase() === 'quiz') {
    gameType = 'Quiz'
  } else if (gameType?.toLowerCase() === 'material') {
    gameType = 'Material'
  }

  if (localeFromUrl) {
    return `/game?isGame=${_isGame}&gameType=${gameType}&flow=${flow}&role=${role}&activityDetails=${activityDetails}&userId=${userId}&token=${tokenId}`
  }

  const redirectTo =
    '/game?isGame=' +
    _isGame +
    '&gameType=' +
    gameType +
    '&flow=' +
    flow +
    '&role=' +
    role +
    '&activityDetails=' +
    activityDetails +
    '&userId=' +
    userId +
    locale +
    '&token=' +
    tokenId

  return redirectTo
}

export const getDayFromDate = (date: string) => {
  const d = new Date(date)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[d.getDay()]
}

export const clearStore = () => {
  useAuthStore.persist.clearStorage()
  useGameStore.persist.clearStorage()
  useCareerStore.persist.clearStorage()
  useEducatorStore.persist.clearStorage()
  useGameStore.persist.clearStorage()
  useMilestoneStore.persist.clearStorage()
  useParentStore.persist.clearStorage()
  useStudentStore.persist.clearStorage()
  useCartStore.persist.clearStorage()
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const getFormattedDate = (date: string) => {
  const splitDate = date?.split('-')
  const d = splitDate[0]
  const m = splitDate[1]
  const y = splitDate[2]
  return `${d} ${monthNames[parseInt(m) - 1]}, ${y}`
}
export const getFormattedDateShort = (date: string) => {
  const splitDate = date?.split('-')
  const d = splitDate[0]
  const m = splitDate[1]
  const y = splitDate[2]
  const lastTwoDigits = y.slice(-2)
  return `${d} ${monthNames[parseInt(m) - 1]} ${lastTwoDigits}`
}

export const calculateDeadlineTimer = (deadline: string) => {
  const _currentDateTime = new Date()
  const formateDate = getFormattedDate(deadline)
  const _deadline = new Date(formateDate)
  const timeBetweenNowAndDeadline = _deadline.getTime() - _currentDateTime.getTime()

  const { days, hours, minutes, seconds } = convertmsToDHMS(timeBetweenNowAndDeadline)

  if (days !== 0) {
    return `${days}d ${hours}hr ${minutes}m`
  } else {
    return `${hours}hr ${minutes}m`
  }
}

export const addOffsetToTime = (date: Date) => {
  // get utc plus or minus, and add it to the  date
  const utc = -new Date().getTimezoneOffset() / 60
  console.log('utc', utc)
  return new Date(date.getTime() + utc * 60 * 60 * 1000)
}

export const convert12to24HrFormat = (time: string) => {
  if (!time) return ''
  const hour = time?.split(':')[0]
  const minute = time?.split(':')[1]
  const ampm = +hour >= 12 ? 'PM' : 'AM'
  let hour12 = (+hour % 12).toString() || '12'
  hour12 = +hour12 < 10 ? `0${hour12}` : hour12
  return `${hour12}:${minute}:00 ${ampm}`
}
export const convertDateToObject = (date: string) => {
  // date is in dd-mm-yyyy format
  const dateArr = date?.split('-')
  const dateObj = new Date(`${dateArr[1]}-${dateArr[0]}-${dateArr[2]}`)
  return dateObj
}
export const combineDateTime = (date: string, time: string) => {
  const dateObj = convertDateToObject(date)

  const hour = time?.split(':')[0]
  const minute = +time?.split(':')[1]?.split(' ')[0]
  const ampm = time.slice(-2)
  const hour24 = ampm === 'AM' ? +hour : ampm === 'PM' ? (parseInt(hour) % 12) + 12 : +hour
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), hour24, minute)
}

export function convertmsToDHMS(milliseconds: number) {
  // Calculate the number of milliseconds in a day, hour, and minute
  const millisecondsInDay = 24 * 60 * 60 * 1000
  const millisecondsInHour = 60 * 60 * 1000
  const millisecondsInMinute = 60 * 1000

  // Calculate the number of days, hours, and minutes
  const days = Math.floor(milliseconds / millisecondsInDay)
  milliseconds %= millisecondsInDay
  const hours = Math.floor(milliseconds / millisecondsInHour)
  milliseconds %= millisecondsInHour
  const minutes = Math.floor(milliseconds / millisecondsInMinute)
  const seconds = Math.floor((milliseconds % millisecondsInMinute) / 1000)

  return { days, hours, minutes, seconds }
}

export const calculateLessonTimer = ({
  creationDate,
  creationTime,
  lessonDate,
  startTime,
  status,
}: {
  creationDate: string
  creationTime: string
  lessonDate: string
  startTime: string
  status: string
}) => {
  let _currentDateTime = new Date()

  let createdAt = combineDateTime(creationDate, creationTime)
  // creation time is in utc time, need to change to current time zone
  createdAt = addOffsetToTime(createdAt)

  console.log('createdAt', createdAt)

  const lessonStartAt = combineDateTime(lessonDate, startTime)
  // last time of acceptance is night of the day before the lesson
  const _lastTimeOfAcceptance = new Date(convertDateToObject(lessonDate).getTime() - 1)
  const _isLessonCreatedOnSameDay = _currentDateTime.getDate() === lessonStartAt.getDate()

  // first, lets check if the last time to accept has passed, means lesson day has started
  const _isLessonDayArrived = _currentDateTime > _lastTimeOfAcceptance

  // now, check if 3 days has passed since the lesson was created

  const is3DaysPassed = _currentDateTime.getTime() - createdAt.getTime() > 3 * 24 * 60 * 60 * 1000

  // if lesson is created on the same day, we need to check if 4 hours has passed since the lesson was created, status is Pending
  // const timeBetweenNowAndLessonStart = lessonStartAt - _currentDateTime;

  const timeBetweenNowAndNightBeforeLessonStart = _lastTimeOfAcceptance.getTime() - _currentDateTime.getTime()

  const timeBetweenNowAndLessonStart = lessonStartAt.getTime() - _currentDateTime.getTime()

  const timePassedSinceCreation = _currentDateTime.getTime() - createdAt.getTime()

  const daysPassedSinceCreation = Math.floor(timePassedSinceCreation / (1000 * 60 * 60 * 24))

  // if day beore lesson start hasnt finished and 3 days has not passed since the lesson was created, and response.status is Pending, then the
  // student can accept the lesson

  // New: if lesson isnt created on same day, and 3 days havent passed, and day of lesson isnt reached
  let isTimeToAcceptAlreadyPassed = true
  let timerValues = {
    remainingDays: 0,
    remainingHours: 0,
    remainingMinutes: 0,
    remainingSeconds: 0,
  }
  if (!_isLessonCreatedOnSameDay && !is3DaysPassed && !_isLessonDayArrived && status === 'Pending') {
    console.log('__if block')
    isTimeToAcceptAlreadyPassed = false
    let timeLeftToAccept
    // if no day has passed since creation, and 3 or more days are remaining until night before lesson start, then student has 3 days - time passed since creation to accept the lesson
    if (daysPassedSinceCreation === 0 && timeBetweenNowAndNightBeforeLessonStart > 3 * 24 * 60 * 60 * 1000) {
      timeLeftToAccept = 3 * 24 * 60 * 60 * 1000 - timePassedSinceCreation
    }
    // if no day has passed since creation and less than 3 days are remaining until night before lesson start,
    // then student has remaining time until night before lesson start to accept the lesson
    else if (daysPassedSinceCreation === 0 && timeBetweenNowAndNightBeforeLessonStart < 3 * 24 * 60 * 60 * 1000) {
      timeLeftToAccept = timeBetweenNowAndNightBeforeLessonStart
    }
    // if 1 day has passed since creation, and 2 or more days are remaining until night before lesson start,
    // then student has 2 days to accept the lesson
    else if (daysPassedSinceCreation === 1 && timeBetweenNowAndNightBeforeLessonStart > 2 * 24 * 60 * 60 * 1000) {
      timeLeftToAccept = 2 * 24 * 60 * 60 * 1000 - timePassedSinceCreation
    }
    // if 1 day has passed since creation, and less than 2 days are remaining until night before lesson start, then student has
    // remaining time until night before lesson start to accept the lesson
    else if (daysPassedSinceCreation === 1 && timeBetweenNowAndNightBeforeLessonStart < 2 * 24 * 60 * 60 * 1000) {
      timeLeftToAccept = timeBetweenNowAndNightBeforeLessonStart
    }
    // if 2 days has passed since creation, and 1 or more days are remaining until night before lesson start, then student has 1 day to accept the lesson
    else if (daysPassedSinceCreation === 2 && timeBetweenNowAndNightBeforeLessonStart > 1 * 24 * 60 * 60 * 1000) {
      timeLeftToAccept = 1 * 24 * 60 * 60 * 1000 - timePassedSinceCreation
    }
    // if 2 days has passed since creation, and less than 1 day is remaining until night before lesson start, then student has remaining time
    // until night before lesson start to accept the lesson
    else if (daysPassedSinceCreation === 2 && timeBetweenNowAndNightBeforeLessonStart < 1 * 24 * 60 * 60 * 1000) {
      timeLeftToAccept = timeBetweenNowAndNightBeforeLessonStart
    }

    // if 3 days has passed since creation, then student has no time left to accept the lesson
    else if (daysPassedSinceCreation > 3) {
      timeLeftToAccept = 0
    } else {
      timeLeftToAccept = 0
    }

    console.log('timeLeftToAccept', timeLeftToAccept)

    const { days, hours, minutes, seconds } = convertmsToDHMS(timeLeftToAccept)

    timerValues = {
      remainingDays: days,
      remainingHours: hours,
      remainingMinutes: minutes,
      remainingSeconds: seconds,
    }
  } else {
    console.log('__else block')
    const { days, hours, minutes, seconds } = convertmsToDHMS(timeBetweenNowAndLessonStart)

    timerValues = {
      remainingDays: timeBetweenNowAndLessonStart > 0 ? days : 0,
      remainingHours: timeBetweenNowAndLessonStart > 0 ? hours : 0,
      remainingMinutes: timeBetweenNowAndLessonStart > 0 ? minutes : 0,
      remainingSeconds: timeBetweenNowAndLessonStart > 0 ? seconds : 0,
    }
  }

  return { timerValues, isTimeToAcceptAlreadyPassed, timeBetweenNowAndLessonStart }
}
