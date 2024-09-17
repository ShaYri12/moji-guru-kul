export enum AuthModalEnum {
  login = 'login',
  forgotPassword = 'forgot-password',
}

export enum IconsEnum {
  Facebook = 'facebook',
  Google = 'google',
  password = 'password',
  email = 'email',
  LeftIcon = 'LeftIcon',
  RightIcon = 'RightIcon',
  FilterIcon = 'FilterIcon',
}

export enum RegisterStudentSteps {
  InitialInfoScreen = 1,
  VerificationScreen = 2,
  PasswordScreen = 3,
  GradeScreen = 4,
  AgeScreen = 5,
  AddressScreen = 6,
}

export enum RegisterParentSteps {
  InitialInfoScreen = 1,
  VerificationScreen = 2,
  PasswordScreen = 3,
  AgeScreen = 4,
  // InvitationScreen = 5,
}

export enum RegisterEducatorSteps {
  InitialInfoScreen = 1,
  VerificationScreen = 2,
  PasswordScreen = 3,
  AgeScreen = 4,
  AddressScreen = 5,
  ExperienceScreen = 6,
}

export enum AlertTypeEnums {
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Neutral = 'neutral',
}

export enum CareerSteps {
  Welcome = 1,
  CareerList = 2,
  CareerDetail = 3,
  TakeQuiz = 4,
  PlayGame = 5,
  CareerResult = 6,
}

export enum ChooseLevelEnum {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export enum AccountSettingsEnum {
  ProfileSettings = 1,
  LearningPreferences = 2,
  NotificationSettings = 3,
  LanguagePreferences = 4,
  PasswordReset = 5,
  ParentAccess = 6,
  Subscription = 7,
  ConnectedChildren = 8,
}

export enum RolesEnum {
  Student = 'student',
  Parent = 'parent',
  Educator = 'educator',
  Tutor = 'tutor',
  Ambassador = 'ambassador',
}

export enum RegisterTutorSteps {
  BasicInfoScreen = 1,
  LanguageScreen = 2,
  QuestionScreen = 3,
  DocumentScreen = 4,
}

export enum GameCreator {
  Admin = 1,
  Tutor = 2,
}

export enum GameTypeNumber {
  WordSearch = 'WordSearch',
  Crossword = 'Crossword',
}

export enum LanguageEnum {
  En = 'en',
  Te = 'te',
}

export enum ProductCardType {
  Stationarity = 'Stationarity',
  Courses = 'Courses',
  healthSupplement = 'healthSupplement',
  book = 'book',
}
