import { AlertTypeEnums, AuthModalEnum } from './enum'

export type ActiveAuthModal = AuthModalEnum.login | AuthModalEnum.forgotPassword | null

export type RegisterStudentTypes = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  genderId: number
  yearsOfBirth: number
  inviteToken: string
  countryId: number
  stateId?: number
  cityId: number
  gradeId: number
  grade: number
  syllabusId: number
  emailOTP: string
  emailOTPId: number
  phoneOTP: string
  phoneOTPId: number
}

export type CountryTypes = {
  id: number
  name: string
  iso3: string
  numericCode: string
  iso2: string
  phoneCode: string
  currencySymbol: string
}

export type StateTypes = {
  id: number
  name: string
  countryId: number
  countryCode: string
  iso2: string
}

export type CityTypes = {
  id: number
  name: string
  stateId: number
  stateCode: string
  countryId: number
  countryCode: string
}

export type SuccessResponse = {
  isSuccess: boolean
  status: string
  message: string
  responseType: number
  errorMessages: string | null
  returnObject: any
}

export type EmailOtpResponse = {
  email: string
  userId: number
}

export type PhoneOtpResponse = {
  phoneNumber: string
  userId: number
}

export type AlertTypes = {
  message: string | null
  type?: AlertVariantType
}

export type AlertVariantType = 'error' | 'default' | 'success' | 'warning' | 'info'

export type ParentTypes = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  genderId: number
  yearsOfBirth: number
  // inviteToken: string
  childEmails: string[]
  emailOTP: string
  emailOTPId: number
  phoneOTP: string
  phoneOTPId: number
}

export type SyllabusTypes = {
  id: number
  name: string
  countryId: number
  countryName: string
  isActive: boolean
}

export type EducatorTypes = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  genderId: number
  yearsOfBirth: number
  inviteToken: string
  countryId: number
  cityId: number
  workExperience: number
  agreeWithEducatorPolicy: boolean
  emailOTP: string
  emailOTPId: number
  phoneOTP: string
  phoneOTPId: number
}

export type CareerResponseTypes = {
  id: number
  name: string
  value: string | null
}

export type QuizTypes = {
  question: string
  image: string
  options: string[]
  answer: string
}

export type WordSearchTypes = {
  grid: null
  wordsToFind: null
  question: string | null
}

export type QuizResponseTypes = {
  quizes: QuizTypes[]
  wordSearch: WordSearchTypes
  type: string
}

export type VerifiedChildEmail = {
  email: string
  isExists: boolean
}

export type TokenTypes = {
  type: string
  value: string
}

export type UserTypes = {
  id: number
  email: string
  firstName: string
  isActive: boolean
  isFirstTimeLogin: boolean
  lastName: string
  role: string
  roles: null
  syllabusId: number
  token: TokenTypes
  userCareers: []
  userPermissions: []
  customerId: null
  dbPlanIds: []
  razorPlanIds: []
  highestStreak: number
  isPermanent: boolean
  points?: number;
}

export type TopicsResponseTypes = {
  id: number
  totalRows: number
  categoryId: number
  topicName: string
  categoryName: string
  topicIsActive: boolean
  topicImage: string
  gameId: number
  isUnlocked: boolean
  isCompleted: boolean
  gamesInfo: []
  isBasic: boolean
  topicOrder: number
}

export type SubjectResponseTypes = {
  id: number
  totalRows: number
  level: number
  name: string
  isActive: boolean
  image: string
  isForStudent: boolean
  hasTopics: boolean
  topics: TopicsResponseTypes[]
}

export type MiniGameTypes = {
  title: string
  description: string
  imageURL: string | null
  gameURL: string
  points: number
  isGame: boolean
  isDemo: boolean
  gameType: string
  crossWord: string
  id: number
  userPlayingCount: number
  playingCount: number
  isRestarted: boolean
  isUnlock: boolean
  isCompleted: boolean
  gameScore: number
  gameFlowDetails: GameFlowDetailsTypes | null
}

export type GamesByUserTypes = MiniGameTypes & {
  categoryId: number
  topicId: number
  backgroundImage: string | null
  deadlineDate: string | null
  gameLevel: string
}

export type GamesResponseTypes = {
  miniGames: GamesByUserTypes[]
  gamesFlows: GamesByUserTypes[]
}

export type MinigamesGameFlowsTypes = {
  miniGames: MiniGameTypes[]
  gameFlows: MiniGameTypes[]
}

