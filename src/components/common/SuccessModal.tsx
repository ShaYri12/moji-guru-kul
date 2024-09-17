import classNames from 'classnames'
import { nordeco } from '@/app/font'
import Link from 'next/link'
import Image from 'next/image'
import { useModalStore } from '@/store/modalStore'
import CustomModal from './CustomModal'

interface SuccessModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const SuccessModal = ({ open, setOpen }: SuccessModalProps) => {
  const { title, message, isImage, link, linkText } = useModalStore((state) => state.successModal)

  return (
    <CustomModal open={open} setOpen={setOpen}>
      <div className={classNames(nordeco.className, 'w-full mt-3 flex flex-col justify-center items-center')}>
        {isImage && <Image src="/assets/images/student/student-success.png" alt="student registration success" width={192} height={192} />}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <p className="heading text-green font-bold text-center leading-8">{title}</p>
            {message && <p className="text-center text-grey font-normal text-lg leading-5">{message}</p>}
          </div>
          {linkText && link && (
            <Link href={link} className="text-green text-sm text-center font-normal underline leading-5 underline-offset-[3px]">
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </CustomModal>
  )
}

export default SuccessModal
