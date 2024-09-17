import { create } from 'zustand'
import { ActiveAuthModal } from '@/utils/types'

type SuccessModalTypes = {
  title: string
  message: string
  linkText?: string
  link?: string
  isImage?: boolean
}

type ModalStore = {
  open: boolean
  setOpen: (modal: boolean) => void
  openPupilModal: boolean
  setOpenPupilModal: (openPupilModal: boolean) => void
  activeAuthModal: ActiveAuthModal
  setActiveAuthModal: (activeAuthModal: ActiveAuthModal) => void
  successModal: SuccessModalTypes
  setSuccessModal: (successModal: SuccessModalTypes) => void
  addLessonModal: boolean
  setAddLessonModal: (addLessonModal: boolean) => void
  tutorLessonDetailModal: boolean
  setTutorLessonDetailModal: (tutorLessonDetailModal: boolean) => void
  editLessonModal: boolean
  setEditLessonModal: (editLessonModal: boolean) => void
  cancelLessonModal: boolean
  setCancelLessonModal: (cancelLessonModal: boolean) => void

  studentLessonCancelModal: boolean
  setStudentLessonCancelModal: (studentLessonCancelModal: boolean) => void
  studentLessonDetailModal: boolean
  setStudentLessonDetailModal: (studentLessonDetailModal: boolean) => void
}

const initialSuccessModal: SuccessModalTypes = {
  title: '',
  message: '',
  linkText: '',
  link: '/',
  isImage: false,
}

export const useModalStore = create<ModalStore>((set) => ({
  open: false,
  openPupilModal: false,
  activeAuthModal: null,
  successModal: initialSuccessModal,
  addLessonModal: false,
  tutorLessonDetailModal: false,
  editLessonModal: false,
  cancelLessonModal: false,
  studentLessonCancelModal: false,
  studentLessonDetailModal: false,
  setOpen: (open: boolean) => set({ open }),
  setOpenPupilModal: (openPupilModal: boolean) => set({ openPupilModal }),
  setActiveAuthModal: (activeAuthModal: ActiveAuthModal) => set({ activeAuthModal }),
  setSuccessModal: (successModal: SuccessModalTypes) => set({ successModal }),
  setAddLessonModal: (addLessonModal: boolean) => set({ addLessonModal }),
  setTutorLessonDetailModal: (tutorLessonDetailModal: boolean) => set({ tutorLessonDetailModal }),
  setEditLessonModal: (editLessonModal: boolean) => set({ editLessonModal }),
  setCancelLessonModal: (cancelLessonModal: boolean) => set({ cancelLessonModal }),
  setStudentLessonCancelModal: (studentLessonCancelModal: boolean) => set({ studentLessonCancelModal }),
  setStudentLessonDetailModal: (studentLessonDetailModal: boolean) => set({ studentLessonDetailModal }),
}))