export type MiniGameParams = {
  categoryId: number // subjectId
  level: number
  topicId: number
  userRole: number
  isBasic: boolean
}

export type GameFragments = {
  userId: number
  gameId: number
  gameFlowId: number
  cardId: number
  cardPortion: number
  isActivated: boolean
  isUnlocked: boolean
  isDeleted: boolean
  createdOn: string
  modifiedOn: string
  id: number
  entityState: number
}

export type GameRewards = {
  title: string
  strength: string | null
  weakness: string | null
  defense: string
  fragments: GameFragments[]
  isUnlocked: boolean
  imgUrl: string | null
  additionalAttributes: string | null
  description: string | null
  id: number
}

export type SvgParamTypes = {
  width: string
  height: string
  fill: string
  className: string
  onClick: () => void
}

export type MilestoneResponseTypes = {
  id: number
  title: string
  description: string
  pointsCounter: number
  milestoneType: number
  isActive: boolean
  isUnLocked: boolean
  pointsThresholdValue: number
  imageURL: string
  categoryId: number
  userPointsCounter: number
  orders: number
  isBasic: boolean
  level: string
}

export type ParentGameTypes = {
  id: number
  gameType: number
  categoryId: number
  topicId: number
  backgroundImage: string | null
  description: string
  deadlineDate: string | null
  gameURL: string
  imageURL: string | null
  gameLevel: string
  isBasic: boolean
  isUnlock: boolean
  isCompleted: boolean
  isRestarted: boolean
  playingCount: number
  userPlayingCount: number
  isGame: boolean
  crossWord: string | null
}

export type ParentGameResponseTypes = {
  miniGames: ParentGameTypes[]
  gamesFlows: ParentGameTypes[]
}

export type ProductTypes = {
  id: number
  name: string
  price: number
  quantity: number
  image: string | null
  type: string
  categoryId: number
  createdOn: string
}

export type ProductCategoryTypes = {
  id: number
  name: string
  createdOn: string
  createdDate: string
  getItemsModelForCategory: ProductTypes[]
}

// export type TutorsForStudentTypes = {
//   studentId: number
//   tutorId: number
//   tutorName: string
//   studentName: string
//   tutorEmail: string
// }

export type TutorsForStudentTypes = {
  id: number
  tutorId: number
  tutorEmail: string
  tutorName: string
  groupName: string
  groupId: number
  profileImage: string | null
  categoryName: string | null
}

export type LearningActivityTypes = {
  id: number
  title: string
  description: string | null
  lessonDate: string
  startTime: string
  endTime: string
  gameTypeName: string
  activityTypeName: string
  activityTypeId: number
  activityToBePerformedId: number
  points: number
  assignedById: number
  assignedByRole: number
  assignedToId: number
  status: string
  dueDate: string | null
  creationDate: string
  completionDate: string
  noOfAudios: number
  noOfImages: number
  noOfVideos: number
  noOfPdf: number
  earnedPoints: number | null
  materialImgUrl: string | null
  creationTime: string
  gameScore: number
  gameURL: string | null
  gameFlowDetails: GameFlowDetailsTypes | null
  deadline: string | null
}

export type StudentTutorGroupsTypes = {
  id: number
  name: string
  studentId: number
  educatorId: number
  numberOfActivities: number
  isGroup: boolean
  maxDate: string
}

export type GroupDetailTypes = {
  id: number
  studentName: string
  studentEmail: string
}

export type SubjectDetailTypes = {
  value: string
  text: string
  description: string
}

export type ProfileTypes = {
  id: number
  email: string
  roleId: number
  isActive: boolean
  phoneNumber: string
  isVerified: number
  gradeId: number
  grade: number
  userRating: number
  firstName: string
  lastName: string
  country: string | number
  city: string | number
  languageOfAccountId: number
  workExperience: number
  subjects: SubjectDetailTypes[]
  genderId: number
}

export type UpdateStudentProfilePayload = {
  firstName: string
  lastName: string
  countryId: number
  cityId: number
  genderId: number
  languageOfAccountId: number
  userId: number
  gradeId: number
  grade: number
}

export type UnlockGameFlowBodyParams = {
  studentId: number
  gameFlowId: number
  inProgressGameScore: number
  timeSpentInSeconds: number
  gameId: number
  gameStatus: number
  isCompleted: boolean
  gameLevel?: string
}

