import { AccountSettingsEnum } from './enum'
import { GradeTypes } from './types'

export const GENDER = [
  {
    id: 1,
    name: 'Male',
  },
  {
    id: 2,
    name: 'Women',
  },
]

export const ROUTES = [
  {
    id: 1,
    name: 'About Us',
    path: '/about-us',
    isProtected: false,
  },
  {
    id: 2,
    name: 'Resources',
    path: '/resources/blog',
    isProtected: false,
  },
  {
    id: 3,
    name: 'Contact',
    path: '/contact-us',
    isProtected: false,
  },
  {
    id: 4,
    name: 'Dashboard',
    path: '/student/dashboard',
    isProtected: true,
  },
  {
    id: 5,
    name: 'Learning Hub',
    path: '/learning-hub',
    isProtected: true,
  },
  {
    id: 6,
    name: 'Games',
    path: '/games',
    isProtected: true,
  },
  {
    id: 7,
    name: 'Community',
    path: '/community',
    isProtected: true,
  },
  {
    id: 8,
    name: 'Online Store',
    path: '/store',
    isProtected: true,
  },
]

export const PROTECTED_ROUTES = []

export const ACCOUNT_SETTINGS: { id: number; title: string }[] = [
  {
    id: AccountSettingsEnum.ProfileSettings,
    title: 'Profile Settings',
  },
  {
    id: AccountSettingsEnum.LearningPreferences,
    title: 'Learning Preferences',
  },
  {
    id: AccountSettingsEnum.NotificationSettings,
    title: 'Notification Settings',
  },
  {
    id: AccountSettingsEnum.LanguagePreferences,
    title: 'Language Preferences',
  },
  {
    id: AccountSettingsEnum.PasswordReset,
    title: 'Password Reset',
  },
  {
    id: AccountSettingsEnum.ParentAccess,
    title: 'Parent Access',
  },

  {
    id: AccountSettingsEnum.Subscription,
    title: 'Subscription & Payment Details',
  },
]
export const PARENT_ACCOUNT_SETTINGS = [
  {
    id: AccountSettingsEnum.ProfileSettings,
    title: 'Profile Settings',
  },
  {
    id: AccountSettingsEnum.LearningPreferences,
    title: 'Learning Preferences',
  },
  {
    id: AccountSettingsEnum.NotificationSettings,
    title: 'Notification Settings',
  },
  {
    id: AccountSettingsEnum.LanguagePreferences,
    title: 'Language Preferences',
  },
  {
    id: AccountSettingsEnum.PasswordReset,
    title: 'Password Reset',
  },
  {
    id: AccountSettingsEnum.ConnectedChildren,
    title: 'Connected Children Accounts',
  },
  {
    id: AccountSettingsEnum.Subscription,
    title: 'Subscription & Payment Details',
  },
]

export const FOOTER_LINKS = [
  {
    id: 1,
    title: 'Company',
    links: [
      {
        id: 1,
        name: 'About Us',
        path: '/about-us',
      },
      {
        id: 2,
        name: 'Privacy Policy',
        path: '#/privacy-policy',
      },
      {
        id: 3,
        name: 'Terms & Condition',
        path: '#/terms-condition',
      },
    ],
  },
  {
    id: 2,
    title: 'Visit',
    links: [
      {
        id: 1,
        name: 'Student',
        path: '/student/dashboard',
      },
      {
        id: 2,
        name: 'Parents',
        path: '/parent/games',
      },
      {
        id: 3,
        name: 'Tutors',
        path: '#/tutors',
      },
    ],
  },
  {
    id: 3,
    title: 'Help',
    links: [
      {
        id: 1,
        name: 'Contact us',
        path: '/contact-us',
      },
      {
        id: 2,
        name: 'Resources',
        path: '/resources',
      },
      {
        id: 3,
        name: 'FAQs',
        path: '#/faqs',
      },
    ],
  },
]

export const GRADES: GradeTypes[] = [
  {
    id: 6,
    name: 'Grade 6',
  },
  {
    id: 7,
    name: 'Grade 7',
  },
  {
    id: 8,
    name: 'Grade 8',
  },
  {
    id: 9,
    name: 'Grade 9',
  },
  {
    id: 10,
    name: 'Grade 10',
  },
]

export const ABOUT_STUDENTS = [
  {
    id: 1,
    description: '15 min a day to master concepts',
    'description-te': 'కాన్సెప్టులపై పట్టు సాధించడానికి రోజుకు 15 నిమిషాలు.',
  },
  {
    id: 2,
    description: 'Interactive games',
    'description-te': 'ఇంటరాక్టివ్ గేమ్స్',
  },
  {
    id: 3,
    description: 'Personalised learning paths',
    'description-te': 'వ్యక్తిగతీకరించిన అభ్యసన మార్గాలు',
  },
]
export const ABOUT_PARENTS = [
  {
    id: 1,
    description: 'Partner in your child’s education',
    'description-te': 'మీ పిల్లల చదువులో ఒక పార్టనర్.',
  },
  {
    id: 2,
    description: 'Up-to-the-minute reports',
    'description-te': 'ప్రతి నిమిషం రిపోర్టులు',
  },
  {
    id: 3,
    description: 'Precise insights',
    'description-te': 'ఖచ్చితమైన ఇన్ సైట్ లు',
  },
]
export const ABOUT_TUTORS = [
  {
    id: 1,
    description: 'Guide learners to get success',
    'description-te': 'విజయాన్ని పొందడం కోసం లెర్నర్స్ కు గైడ్ చెయ్యడం',
  },
  {
    id: 2,
    description: 'Monitor student progress',
    'description-te': 'విద్యార్థుల ప్రోగ్రెస్ ని మోనిటర్ చెయ్యడం',
  },
  {
    id: 3,
    description: 'Access to smart tools',
    'description-te': 'స్మార్ట్ టూల్స్ యాక్సెస్',
  },
]

export const LANGUAGE_LEVELS = ['-', 'Basic', 'Conversational', 'Fluent', 'Native']

export const ROLES_DETAILS = [
  {
    title: 'Student',
    redirectUrl: '/register-student',
    image: '/assets/images/landing-page/student-icon.svg',
  },
  {
    title: 'Parent',
    redirectUrl: '/register-parent',
    image: '/assets/images/landing-page/parent-icon.svg',
  },
  {
    title: 'Tutor',
    redirectUrl: '/register-educator',
    image: '/assets/images/landing-page/teacher-icon.svg',
  },
]
