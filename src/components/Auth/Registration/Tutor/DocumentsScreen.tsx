import React from 'react'
import RegisterTutorLayout from './RegisterTutorLayout'
import ImagePicker from '@/components/common/ImagePicker'
import { useTutorStore } from '@/store/tutorStore'
import { getS3PreSignedUrl, uploadFileToS3 } from '@/utils/s3'
import { useErrorStore } from '@/store/errorStore'

const DocumentsScreen = () => {
  const [loadingEducationalDoc, setLoadingEducationalDoc] = React.useState(false)
  const [loadingTeachingDoc, setLoadingTeachingDoc] = React.useState(false)

  const highestEducationalDocument = useTutorStore((state) => state.highestEducationalDocument)
  const setHighestEducationalDocument = useTutorStore((state) => state.setHighestEducationalDocument)
  const teachingExperienceCertificate = useTutorStore((state) => state.teachingExperienceCertificate)
  const setTeachingExperienceCertificate = useTutorStore((state) => state.setTeachingExperienceCertificate)
  const tutor = useTutorStore((state) => state.tutor)
  const setTutor = useTutorStore((state) => state.setTutor)

  const setAlert = useErrorStore((state) => state.setAlert)

  return (
    <RegisterTutorLayout>
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-14 items-center">
          <div>
            <ImagePicker
              label="Highest Education Certificate"
              loading={loadingEducationalDoc}
              value={highestEducationalDocument}
              onChange={async (e) => {
                setLoadingEducationalDoc(true)
                if (e.target.files?.length) {
                  setHighestEducationalDocument(e.target.files[0])
                  const response = await getS3PreSignedUrl(e.target.files[0].name)
                  if (response) {
                    const res = await uploadFileToS3({ url: response, file: e.target.files[0] })
                    if (res) {
                      setTutor({
                        ...tutor,
                        highestEducationalDocumentURL: res,
                      })
                      setAlert({
                        message: 'Uploaded Highest Education Certificate successfully',
                        type: 'success',
                      })
                    }
                  }
                }
                setLoadingEducationalDoc(false)
              }}
            />
          </div>
          <div>
            <ImagePicker
              label="Teaching Experience Certificate"
              loading={loadingTeachingDoc}
              value={teachingExperienceCertificate}
              onChange={async (e) => {
                setLoadingTeachingDoc(true)
                if (e.target.files?.length) {
                  setTeachingExperienceCertificate(e.target.files[0])
                  const response = await getS3PreSignedUrl(e.target.files[0].name)
                  if (response) {
                    const res = await uploadFileToS3({ url: response, file: e.target.files[0] })
                    if (res) {
                      setTutor({
                        ...tutor,
                        teachingExperienceCertificate: res,
                      })
                    }
                    setAlert({
                      message: 'Uploaded Teaching Experience Certificate successfully',
                      type: 'success',
                    })
                  }
                }
                setLoadingTeachingDoc(false)
              }}
            />
          </div>
        </div>
      </div>
    </RegisterTutorLayout>
  )
}

export default DocumentsScreen