export type GameFlowGamesTypes = {
  gameId: number
  title: string
  gameType: number
  gameTypeName: string
  gamePosition: number
  crosswordLevel: string
  isCompleted: boolean
  timeSpentInSeconds: number
  highScore: number
}

export type GameFlowDetailsTypes = {
  id: number
  topicId: number
  categoryId: number
  categoryName: string
  topicName: string
  gameFlowType: number
  title: string
  description: string
  isActive: boolean
  isDemo: boolean
  isPublished: boolean
  points: number
  imageURL: string
  gameURL: string
  studentGrade: string
  games: GameFlowGamesTypes[]
  totalRows: number
  gameLevel: string
  isBasic: boolean
  isParent: boolean
}

export type StreakTypes = {
  id: number
  userId: number
  points: number
  streakDate: string
}

export type GradeTypes = {
  id: number
  name: string
}

export type UpdateParentProfilePayload = {
  firstName: string
  lastName: string
  countryId: number
  cityId: number
  genderId: number
  languageOfAccountId: number
}

export type ConnectedChildrenTypes = {
  id: number
  name: string
  numberOfActivities: number
  parentId: number
}

export type SearchStudentTypes = {
  email: string
  isExists: boolean
  location: string
  name: string
  studentId: number
  yearsOfStudy: string
}

export type BlogTypes = {
  id: number
  title: string
  description: string
  keywords: string
  image: string
  isActive: boolean
  category: number
  createdByUser: string
  createdDate: string
  modifiedByUser: string | null
  modifiedDate: string | null
}

export type BlogResponseType = {
  total: number
  rows: BlogTypes[]
}

export type StudentsAndGroupsResponseTypes = {
  id: number
  name: string
  educatorId: number
  numberOfActivities: number
  isGroup: boolean
}

export type ActivityResponseTypes = {
  id: number
  lessonDate: string
  startTime: string
  endTime: string
  title: string
  description: string
  gameTypeName: string
  activityTypeName: string
  activityTypeId: number
  activityToBePerformedId: number
  points: number
  assignedById: number
  assignedByRole: number
  assignedToId: number
  status: number
  dueDate: string
  creationDate: string
  completionDate: string
  noOfAudios: number
  noOfImages: number
  noOfVideos: number
  noOfPdf: number
  earnedPoints: number
  materialImgUrl: string
}

export type UserLanguagesTypes = {
  languageId: number
  languageLevel: number
}

export type UserQuestionsAnswersTypes = {
  question: string
  answer: string
}

export type TutorSubjectsTypes = {
  tutorId: number
  subjectId: number
}

export type TutorBodyParams = {
  educatorId: number
  userLanguages: UserLanguagesTypes[]
  userQuestionsAnswers: UserQuestionsAnswersTypes[]
  agencyId: number
  isCoach: boolean
  agreeWithTutorPolicy: boolean
  inviteToken: string
  linkedInURL: string
  criminalCertificateURL: string
  highestEducationalDocumentURL: string
  teachingExperienceCertificate: string
  tutorSubjects: TutorSubjectsTypes[]
}

export type AgencyTypes = {
  id: number
  agencyName: string
  countryId: number
  stateId: number
  cityId: number
  registeredTutors: number
  isActive: boolean
}

export type AgencyResponseTypes = {
  total: number
  rows: AgencyTypes[]
}

export type TutorSubjectTypes = {
  id: number
  name: string
}

export type FileTypes = {
  lastModified: number
  lastModifiedDate: Date
  name: string
  size: number
  type: string
}

export type TutorQuestionTypes = {
  id: number
  question: string
  orders: number
  roleId: number
  isDeleted: boolean
  createdOn: string
  roleName: string
}

export type LiveLessonDetailsTypes = {
  activityTypeName: string
  assignedById: number
  assignedToId: number
  completionDate: string | null
  creationDate: string
  creationTime: string
  deadline: string | null
  description: string | null
  endTime: string
  givenPoints: string
  id: number
  lessonDate: string
  lessonId: number
  lessonMode: string
  place: string
  rate: number
  remainingDays: number
  remainingHours: number
  remainingMinutes: number
  startTime: string
  status: string
  title: string
}

export type CancelLessonReasonsType = {
  cancelReasonDescription: string | null
  cancelReasonId: number
  cancelReasonName: string
  entityState: number
  id: number
}

export type ActivityDetailResponseTypes = {
  id: number
  gameType: string
  gameURL: string
  categoryName: string
  grade: string
  title: string
  description: string
  gameId: number
  mode: string
  deadline: string
  totalPoints: number
  status: string
  creationDate: string
  earnedPoints: number
  assignedById: number
  assignedByRole: string
  assignedToId: number
  gameTypeNum: number
  comment: string | null
  revisionPoints: number
  quizQuestions: QuizTypes[]
  crossword: string
}

export type GameflowActivitiesTypes = {
  totalPoints: number
  pointsEarned: number
  deadline: string
  dateCreated: string
  gameflowTitle: string
  gameflowDesc: string
  gameflowUrl: string
  gameflowStatus: string
  mode: string
  activityName: string
  categoryName: string
  studentGrade: string
  individualMinigameActivities: ActivityDetailResponseTypes[]
}

// Represents the individual category item returned by the API
export interface CommunityCategory {
  id: number
  name: string
  roleId: number
  roleName: string
}

// Represents the overall API response format
export interface CommunityCategoryResponse {
  isSuccess: boolean
  status: string
  message: string
  returnObject: CommunityCategory[]
  responseType: number
  errorMessages: string[] | null
}

export type PlanResponseTypes = {
  id: number
  razorPlanId: string
  status: number
  for: number
  amount: number
  name: string
  description: string
  currency: string
  period: string
  interval: number
  trialDays: number
}
// Represents the individual item returned by the API

export interface Item {
  id: number
  name: string
  price: number
  quantity: number
  image: string | undefined
  type: string
  categoryId: number
  description: string
  createdOn: string
  subItems: Item[]
}

export interface Card {
  id: number
  name: string
  createdOn: string
  createdDate: string
  items: Item[]
}

export type NotesTypes = {
  additionalProp1: string
  additionalProp2: string
  additionalProp3: string
}

export type SubscriptionParams = {
  notes?: NotesTypes | null
  razorPlanId: string
  totalCount?: number
  quantity?: number
  customerId: string
  customerNotify?: boolean | null
  startAt?: number | null
  expireBy?: number | null
  addons?: string | null
}

export type SubscriptionResponseTypes = {
  id: number
  created_at: string
  status: string
  current_start: string | null
  current_end: string | null
  charge_at: string
  short_url: string
  quantity: number
  total_count: number
  paid_count: number
  remaining_count: number
  has_scheduled_changes: boolean
  schedule_change_at: string | null
}

export type LanguageResponseTypes = {
  id: number
  language: string
  localeName: string
  code: string
  isActive: boolean
}

export type AmbassadorRegistrationPayload = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  gradeId: number
  phoneNumber: string
}

export type AmbassadorRegisterResponseTypes = {
  id: number
  entityState: number
  name: string
  email: string
  password: string
  roleId: number
  isActive: boolean
  phoneNumber: string
  isVerified: boolean
  isOnline: boolean
  firstName: string
  lastName: string
  isFirstTimeLogin: boolean
  isFavourite: boolean
  yearsOfBirth: number
  genderId: number
  isRegisteredByInvite: boolean
  inviteToken: string | null
  syllabusId: number | null
  isCoach: boolean
  agreeWithTutorPolicy: boolean
  agreeWithEducatorPolicy: boolean
  languageOfAccountId: number | null
  profileImage: string | null
  gamingTime: number | null
  userCareers: null
  unlockTopics: null
  isPermanent: boolean
  userStreaks: null
  highestStreak: number
  milestoneUsers: null
  appUserSubscriptions: null
  customerId: null
  forTutorApproval: boolean
  linkedInURL: string | null
  criminalCertificateURL: string | null
  highestEducationalDocumentURL: string | null
  teachingExperienceCertificate: string | null
  ambassadorCommission: number | null
  coupons: null
  tutorSubjects: null
  communityComments: null
  communityTopics: null
  addresses: null
}

export type CouponResponseType = {
  id: number
  name: string
  type: string
  percentage: number
  isActive: boolean
  code: string
  roleId: number
  availedCount: number
  ambassadorId: number
  razorpayOfferId: string | null
  startDate: string | null
  endDate: string | null
}

type UserCommisionDetails = {
  userName: string
  comissionFromUser: number
}

export type CouponStatsResponseType = {
  totalCommisionEarned: number
  referredUserCount: number
  userCommisionDetails: UserCommisionDetails[]
}

export type UserLinkedCouponsResponseType = {
  id: number
  name: string
  type: string
  percentage: number
  isActive: boolean
  code: string
  roleId: number
  availedCount: number
  ambassadorId: number
  razorpayOfferId: string
  startDate: string
  endDate: string
}
